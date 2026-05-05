// AdminDelete.jsx - MERGED VERSION (Beautiful design + Working backend)
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { 
  Search,
  Terminal,
  RefreshCw,
  Trash2,
  Filter,
  CheckSquare,
  Code,
  Eye,
  Database,
  Leaf,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Are you sure you want to delete this problem? This action CANNOT be undone!')) return;
    
    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
      setSelectedProblems(selectedProblems.filter(selectedId => selectedId !== id));
      alert('✅ Problem deleted successfully!');
    } catch (err) {
      setError('Failed to delete problem');
      console.error(err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProblems.length === 0) return;
    
    const confirmMessage = `⚠️ DANGER ZONE ⚠️\n\nYou are about to delete ${selectedProblems.length} problem(s).\nThis action CANNOT be undone!\n\nType "CONFIRM DELETE" to proceed.`;
    const userInput = prompt(confirmMessage);
    
    if (userInput !== 'CONFIRM DELETE') {
      alert('❌ Deletion cancelled. You did not type the confirmation phrase.');
      return;
    }
    
    setDeleting(true);
    let successCount = 0;
    let failCount = 0;
    
    for (const id of selectedProblems) {
      try {
        await axiosClient.delete(`/problem/delete/${id}`);
        successCount++;
      } catch (err) {
        failCount++;
        console.error(`Failed to delete ${id}:`, err);
      }
    }
    
    // Refresh the list
    await fetchProblems();
    setSelectedProblems([]);
    setDeleting(false);
    
    alert(`✅ Deletion Complete!\n\nSuccessfully deleted: ${successCount}\nFailed: ${failCount}`);
  };

  const toggleSelectAll = () => {
    if (selectedProblems.length === filteredProblems.length) {
      setSelectedProblems([]);
    } else {
      setSelectedProblems(filteredProblems.map(p => p._id));
    }
  };

  const toggleProblemSelection = (problemId) => {
    if (selectedProblems.includes(problemId)) {
      setSelectedProblems(selectedProblems.filter(id => id !== problemId));
    } else {
      setSelectedProblems([...selectedProblems, problemId]);
    }
  };

  const filteredProblems = problems.filter(problem =>
    problem.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    problem._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    problem.tags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'easy') {
      return {
        dot: 'bg-[#68fcbf] shadow-[0_0_8px_#34D399]',
        text: 'text-[#68fcbf]',
        bg: 'bg-[#68fcbf]/10'
      };
    } else if (difficulty === 'medium') {
      return {
        dot: 'bg-[#b5fe00] shadow-[0_0_8px_#B6FF00]',
        text: 'text-[#b5fe00]',
        bg: 'bg-[#b5fe00]/10'
      };
    } else {
      return {
        dot: 'bg-[#ff7351] animate-pulse shadow-[0_0_8px_#FF7351]',
        text: 'text-[#ff7351]',
        bg: 'bg-[#ff7351]/10'
      };
    }
  };

  const getIcon = () => {
    return <Code size={24} className="text-[#b5fe00]/60" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b5fe00]/20 border-t-[#b5fe00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a7aca9]">Loading problems from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <AlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <p className="text-red-400 text-lg">{error}</p>
          <button 
            onClick={fetchProblems}
            className="mt-4 bg-[#b5fe00] text-[#476700] px-6 py-2 rounded-full font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0F0D] text-[#E8FFF8] font-body min-h-screen">
      {/* Main Content Canvas */}
      <div className="p-8 lg:p-12 relative overflow-y-auto">
        {/* Decorative background glow */}
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-[#e9ffbd]/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Header with stats */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trash2 className="text-[#ff7351]" size={32} />
            <h1 className="font-['Space_Grotesk'] text-4xl font-bold text-[#f9fdf9]">Delete Problems</h1>
          </div>
          <p className="text-[#a7aca9] ml-11">
            Permanently remove problems from the database. <span className="text-[#ff7351]">⚠️ This action is irreversible!</span>
          </p>
        </div>

        {/* Problem Management Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center justify-between px-2 flex-wrap gap-4">
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-[#f9fdf9] flex items-center gap-3">
              <span className="w-2 h-8 bg-[#ff7351] rounded-full"></span>
              Staged for Decommissioning
              <span className="text-sm text-[#a7aca9]">({filteredProblems.length} problems)</span>
            </h3>
            <div className="flex gap-4">
              <button 
                onClick={() => fetchProblems()}
                className="flex items-center gap-2 text-xs font-bold text-[#b5fe00] px-4 py-2 rounded-full border border-[#b5fe00]/20 hover:bg-[#b5fe00]/5 transition-all"
              >
                <RefreshCw size={14} />
                REFRESH
              </button>
              <button 
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-xs font-bold text-[#a7aca9] px-4 py-2 rounded-full hover:text-[#f9fdf9] transition-all"
              >
                <CheckSquare size={14} />
                SELECT ALL
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a7aca9]" size={18} />
            <input 
              className="w-full bg-[#202724]/40 border border-[#444946]/30 rounded-full pl-12 pr-6 py-2.5 text-[#f9fdf9] placeholder:text-[#a7aca9]/40 focus:ring-2 focus:ring-[#b5fe00]/50 transition-all font-body text-sm outline-none" 
              placeholder="Search problems by ID, name or tags..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4 mt-4">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#a7aca9]">No problems found. Try a different search term.</p>
              </div>
            ) : (
              filteredProblems.map((problem) => {
                const difficultyColors = getDifficultyColor(problem.difficulty?.toLowerCase());
                const isSelected = selectedProblems.includes(problem._id);
                
                return (
                  <div 
                    key={problem._id}
                    className={`group relative flex items-center gap-6 p-6 rounded-lg transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[#ff7351]/10 border border-[#ff7351]/40' 
                        : 'glass-card hover:border-[#b5fe00]/40'
                    }`}
                    style={{
                      background: isSelected 
                        ? 'rgba(255, 115, 81, 0.05)' 
                        : 'rgba(182, 255, 0, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: isSelected
                        ? '1px solid rgba(255, 115, 81, 0.4)'
                        : '1px solid rgba(182, 255, 0, 0.08)'
                    }}
                  >
                    <div className="w-12 h-12 flex-shrink-0 bg-[#202724] rounded-lg flex items-center justify-center border border-[#b5fe00]/10">
                      {getIcon()}
                    </div>
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-4 items-center gap-6">
                      <div className="col-span-1">
                        <h4 className="font-['Space_Grotesk'] font-bold text-[#f9fdf9]">{problem.title}</h4>
                        <p className="text-[10px] font-mono text-[#b5fe00]/40 uppercase tracking-tighter">
                          {problem._id?.slice(-8)}
                        </p>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${difficultyColors.dot}`}></div>
                          <span className="text-xs text-[#a7aca9]">
                            Difficulty: <span className={difficultyColors.text}>{problem.difficulty}</span>
                          </span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <p className="text-xs text-[#a7aca9]">
                          Tag: <span className="text-[#f9fdf9]">{problem.tags}</span>
                        </p>
                      </div>
                      <div className="col-span-1 flex justify-end gap-4">
                        <button 
                          onClick={() => window.open(`/problem/${problem._id}`, '_blank')}
                          className="p-2 text-[#a7aca9] hover:text-[#b5fe00] transition-colors"
                        >
                          <Eye size={20} />
                        </button>
                        <button 
                          onClick={() => handleDelete(problem._id)}
                          className={`${
                            isSelected
                              ? 'bg-[#ff7351] text-white shadow-[0_0_20px_rgba(255,115,81,0.2)]'
                              : 'bg-[#ff7351]/10 hover:bg-[#ff7351] text-[#ff7351] hover:text-white'
                          } px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all`}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* System Telemetry Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="col-span-1 p-6 rounded-lg" style={{
            background: 'rgba(182, 255, 0, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(182, 255, 0, 0.08)'
          }}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-black tracking-widest text-[#b5fe00]/60 uppercase">Deletion Queue</h4>
              <Trash2 className="text-[#b5fe00]" size={20} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-['Space_Grotesk'] font-bold text-[#f9fdf9]">{filteredProblems.length}</span>
                <span className="text-xs text-[#68fcbf] font-mono">
                  {selectedProblems.length} selected
                </span>
              </div>
              <div className="w-full bg-[#202724] h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-[#b5fe00] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(selectedProblems.length / (filteredProblems.length || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-span-2 p-6 rounded-lg flex items-center justify-between gap-8 border-l-4 border-[#ff7351]" style={{
            background: 'rgba(182, 255, 0, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(182, 255, 0, 0.08)',
            borderLeftWidth: '4px',
            borderLeftColor: '#ff7351'
          }}>
            <div className="flex-grow">
              <h4 className="text-xs font-black tracking-widest text-[#ff7351]/60 uppercase mb-2">⚠️ Warning Zone</h4>
              <p className="text-sm text-[#a7aca9] leading-relaxed">
                Deleted problems <span className="text-[#ff7351] font-mono">CANNOT be recovered</span>. 
                Make sure you have backups before proceeding with deletion.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={fetchProblems}
                className="bg-[#b5fe00]/10 text-[#b5fe00] p-3 rounded-full hover:bg-[#b5fe00]/20 transition-all"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Problems Action Bar */}
        {selectedProblems.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-[#1a211e] border border-[#ff7351]/30 rounded-full px-6 py-3 shadow-2xl shadow-[#ff7351]/20 flex items-center gap-6 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <XCircle className="text-[#ff7351]" size={20} />
                <span className="text-sm font-bold text-[#f9fdf9]">{selectedProblems.length} problem(s) selected</span>
              </div>
              <button 
                onClick={handleBulkDelete}
                disabled={deleting}
                className="bg-[#ff7351] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#ff7351]/80 transition-all disabled:opacity-50"
              >
                {deleting ? 'DELETING...' : 'Confirm Permanent Deletion'}
              </button>
              <button 
                onClick={() => setSelectedProblems([])}
                className="text-[#a7aca9] hover:text-[#f9fdf9] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}


        {/* Floating Help Trigger */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#202724] border border-[#b5fe00]/20 rounded-full flex items-center justify-center text-[#b5fe00] shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-[#b5fe00]/60 transition-all z-50">
          <Leaf size={24} />
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .glass-card {
          background: rgba(182, 255, 0, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(182, 255, 0, 0.08);
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translate(-50%, 100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #444946; border-radius: 10px; }
        
        .font-headline {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AdminDelete;