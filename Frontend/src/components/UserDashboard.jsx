import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import { useSelector } from 'react-redux';

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconBack = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
  </svg>
);
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);
const IconFlame = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);
const IconCheckAll = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);
const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
  </svg>
);
// ──────────────────────────────────────────────────────────────────────────────

const DIFFICULTY_COLORS = {
  easy:   { text: '#68FCBF', bg: 'rgba(104,252,191,0.1)',  border: 'rgba(104,252,191,0.25)' },
  medium: { text: '#FFD700', bg: 'rgba(255,215,0,0.1)',    border: 'rgba(255,215,0,0.25)' },
  hard:   { text: '#FF7351', bg: 'rgba(255,115,81,0.1)',   border: 'rgba(255,115,81,0.25)' },
};

const StatCard = ({ icon, label, value, accent, delay }) => (
  <div style={{
    background: 'rgba(21,27,24,0.7)',
    border: `1px solid ${accent}33`,
    borderRadius: 14,
    padding: 'clamp(16px, 4vw, 22px) clamp(18px, 4vw, 24px)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(12px, 3vw, 18px)',
    animation: `fadeUp 0.5s ease both`,
    animationDelay: delay,
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{
      width: 'clamp(40px, 8vw, 48px)', 
      height: 'clamp(40px, 8vw, 48px)', 
      borderRadius: 12,
      background: `${accent}18`,
      border: `1px solid ${accent}44`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: accent, flexShrink: 0,
    }}>
      {icon}
    </div>
    <div>
      <div style={{ 
        fontSize: 'clamp(22px, 5vw, 26px)', 
        fontWeight: 800, 
        color: '#F9FDF9', 
        lineHeight: 1, 
        fontFamily: "'Space Grotesk', monospace" 
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: 'clamp(10px, 2.5vw, 12px)', 
        color: '#6B7570', 
        marginTop: 4, 
        textTransform: 'uppercase', 
        letterSpacing: '0.08em', 
        fontWeight: 500 
      }}>
        {label}
      </div>
    </div>
    <div style={{
      position: 'absolute', right: -20, top: -20, width: 80, height: 80,
      background: accent, filter: 'blur(40px)', opacity: 0.06, borderRadius: '50%',
    }} />
  </div>
);

const DonutChart = ({ easy, medium, hard, total }) => {
  const size = window.innerWidth < 768 ? 120 : 140;
  const cx = size / 2, cy = size / 2, r = size < 130 ? 42 : 52, stroke = size < 130 ? 10 : 12;
  const circumference = 2 * Math.PI * r;

  const segments = [
    { count: easy,   color: '#68FCBF', label: 'Easy' },
    { count: medium, color: '#FFD700', label: 'Medium' },
    { count: hard,   color: '#FF7351', label: 'Hard' },
  ];

  let offset = 0;
  const arcs = segments.map(seg => {
    const pct = total > 0 ? seg.count / total : 0;
    const dash = pct * circumference;
    const gap  = circumference - dash;
    const arc  = { ...seg, dash, gap, offset };
    offset += dash;
    return arc;
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 4vw, 24px)', flexWrap: 'wrap', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        {arcs.map((arc, i) => (
          arc.count > 0 && (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={arc.color} strokeWidth={stroke}
              strokeDasharray={`${arc.dash} ${arc.gap}`}
              strokeDashoffset={-arc.offset}
              strokeLinecap="round"
            />
          )
        ))}
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
          style={{ transform: 'rotate(90deg)', transformOrigin: `${cx}px ${cy}px`, fill: '#F9FDF9', fontSize: size < 130 ? 18 : 22, fontWeight: 800, fontFamily: 'monospace' }}>
          {total}
        </text>
        <text x={cx} y={cy + (size < 130 ? 14 : 18)} textAnchor="middle" dominantBaseline="middle"
          style={{ transform: 'rotate(90deg)', transformOrigin: `${cx}px ${cy}px`, fill: '#6B7570', fontSize: size < 130 ? 8 : 10, fontFamily: 'monospace', letterSpacing: 1 }}>
          SOLVED
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {segments.map(seg => (
          <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: seg.color, flexShrink: 0 }} />
            <span style={{ fontSize: 'clamp(11px, 3vw, 12px)', color: '#A7ACA9', width: 48 }}>{seg.label}</span>
            <span style={{ fontSize: 'clamp(13px, 3.5vw, 14px)', fontWeight: 700, color: '#F9FDF9', fontFamily: 'monospace' }}>{seg.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.user || state.auth?.user || null);

  const [solvedProblems, setSolvedProblems]   = useState([]);
  const [loadingSolved, setLoadingSolved]     = useState(true);
  const [filterDiff, setFilterDiff]           = useState('all');
  const [searchQuery, setSearchQuery]         = useState('');
  const [activeTab, setActiveTab]             = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingSolved(true);
        const res = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(res.data || []);
      } catch (e) {
        console.error('Error fetching solved problems:', e);
        setSolvedProblems([]);
      } finally {
        setLoadingSolved(false);
      }
    };
    fetchData();
  }, []);

  // ── Stats derived from solved problems ──
  const easySolved   = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'easy').length;
  const mediumSolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'medium').length;
  const hardSolved   = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'hard').length;
  const totalSolved  = solvedProblems.length;

  // Tag frequency - SAFE VERSION
  const tagCounts = {};
  solvedProblems.forEach(p => {
    let tagsArray = [];
    
    if (Array.isArray(p.tags)) {
      tagsArray = p.tags;
    } else if (typeof p.tags === 'string' && p.tags.trim()) {
      tagsArray = p.tags.split(',').map(t => t.trim());
    } else if (p.tags && typeof p.tags === 'object') {
      tagsArray = Object.values(p.tags);
    }
    
    tagsArray.forEach(t => {
      if (t && typeof t === 'string') {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      }
    });
  });
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const filtered = solvedProblems.filter(p => {
    const diffMatch = filterDiff === 'all' || p.difficulty?.toLowerCase() === filterDiff;
    const searchMatch = !searchQuery || p.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return diffMatch && searchMatch;
  });

  const firstName = user?.firstName || user?.name || 'Coder';
  const emailId   = user?.emailId   || user?.email || '';
  const initials  = firstName.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    try {
      await axiosClient.post('/user/logout');
    } catch {}
    navigate('/login');
  };

  return (
    <div style={{ background: '#0A0F0D', color: '#F9FDF9', minHeight: '100vh', fontFamily: "'DM Sans', 'Space Grotesk', sans-serif" }}>

      {/* ── Navbar - Responsive (Logout button removed from desktop) ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px clamp(16px, 4vw, 32px)',
        background: 'rgba(10,15,13,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(182,255,0,0.1)',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 20px)', flexWrap: 'wrap' }}>
          <button onClick={() => navigate(-1)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(182,255,0,0.08)', border: '1px solid rgba(182,255,0,0.2)',
            color: '#B6FE00', borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
            fontSize: 13, fontWeight: 600,
          }}>
            <IconBack /> <span className="back-text">Back</span>
          </button>
          <NavLink to="/" style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 800, color: '#E8FFF8', textDecoration: 'none', letterSpacing: '-0.5px' }}>
            CodeLoom
          </NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'rgba(182,255,0,0.08)',
            border: '1px solid rgba(182,255,0,0.2)',
            borderRadius: 8,
            padding: '7px 12px',
            cursor: 'pointer',
            color: '#B6FE00',
            fontSize: 12,
            fontWeight: 600,
          }}
          className="mobile-menu-btn"
        >
          Menu
        </button>

        {/* Desktop User Info - NO LOGOUT BUTTON */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'clamp(8px, 2vw, 12px)',
          flexWrap: 'wrap',
        }} className="desktop-user-info">
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'clamp(13px, 3.5vw, 14px)', fontWeight: 700, color: '#F9FDF9' }}>{firstName}</div>
            <div style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', color: '#6B7570' }}>{emailId}</div>
          </div>
          <div style={{
            width: 'clamp(34px, 8vw, 38px)', 
            height: 'clamp(34px, 8vw, 38px)', 
            borderRadius: '50%',
            border: '2px solid #B6FE00', background: '#1A211E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'clamp(12px, 3vw, 14px)', color: '#B6FE00', fontWeight: 800,
          }}>
            {initials}
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown (Logout only appears here) */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          right: '16px',
          background: 'rgba(10,15,13,0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(182,255,0,0.2)',
          borderRadius: 12,
          padding: '16px',
          zIndex: 100,
          minWidth: '200px',
        }}>
          <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(182,255,0,0.1)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F9FDF9' }}>{firstName}</div>
            <div style={{ fontSize: 11, color: '#6B7570' }}>{emailId}</div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            background: 'rgba(255,115,81,0.08)', border: '1px solid rgba(255,115,81,0.2)',
            color: '#FF7351', borderRadius: 8, padding: '10px', cursor: 'pointer',
            fontSize: 13, fontWeight: 600,
          }}>
            <IconLogout /> Logout
          </button>
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(24px, 5vw, 36px) clamp(16px, 4vw, 24px)' }}>

        {/* ── Hero banner - Responsive ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(182,255,0,0.07) 0%, rgba(104,252,191,0.05) 50%, rgba(10,15,13,0) 100%)',
          border: '1px solid rgba(182,255,0,0.15)',
          borderRadius: 18, 
          padding: 'clamp(24px, 5vw, 32px) clamp(20px, 4vw, 36px)', 
          marginBottom: 32,
          display: 'flex', 
          alignItems: 'center', 
          gap: 'clamp(20px, 4vw, 28px)',
          flexWrap: 'wrap',
          position: 'relative', overflow: 'hidden',
          animation: 'fadeUp 0.4s ease both',
        }}>
          <div style={{
            width: 'clamp(65px, 12vw, 80px)', 
            height: 'clamp(65px, 12vw, 80px)', 
            borderRadius: '50%',
            border: '3px solid #B6FE00',
            background: 'linear-gradient(135deg, #1A2E1E, #0D1A10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 900, color: '#B6FE00', flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontSize: 'clamp(22px, 5vw, 28px)', 
              fontWeight: 800, 
              color: '#F9FDF9', 
              letterSpacing: '-0.5px',
              wordBreak: 'break-word'
            }}>
              {firstName}
            </div>
            <div style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#6B7570', marginTop: 4, wordBreak: 'break-word' }}>{emailId}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(182,255,0,0.12)', border: '1px solid rgba(182,255,0,0.25)', color: '#B6FE00', borderRadius: 6, padding: '3px 10px', fontSize: 'clamp(10px, 2.5vw, 11px)', fontWeight: 700 }}>
                🏅 Active Coder
              </span>
              {totalSolved >= 50 && (
                <span style={{ background: 'rgba(104,252,191,0.12)', border: '1px solid rgba(104,252,191,0.25)', color: '#68FCBF', borderRadius: 6, padding: '3px 10px', fontSize: 'clamp(10px, 2.5vw, 11px)', fontWeight: 700 }}>
                  🔥 50+ Solved
                </span>
              )}
            </div>
          </div>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, background: '#B6FE00', filter: 'blur(100px)', opacity: 0.04, borderRadius: '50%' }} />
        </div>

        {/* ── Stat Cards - Responsive Grid ── */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', 
          gap: 'clamp(12px, 3vw, 16px)', 
          marginBottom: 32 
        }}>
          <StatCard icon={<IconTrophy />}   label="Total Solved"  value={totalSolved}  accent="#B6FE00" delay="0.1s" />
          <StatCard icon={<IconTarget />}   label="Easy Solved"   value={easySolved}   accent="#68FCBF" delay="0.15s" />
          <StatCard icon={<IconFlame />}    label="Medium Solved" value={mediumSolved}  accent="#FFD700" delay="0.2s" />
          <StatCard icon={<IconCheckAll />} label="Hard Solved"   value={hardSolved}   accent="#FF7351" delay="0.25s" />
        </div>

        {/* ── Tabs - Responsive ── */}
        <div style={{ 
          display: 'flex', 
          gap: 4, 
          marginBottom: 24, 
          borderBottom: '1px solid rgba(255,255,255,0.06)', 
          paddingBottom: 0,
          flexWrap: 'wrap',
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'problems', label: `Solved (${totalSolved})` },
            { id: 'topics',   label: 'Topics' },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === id ? '#B6FE00' : '#6B7570',
              borderBottom: activeTab === id ? '2px solid #B6FE00' : '2px solid transparent',
              padding: 'clamp(8px, 2vw, 10px) clamp(16px, 3vw, 20px)', 
              fontSize: 'clamp(12px, 3vw, 13px)', 
              fontWeight: activeTab === id ? 700 : 400,
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB - Responsive ── */}
        {activeTab === 'overview' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', 
            gap: 20, 
            animation: 'fadeUp 0.4s ease both' 
          }}>

            {/* Difficulty Breakdown */}
            <div style={{ background: 'rgba(21,27,24,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 'clamp(20px, 4vw, 24px) clamp(20px, 4vw, 28px)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 700, color: '#A7ACA9', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Difficulty Breakdown
              </h3>
              <DonutChart easy={easySolved} medium={mediumSolved} hard={hardSolved} total={totalSolved} />
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Easy',   solved: easySolved,   color: '#68FCBF' },
                  { label: 'Medium', solved: mediumSolved,  color: '#FFD700' },
                  { label: 'Hard',   solved: hardSolved,   color: '#FF7351' },
                ].map(({ label, solved, color }) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 'clamp(11px, 2.5vw, 12px)' }}>
                      <span style={{ color: '#A7ACA9' }}>{label}</span>
                      <span style={{ color, fontWeight: 700 }}>{solved}</span>
                    </div>
                    <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${totalSolved > 0 ? (solved / totalSolved) * 100 : 0}%`, background: color, borderRadius: 10, transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Topics */}
            <div style={{ background: 'rgba(21,27,24,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 'clamp(20px, 4vw, 24px) clamp(20px, 4vw, 28px)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 700, color: '#A7ACA9', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Top Topics Solved
              </h3>
              {topTags.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {topTags.map(([tag, count]) => (
                    <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#B6FE00', flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#D4DDD8', textTransform: 'capitalize', minWidth: '80px' }}>{tag}</span>
                      <div style={{ height: 4, width: 'clamp(60px, 15vw, 80px)', background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(count / (topTags[0]?.[1] || 1)) * 100}%`, background: 'linear-gradient(90deg, #B6FE00, #68FCBF)', borderRadius: 10 }} />
                      </div>
                      <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 700, color: '#B6FE00', minWidth: 20, textAlign: 'right', fontFamily: 'monospace' }}>{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#6B7570', fontSize: 13 }}>Solve more problems to see topic analysis.</p>
              )}
            </div>

            {/* Recent Activity */}
            <div style={{ gridColumn: '1 / -1', background: 'rgba(21,27,24,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 'clamp(20px, 4vw, 24px) clamp(20px, 4vw, 28px)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 700, color: '#A7ACA9', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Recently Solved
              </h3>
              {solvedProblems.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {solvedProblems.slice(0, 5).map((p, i) => {
                    const dc = DIFFICULTY_COLORS[p.difficulty?.toLowerCase()] || DIFFICULTY_COLORS.easy;
                    return (
                      <div key={p._id} onClick={() => navigate(`/problem/${p._id}`)} style={{
                        display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2.5vw, 16px)',
                        padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 3vw, 16px)', 
                        borderRadius: 10, cursor: 'pointer',
                        transition: 'background 0.15s',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                        flexWrap: 'wrap',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(182,255,0,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}
                      >
                        <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#6B7570', minWidth: 24, fontFamily: 'monospace' }}>#{i + 1}</span>
                        <span style={{ flex: 1, fontSize: 'clamp(13px, 3vw, 14px)', color: '#D4DDD8', fontWeight: 500, wordBreak: 'break-word' }}>{p.title}</span>
                        <span style={{
                          padding: '3px 10px', borderRadius: 6, fontSize: 'clamp(10px, 2.5vw, 11px)', fontWeight: 700,
                          background: dc.bg, color: dc.text, border: `1px solid ${dc.border}`,
                          whiteSpace: 'nowrap',
                        }}>
                          {p.difficulty?.charAt(0).toUpperCase() + p.difficulty?.slice(1)}
                        </span>
                        <span style={{ color: '#68FCBF', fontSize: 'clamp(16px, 4vw, 18px)' }}>✓</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7570' }}>
                  <IconCode />
                  <p style={{ marginTop: 12, fontSize: 14 }}>No problems solved yet. Start coding!</p>
                  <button onClick={() => navigate('/')} style={{
                    marginTop: 12, background: 'rgba(182,255,0,0.1)', border: '1px solid rgba(182,255,0,0.25)',
                    color: '#B6FE00', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  }}>
                    Browse Problems
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PROBLEMS TAB - Responsive ── */}
        {activeTab === 'problems' && (
          <div style={{ animation: 'fadeUp 0.4s ease both' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search problems..."
                style={{
                  flex: 1, minWidth: 200, background: 'rgba(21,27,24,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)', color: '#F9FDF9',
                  borderRadius: 8, padding: '9px 16px', fontSize: 13, outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['all', 'easy', 'medium', 'hard'].map(d => (
                  <button key={d} onClick={() => setFilterDiff(d)} style={{
                    background: filterDiff === d ? (d === 'all' ? 'rgba(182,255,0,0.15)' : DIFFICULTY_COLORS[d]?.bg) : 'rgba(21,27,24,0.8)',
                    border: `1px solid ${filterDiff === d ? (d === 'all' ? 'rgba(182,255,0,0.3)' : DIFFICULTY_COLORS[d]?.border) : 'rgba(255,255,255,0.1)'}`,
                    color: filterDiff === d ? (d === 'all' ? '#B6FE00' : DIFFICULTY_COLORS[d]?.text) : '#A7ACA9',
                    borderRadius: 8, padding: '9px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    textTransform: 'capitalize',
                  }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {loadingSolved ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <div style={{ width: 36, height: 36, border: '3px solid rgba(182,255,0,0.2)', borderTop: '3px solid #B6FE00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              </div>
            ) : filtered.length > 0 ? (
              <div style={{ background: 'rgba(21,27,24,0.6)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'auto' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'minmax(40px, 50px) minmax(150px, 1fr) minmax(80px, 100px) minmax(100px, 120px)', 
                  gap: 'clamp(8px, 2vw, 16px)', 
                  padding: '12px clamp(12px, 3vw, 20px)', 
                  borderBottom: '1px solid rgba(255,255,255,0.06)', 
                  fontSize: 'clamp(10px, 2.5vw, 11px)', 
                  fontWeight: 700, 
                  color: '#6B7570', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em',
                  minWidth: '600px'
                }}>
                  <span>#</span><span>Title</span><span>Difficulty</span><span>Tags</span>
                </div>
                {filtered.map((p, i) => {
                  const dc = DIFFICULTY_COLORS[p.difficulty?.toLowerCase()] || DIFFICULTY_COLORS.easy;
                  let displayTags = [];
                  if (Array.isArray(p.tags)) {
                    displayTags = p.tags;
                  } else if (typeof p.tags === 'string' && p.tags.trim()) {
                    displayTags = p.tags.split(',').map(t => t.trim());
                  }
                  return (
                    <div key={p._id} onClick={() => navigate(`/problem/${p._id}`)} style={{
                      display: 'grid', 
                      gridTemplateColumns: 'minmax(40px, 50px) minmax(150px, 1fr) minmax(80px, 100px) minmax(100px, 120px)', 
                      gap: 'clamp(8px, 2vw, 16px)',
                      padding: '14px clamp(12px, 3vw, 20px)', 
                      cursor: 'pointer', 
                      alignItems: 'center',
                      borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      transition: 'background 0.15s',
                      minWidth: '600px'
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(182,255,0,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#6B7570', fontFamily: 'monospace' }}>{i + 1}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ color: '#68FCBF', fontSize: 'clamp(12px, 3vw, 14px)' }}>✓</span>
                        <span style={{ fontSize: 'clamp(13px, 3vw, 14px)', color: '#D4DDD8', fontWeight: 500, wordBreak: 'break-word' }}>{p.title}</span>
                      </div>
                      <span style={{ 
                        padding: '3px 10px', borderRadius: 6, fontSize: 'clamp(10px, 2.5vw, 11px)', fontWeight: 700, 
                        background: dc.bg, color: dc.text, border: `1px solid ${dc.border}`, 
                        width: 'fit-content',
                        whiteSpace: 'nowrap'
                      }}>
                        {p.difficulty?.charAt(0).toUpperCase() + p.difficulty?.slice(1)}
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {displayTags.slice(0, 2).map(tag => (
                          <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(182,255,0,0.07)', border: '1px solid rgba(182,255,0,0.15)', color: '#8BA88A', borderRadius: 4, padding: '2px 7px', fontSize: 'clamp(9px, 2vw, 10px)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                            <IconTag />{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B7570' }}>
                <p>No problems match your filter.</p>
              </div>
            )}
          </div>
        )}

        {/* ── TOPICS TAB - Responsive ── */}
        {activeTab === 'topics' && (
          <div style={{ animation: 'fadeUp 0.4s ease both' }}>
            {topTags.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', 
                gap: 16 
              }}>
                {topTags.map(([tag, count], i) => (
                  <div key={tag} style={{
                    background: 'rgba(21,27,24,0.7)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12, padding: 'clamp(16px, 4vw, 20px) clamp(18px, 4vw, 22px)',
                    animation: `fadeUp 0.4s ease both`, animationDelay: `${i * 0.05}s`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontSize: 'clamp(14px, 3.5vw, 15px)', fontWeight: 700, color: '#D4DDD8', textTransform: 'capitalize' }}>{tag}</span>
                      <span style={{ fontSize: 'clamp(18px, 5vw, 22px)', fontWeight: 900, color: '#B6FE00', fontFamily: 'monospace' }}>{count}</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 10,
                        width: `${(count / (topTags[0]?.[1] || 1)) * 100}%`,
                        background: `linear-gradient(90deg, #B6FE00, #68FCBF)`,
                        transition: 'width 0.8s ease',
                      }} />
                    </div>
                    <div style={{ marginTop: 8, fontSize: 'clamp(10px, 2.5vw, 11px)', color: '#6B7570' }}>
                      {count} problem{count !== 1 ? 's' : ''} solved in this topic
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#6B7570' }}>
                <p style={{ fontSize: 15 }}>No topic data yet. Solve tagged problems to see your strengths!</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Glow blobs - responsive */}
      <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: 'clamp(250px, 45vw, 45%)', height: 'clamp(250px, 45vw, 45%)', background: 'rgba(182,255,0,0.04)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: 'clamp(200px, 40vw, 40%)', height: 'clamp(200px, 40vw, 40%)', background: 'rgba(104,252,191,0.04)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Space+Grotesk:wght@400;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0F0D; }
        ::-webkit-scrollbar-thumb { background: rgba(182,255,0,0.2); border-radius: 10px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        @media (max-width: 768px) {
          .desktop-user-info {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;