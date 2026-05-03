import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import Navbar from '../LandingPage/components/Navbar'

// ─── SVG Icons (no external font needed) ──────────────────────────────────────
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#68FCBF" width="22" height="22">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);
const IconUnchecked = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(167,172,169,0.35)" strokeWidth="1.5" width="22" height="22">
    <circle cx="12" cy="12" r="9.75" />
  </svg>
);
const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#B6FE00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const IconPlay = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
  </svg>
);
const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);
// ──────────────────────────────────────────────────────────────────────────────

function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({ difficulty: 'all', status: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState([]);

  const availableTags = ['Array', 'String', 'linkedList', 'graph', 'dp'];

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };
    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const removeTag = (tagToRemove) => setActiveTags(activeTags.filter(t => t !== tagToRemove));
  const addTag = (tag) => { if (!activeTags.includes(tag)) setActiveTags([...activeTags, tag]); };
  const clearAllTags = () => setActiveTags([]);

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty?.toLowerCase() === filters.difficulty;
    const statusMatch = filters.status === 'all' ||
      (filters.status === 'solved' && solvedProblems.some(sp => sp._id === problem._id));
    const searchMatch = searchTerm === '' || problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const tagsList = Array.isArray(problem.tags) ? problem.tags : [problem.tags];
    const activeTagMatch = activeTags.length === 0 || activeTags.some(t => tagsList.includes(t));
    return difficultyMatch && statusMatch && searchMatch && activeTagMatch;
  });

  const isSolved = (problem) => solvedProblems.some(sp => sp._id === problem._id);

  const getDifficultyBadge = (difficulty) => {
    const base = { padding: '4px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, display: 'inline-block' };
    switch (difficulty?.toLowerCase()) {
      case 'easy':   return <span style={{ ...base, background: 'rgba(104,252,191,0.12)', color: '#68FCBF', border: '1px solid rgba(104,252,191,0.25)', boxShadow: '0 0 8px rgba(104,252,191,0.2)' }}>Easy</span>;
      case 'medium': return <span style={{ ...base, background: 'rgba(255,215,0,0.12)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.25)', boxShadow: '0 0 8px rgba(255,215,0,0.2)' }}>Medium</span>;
      case 'hard':   return <span style={{ ...base, background: 'rgba(255,115,81,0.12)', color: '#FF7351', border: '1px solid rgba(255,115,81,0.25)', boxShadow: '0 0 8px rgba(255,115,81,0.2)' }}>Hard</span>;
      default: return null;
    }
  };

  const selectStyle = {
    height: 56, padding: '0 20px',
    background: 'rgba(32,39,36,0.7)',
    border: '1px solid rgba(182,255,0,0.15)',
    borderRadius: 999,
    color: '#F9FDF9', fontSize: 14,
    outline: 'none', appearance: 'none', WebkitAppearance: 'none',
    cursor: 'pointer', flex: '1 1 150px', minWidth: 140,
  };

  return (
    <div style={{ background: '#0A0F0D', minHeight: '100vh', position: 'relative', boxSizing: 'border-box' }}>
      
      {/* Use the Navbar component */}
      <Navbar/>

      {/* ── Main Content ── */}
      <main style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 48, paddingRight: 48, maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Header */}
        <header style={{ marginBottom: 48, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <h1 style={{ fontSize: 50, fontWeight: 800, color: '#F9FDF9', margin: 0, letterSpacing: '-2px', lineHeight: 1.1 }}>
              Explore Problems
            </h1>
            <p style={{ color: '#A7ACA9', fontSize: 12, letterSpacing: '0.12em', marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#68FCBF' }} />
              {problems.length} CHALLENGES AVAILABLE
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ background: 'rgba(182,255,0,0.03)', backdropFilter: 'blur(20px)', padding: '14px 28px', borderRadius: 12, border: '1px solid rgba(182,255,0,0.12)', textAlign: 'center', minWidth: 110 }}>
              <p style={{ fontSize: 10, color: '#A7ACA9', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Solved</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: '#B6FE00', margin: '4px 0 0' }}>{solvedProblems.length}</p>
            </div>
          </div>
        </header>

        {/* Filters */}
        <section style={{ marginBottom: 36 }}>
          {/* Row: search + selects */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '2 1 260px', minWidth: 220 }}>
              <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex' }}>
                <IconSearch />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, ID, or keywords..."
                style={{ width: '100%', height: 56, paddingLeft: 50, paddingRight: 20, background: 'rgba(32,39,36,0.6)', border: '1px solid rgba(182,255,0,0.2)', borderRadius: 999, outline: 'none', color: '#F9FDF9', fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>

            {/* Difficulty */}
            <select value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })} style={selectStyle}>
              <option value="all">Difficulty: All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Status */}
            <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} style={selectStyle}>
              <option value="all">Status: All</option>
              <option value="solved">Solved</option>
            </select>
          </div>

          {/* Tag pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#A7ACA9', textTransform: 'uppercase', letterSpacing: '0.12em', marginRight: 4 }}>Quick Tags:</span>

            {activeTags.map(tag => (
              <button key={tag} onClick={() => removeTag(tag)} style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(182,255,0,0.35)', color: '#B6FE00', background: 'rgba(182,255,0,0.07)', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                {tag} <IconClose />
              </button>
            ))}

            {availableTags.filter(t => !activeTags.includes(t)).map(tag => (
              <button key={tag} onClick={() => addTag(tag)} style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(113,119,115,0.3)', color: '#A7ACA9', background: 'transparent', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
                {tag}
              </button>
            ))}

            {activeTags.length > 0 && (
              <button onClick={clearAllTags} style={{ padding: '4px 8px', color: '#B6FE00', background: 'none', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                + Clear All
              </button>
            )}
          </div>
        </section>

        {/* Problems Table */}
        <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid rgba(182,255,0,0.1)', background: 'rgba(182,255,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(26,33,30,0.7)', borderBottom: '1px solid rgba(182,255,0,0.18)' }}>
                {['Status', 'Problem', 'Difficulty', 'Tags', 'Action'].map(h => (
                  <th key={h} style={{ padding: '18px 28px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A7ACA9', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem, i) => (
                <tr
                  key={problem._id}
                  style={{ borderBottom: i < filteredProblems.length - 1 ? '1px solid rgba(182,255,0,0.05)' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(182,255,0,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '22px 28px' }}>
                    {isSolved(problem) ? <IconCheck /> : <IconUnchecked />}
                  </td>
                  <td style={{ padding: '22px 28px' }}>
                    <NavLink
                      to={`/problem/${problem._id}`}
                      style={{ color: '#F9FDF9', fontWeight: 600, fontSize: 16, textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#B6FE00'}
                      onMouseLeave={e => e.currentTarget.style.color = '#F9FDF9'}
                    >
                      {problem.title}
                    </NavLink>
                  </td>
                  <td style={{ padding: '22px 28px' }}>
                    {getDifficultyBadge(problem.difficulty)}
                  </td>
                  <td style={{ padding: '22px 28px' }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {(Array.isArray(problem.tags) ? problem.tags : [problem.tags]).map(tag => (
                        <span key={tag} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 6, background: '#202724', color: '#A7ACA9', border: '1px solid rgba(113,119,115,0.2)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '22px 28px' }}>
                    <NavLink
                      to={`/problem/${problem._id}`}
                      style={{ color: '#A7ACA9', display: 'inline-flex', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#B6FE00'}
                      onMouseLeave={e => e.currentTarget.style.color = '#A7ACA9'}
                    >
                      <IconPlay />
                    </NavLink>
                  </td>
                </tr>
              ))}
              {filteredProblems.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '60px', textAlign: 'center', color: '#A7ACA9', fontSize: 14 }}>
                    No problems match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Glow blobs */}
      <div style={{ position: 'fixed', top: 0, right: 0, width: 500, height: 500, background: 'rgba(182,255,0,0.04)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 300, height: 300, background: 'rgba(104,252,191,0.04)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />

      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(167,172,169,0.45); }
        select option { background: #161C19 !important; color: #F9FDF9; }
      `}</style>import Navbar from './../LandingPage/components/Navbar';

    </div>
  );
}

export default HomePage;