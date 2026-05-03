import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams, NavLink } from 'react-router';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';
import ProblemNavbar from '../components/ProblemNavbar';



const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M8 5v14l11-7z"/>
  </svg>
);
const IconUpload = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
  </svg>
);
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);
const IconChevronUp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
  </svg>
);
const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);
const IconExpandMore = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
  </svg>
);
const IconThumbUp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
  </svg>
);
const IconThumbDown = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
  </svg>
);
const IconNotification = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);
const IconError = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);
// ──────────────────────────────────────────────────────────────────────────────

const langIcons = { javascript: 'JS', java: 'Java', cpp: 'C++' };

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeConsoleTab, setActiveConsoleTab] = useState('testcase');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editorFontSize, setEditorFontSize] = useState(14);
  const [editorTextColor, setEditorTextColor] = useState('white');
  const editorRef = useRef(null);
  const { problemId } = useParams();
  const { handleSubmit } = useForm();

  const leftTabs = [
    { id: 'description', label: 'Description',  Icon: () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg> },
    { id: 'editorial', label: 'Editorial',      Icon: () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM21 18.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg> },
    { id: 'solutions', label: 'Solutions',      Icon: () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg> },
    { id: 'submissions', label: 'Submissions',  Icon: () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg> },
    { id: 'chatAI',    label: 'ChatAI',         Icon: () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg> },
  ];

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/problem/getProblem/${problemId}`);
        const initialCode = res.data.startCode.find(sc => sc.language === selectedLanguage)?.initialCode || '';
        setProblem(res.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === selectedLanguage)?.initialCode || '';
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.lang-dropdown-container')) {
        setLangDropdownOpen(false);
      }
      if (!event.target.closest('.settings-dropdown-container')) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEditorChange = (value) => setCode(value || '');
  const handleEditorDidMount = (editor) => { editorRef.current = editor; };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, { code, language: selectedLanguage });
      setRunResult(response.data);
      setActiveConsoleTab('testcase');
    } catch (error) {
      setRunResult({ success: false, error: 'Internal server error' });
      setActiveConsoleTab('testcase');
    }
    setLoading(false);
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, { code, language: selectedLanguage });
      setSubmitResult(response.data);
      setActiveConsoleTab('result');
    } catch (error) {
      setSubmitResult(null);
      setActiveConsoleTab('result');
    }
    setLoading(false);
  };

  const getLanguageForMonaco = (lang) => ({ javascript: 'javascript', java: 'java', cpp: 'cpp' }[lang] || 'javascript');

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':   return { bg: '#006C4B', text: '#68FCBF', border: 'rgba(104,252,191,0.2)' };
      case 'medium': return { bg: 'rgba(255,215,0,0.15)', text: '#FFD700', border: 'rgba(255,215,0,0.3)' };
      case 'hard':   return { bg: 'rgba(255,115,81,0.15)', text: '#FF7351', border: 'rgba(255,115,81,0.3)' };
      default:       return { bg: '#202724', text: '#A7ACA9', border: 'rgba(167,172,169,0.2)' };
    }
  };

  if (loading && !problem) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0A0F0D' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(182,255,0,0.2)', borderTop: '3px solid #B6FE00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const diff = getDifficultyStyle(problem?.difficulty);

  // ── Shared panel style ──
  const panelStyle = {
    background: 'rgba(10,15,13,0.6)',
    backdropFilter: 'blur(20px)',
    borderRadius: 10,
    border: '1px solid rgba(182,255,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const tabBarStyle = {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    background: 'rgba(21,27,24,0.5)',
    flexShrink: 0,
  };

  return (
    <div style={{ background: '#0A0F0D', color: '#F9FDF9', fontFamily: 'Inter, sans-serif', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Navbar (Reusable Component) ── */}
      <ProblemNavbar/>

      {/* ── Body: sidebar + panels ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', paddingTop: '70px' }}>

        {/* Sidebar */}
        <aside style={{ width: 64, flexShrink: 0, background: '#0A0F0D', borderRight: '1px solid rgba(182,255,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, gap: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: 'rgba(182,255,0,0.1)', borderRight: '3px solid #B6FE00', color: '#B6FE00' }}>
              <IconCode />
            </div>
            <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B6FE00' }}>Editor</span>
          </div>
        </aside>

        {/* Main two-panel workspace */}
        <main style={{ flex: 1, display: 'flex', gap: 12, padding: '12px 12px 12px 8px', overflow: 'hidden' }}>

          {/* ── LEFT PANEL: Problem description ── */}
          <section style={{ ...panelStyle, width: '50%', flexShrink: 0 }}>
            {/* Tab bar */}
            <div style={tabBarStyle}>
              {leftTabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveLeftTab(id)}
                  style={{
                    padding: '12px 16px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6,
                    background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s',
                    color: activeLeftTab === id ? '#B6FE00' : '#A7ACA9',
                    borderBottom: activeLeftTab === id ? '2px solid #B6FE00' : '2px solid transparent',
                    fontWeight: activeLeftTab === id ? 600 : 400,
                  }}
                >
                  <Icon /> {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
              {problem && (
                <>
                  {/* ── Description ── */}
                  {activeLeftTab === 'description' && (
                    <div style={{ maxWidth: 640, margin: '0 auto' }}>
                      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F9FDF9', margin: 0, lineHeight: 1.3 }}>
                        {problem.title}
                      </h1>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                        <span style={{ padding: '3px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: diff.bg, color: diff.text, border: `1px solid ${diff.border}` }}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                        <span style={{ fontSize: 12, color: '#A7ACA9', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <IconThumbUp /> 14.2K
                        </span>
                        <span style={{ fontSize: 12, color: '#A7ACA9', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <IconThumbDown /> 451
                        </span>
                      </div>

                      <div style={{ marginTop: 24, color: '#A7ACA9', lineHeight: 1.8, fontSize: 14 }}>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{problem.description}</p>
                      </div>

                      {/* Examples */}
                      {problem.visibleTestCases?.length > 0 && (
                        <div style={{ marginTop: 28 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F9FDF9', marginBottom: 16 }}>Examples:</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {problem.visibleTestCases.map((example, index) => (
                              <div key={index}>
                                <p style={{ fontSize: 14, fontWeight: 600, color: '#F9FDF9', marginBottom: 8 }}>Example {index + 1}:</p>
                                <div style={{ background: '#000', padding: 20, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.9 }}>
                                  <div><span style={{ color: 'rgba(170,239,0,0.65)' }}>Input:</span> <span style={{ color: '#F9FDF9' }}>{example.input}</span></div>
                                  <div><span style={{ color: 'rgba(170,239,0,0.65)' }}>Output:</span> <span style={{ color: '#F9FDF9' }}>{example.output}</span></div>
                                  {example.explanation && (
                                    <div><span style={{ color: 'rgba(170,239,0,0.65)' }}>Explanation:</span> <span style={{ color: '#F9FDF9' }}>{example.explanation}</span></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Constraints */}
                      {problem.constraints && (
                        <div style={{ marginTop: 28 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F9FDF9', marginBottom: 12 }}>Constraints:</h3>
                          <div style={{ color: '#A7ACA9', fontSize: 14, lineHeight: 2, whiteSpace: 'pre-wrap' }}>
                            {problem.constraints}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Editorial ── */}
                  {activeLeftTab === 'editorial' && (
                    <div style={{ maxWidth: 640, margin: '0 auto' }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F9FDF9', marginBottom: 16 }}>Editorial</h2>
                      <Editorial />
                    </div>
                  )}

                  {/* ── Solutions ── */}
                  {activeLeftTab === 'solutions' && (
                    <div style={{ maxWidth: 640, margin: '0 auto' }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F9FDF9', marginBottom: 16 }}>Solutions</h2>
                      {problem.referenceSolution?.map((solution, index) => (
                        <div key={index} style={{ marginBottom: 20, borderRadius: 10, border: '1px solid rgba(182,255,0,0.1)', overflow: 'hidden' }}>
                          <div style={{ background: 'rgba(21,27,24,0.6)', padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#B6FE00' }}>
                            {problem.title} — {solution.language}
                          </div>
                          <pre style={{ margin: 0, padding: 16, background: '#000', color: '#F9FDF9', fontSize: 12, overflowX: 'auto', fontFamily: 'monospace' }}>
                            <code>{solution.completeCode}</code>
                          </pre>
                        </div>
                      )) || <p style={{ color: '#A7ACA9', fontSize: 14 }}>Solutions will be available after you solve the problem.</p>}
                    </div>
                  )}

                  {/* ── Submissions ── */}
                  {activeLeftTab === 'submissions' && (
                    <div style={{ maxWidth: 640, margin: '0 auto' }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F9FDF9', marginBottom: 16 }}>My Submissions</h2>
                      <SubmissionHistory problemId={problemId} />
                    </div>
                  )}

                  {/* ── ChatAI ── */}
                  {activeLeftTab === 'chatAI' && (
                    <div style={{ maxWidth: 640, margin: '0 auto' }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F9FDF9', marginBottom: 16 }}>Chat with AI</h2>
                      <ChatAi problem={problem} />
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* ── RIGHT PANEL: IDE + Console ── */}
          <section style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>

            {/* Editor container */}
            <div style={{ ...panelStyle, flex: 1 }}>
              {/* Editor toolbar */}
              <div style={{ ...tabBarStyle, justifyContent: 'space-between', padding: '8px 16px' }}>
                {/* Language selector */}
                <div style={{ position: 'relative' }} className="lang-dropdown-container">
                  <button
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(32,39,36,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 14px', color: '#F9FDF9', fontSize: 13, cursor: 'pointer' }}
                  >
                    <svg viewBox="0 0 24 24" fill="#B6FE00" width="14" height="14"><path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                    {langIcons[selectedLanguage]}
                    <IconExpandMore />
                  </button>
                  {langDropdownOpen && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, background: 'rgba(18,24,20,0.98)', border: '1px solid rgba(182,255,0,0.2)', borderRadius: 10, overflow: 'hidden', zIndex: 99, minWidth: 130 }}>
                      {['javascript', 'java', 'cpp'].map(lang => (
                        <button
                          key={lang}
                          onClick={() => { setSelectedLanguage(lang); setLangDropdownOpen(false); }}
                          style={{ width: '100%', padding: '9px 16px', background: lang === selectedLanguage ? 'rgba(182,255,0,0.08)' : 'none', border: 'none', color: lang === selectedLanguage ? '#B6FE00' : '#A7ACA9', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                        >
                          {langIcons[lang]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right side: Run, Submit, Settings */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={handleRun}
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 18px', borderRadius: 999, border: '1px solid #B6FE00', background: 'transparent', color: '#E9FFBD', fontSize: 13, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
                  >
                    <IconPlay /> Run
                  </button>
                  <button
                    onClick={handleSubmitCode}
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 18px', borderRadius: 999, border: 'none', background: '#B6FE00', color: '#415E00', fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, boxShadow: '0 0 20px rgba(182,255,0,0.2)' }}
                  >
                    <IconUpload /> Submit
                  </button>
                  
                  {/* Settings dropdown */}
                  <div style={{ position: 'relative' }} className="settings-dropdown-container">
                    <button 
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      style={{ background: 'none', border: 'none', color: '#A7ACA9', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' }}
                    >
                      <IconSettings />
                    </button>
                    {settingsOpen && (
                      <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: 'rgba(18,24,20,0.98)', border: '1px solid rgba(182,255,0,0.2)', borderRadius: 10, overflow: 'hidden', zIndex: 99, minWidth: 200, padding: '12px' }}>
                        {/* Font Size */}
                        <div style={{ marginBottom: 16 }}>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#B6FE00', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Font Size</p>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {[12, 14, 16, 18, 20].map(size => (
                              <button
                                key={size}
                                onClick={() => setEditorFontSize(size)}
                                style={{ padding: '6px 12px', borderRadius: 6, border: editorFontSize === size ? '1px solid #B6FE00' : '1px solid rgba(255,255,255,0.1)', background: editorFontSize === size ? 'rgba(182,255,0,0.1)' : 'rgba(32,39,36,0.4)', color: editorFontSize === size ? '#B6FE00' : '#A7ACA9', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                              >
                                {size}px
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Text Color */}
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#B6FE00', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Text Color</p>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {[
                              { name: 'White', value: 'white' },
                              { name: 'Green', value: '#68FCBF' },
                              { name: 'Blue', value: '#4A9EFF' },
                              { name: 'Black', value: '#000000' },
                              { name: 'Red', value: '#FF7351' }
                            ].map(color => (
                              <button
                                key={color.value}
                                onClick={() => setEditorTextColor(color.value)}
                                style={{ padding: '6px 12px', borderRadius: 6, border: editorTextColor === color.value ? '1px solid #B6FE00' : '1px solid rgba(255,255,255,0.1)', background: editorTextColor === color.value ? 'rgba(182,255,0,0.1)' : 'rgba(32,39,36,0.4)', color: editorTextColor === color.value ? '#B6FE00' : '#A7ACA9', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                              >
                                <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: color.value, marginRight: 6, border: '1px solid rgba(255,255,255,0.2)' }} />
                                {color.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Monaco Editor */}
              <div style={{ flex: 1, minHeight: 0 }}>
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    fontSize: editorFontSize,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: 'line',
                    roundedSelection: false,
                    cursorStyle: 'line',
                    mouseWheelZoom: true,
                  }}
                />
              </div>
            </div>

            {/* ── Console panel ── */}
            <div style={{ ...panelStyle, height: '34%', flexShrink: 0 }}>
              {/* Console tab bar */}
              <div style={{ ...tabBarStyle, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                  {[{ id: 'testcase', label: 'TESTCASE' }, { id: 'result', label: 'RESULT' }].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setActiveConsoleTab(id)}
                      style={{
                        padding: '10px 20px', fontSize: 11, letterSpacing: '0.1em', fontWeight: 600,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: activeConsoleTab === id ? '#68FCBF' : '#A7ACA9',
                        borderBottom: activeConsoleTab === id ? '2px solid #68FCBF' : '2px solid transparent',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <button style={{ background: 'none', border: 'none', color: '#A7ACA9', cursor: 'pointer', padding: '0 14px', display: 'flex', alignItems: 'center' }}>
                  <IconChevronUp />
                </button>
              </div>

              {/* Console content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>

                {/* ── TESTCASE tab ── */}
                {activeConsoleTab === 'testcase' && (
                  <div>
                    {runResult ? (
                      <div>
                        {/* Status header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: runResult.success ? '#68FCBF' : '#FF7351' }}>
                          {runResult.success ? <IconCheckCircle /> : <IconError />}
                          <span style={{ fontWeight: 700, fontSize: 14 }}>
                            {runResult.success ? 'All test cases passed!' : 'Some test cases failed'}
                          </span>
                          {runResult.success && (
                            <span style={{ fontSize: 12, color: '#A7ACA9', marginLeft: 8 }}>
                              Runtime: {runResult.runtime} sec · Memory: {runResult.memory} KB
                            </span>
                          )}
                        </div>
                        {/* Test case details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {runResult.testCases?.map((tc, i) => (
                            <div key={i} style={{ background: 'rgba(32,39,36,0.4)', borderRadius: 8, padding: 14, border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace', fontSize: 12, lineHeight: 1.8 }}>
                              <div><span style={{ color: '#A7ACA9' }}>Input:</span> <span style={{ color: '#F9FDF9' }}>{tc.stdin}</span></div>
                              <div><span style={{ color: '#A7ACA9' }}>Expected:</span> <span style={{ color: '#F9FDF9' }}>{tc.expected_output}</span></div>
                              <div><span style={{ color: '#A7ACA9' }}>Output:</span> <span style={{ color: '#F9FDF9' }}>{tc.stdout}</span></div>
                              <div style={{ color: tc.status_id === 3 ? '#68FCBF' : '#FF7351', fontWeight: 700 }}>
                                {tc.status_id === 3 ? '✓ Passed' : '✗ Failed'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Default testcase display from problem */
                      problem?.visibleTestCases?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                          {problem.visibleTestCases.slice(0, 1).map((tc, i) => (
                            <div key={i}>
                              <p style={{ fontSize: 11, fontWeight: 700, color: '#68FCBF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Input =</p>
                              <div style={{ background: 'rgba(32,39,36,0.4)', borderRadius: 8, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace', fontSize: 13, color: '#F9FDF9' }}>
                                {tc.input}
                              </div>
                            </div>
                          ))}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#68FCBF', boxShadow: '0 0 8px rgba(104,252,191,0.5)' }} />
                            <span style={{ fontSize: 11, color: '#68FCBF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Workspace Ready</span>
                          </div>
                        </div>
                      ) : (
                        <p style={{ color: '#A7ACA9', fontSize: 13 }}>Click "Run" to test your code with the example test cases.</p>
                      )
                    )}
                  </div>
                )}

                {/* ── RESULT tab ── */}
                {activeConsoleTab === 'result' && (
                  <div>
                    {submitResult ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, color: submitResult.accepted ? '#68FCBF' : '#FF7351' }}>
                          {submitResult.accepted ? <IconCheckCircle /> : <IconError />}
                          <span style={{ fontSize: 18, fontWeight: 700 }}>
                            {submitResult.accepted ? '🎉 Accepted' : `❌ ${submitResult.error || 'Wrong Answer'}`}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ background: 'rgba(32,39,36,0.4)', borderRadius: 8, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                            <span style={{ color: '#A7ACA9' }}>Test Cases: </span>
                            <span style={{ color: '#F9FDF9', fontWeight: 600 }}>{submitResult.passedTestCases}/{submitResult.totalTestCases}</span>
                          </div>
                          {submitResult.accepted && (
                            <>
                              <div style={{ background: 'rgba(32,39,36,0.4)', borderRadius: 8, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                                <span style={{ color: '#A7ACA9' }}>Runtime: </span>
                                <span style={{ color: '#F9FDF9', fontWeight: 600 }}>{submitResult.runtime} sec</span>
                              </div>
                              <div style={{ background: 'rgba(32,39,36,0.4)', borderRadius: 8, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                                <span style={{ color: '#A7ACA9' }}>Memory: </span>
                                <span style={{ color: '#F9FDF9', fontWeight: 600 }}>{submitResult.memory} KB</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: '#A7ACA9', fontSize: 13 }}>Click "Submit" to submit your solution for evaluation.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Glow blobs */}
      <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: '50%', height: '50%', background: 'rgba(182,255,0,0.04)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(104,252,191,0.04)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0A0F0D; }
        ::-webkit-scrollbar-thumb { background: rgba(182,255,0,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};
  

export default ProblemPage;