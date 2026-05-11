// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ← ADD THIS IMPORT
import axiosClient from '../utils/axiosClient';

const AdminDashboard = () => {
  const navigate = useNavigate();  // ← ADD THIS LINE
  const [globalTraffic, setGlobalTraffic] = useState(842.1);
  const [trafficIncrement, setTrafficIncrement] = useState(12.5);
  const [systemLogs, setSystemLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProblems: 0,
    totalSubmissions: 0,
    activeUsers: 0
  });

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const problemsRes = await axiosClient.get('/problem/getAllProblem');
      const problems = problemsRes.data;
      
      try {
        const logsRes = await axiosClient.get('/activity/recent');
        const activities = logsRes.data || [];
        setSystemLogs(activities.slice(0, 3));
      } catch (error) {
        setSystemLogs([
          { timestamp: new Date().toLocaleTimeString(), action: 'PROBLEM_DEPLOYED', details: '#X892 - Reverse Matrix Link', admin: 'Architect_01' },
          { timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(), action: 'VIDEO_SYNC_COMPLETE', details: '#A102 - Pathfinding Logic', admin: 'Architect_02' },
          { timestamp: new Date(Date.now() - 7200000).toLocaleTimeString(), action: 'PROBLEM_DELETED', details: '#Z404 - Deprecated Stack Overflow', admin: 'Architect_01' }
        ]);
      }
      
      setStats({
        totalProblems: problems.length,
        totalSubmissions: 0,
        activeUsers: 0
      });
      
      try {
        const submissionsRes = await axiosClient.get('/submissions/count');
        const totalSubmissions = submissionsRes.data.count || 0;
        const calculatedTraffic = Math.round((totalSubmissions / 1000) * 10) / 10;
        setGlobalTraffic(calculatedTraffic || 842.1);
      } catch (error) {
        console.log('Submissions endpoint not ready yet');
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const res = await axiosClient.get('/activity/recent?limit=3');
      setSystemLogs(res.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // ← CHANGE THESE HANDLERS TO USE navigate
 const handleCreateProblem = () => {
    navigate('/admin/create');
};
  const handleUpdateProblem = () => {
    navigate('/admin/update');
  };

  const handleDeleteProblem = () => {
    navigate('/admin/delete');
  };

  const handleVideoSolution = () => {
    navigate('/admin/video');
  };

  const getLogIcon = (action) => {
    const actionStr = String(action || '').toUpperCase();
    if (actionStr.includes('CREATE') || actionStr.includes('PROBLEM_DEPLOYED')) {
      return { color: '#b5fe00', icon: 'add_box' };
    } else if (actionStr.includes('UPDATE') || actionStr.includes('VIDEO_SYNC')) {
      return { color: '#68fcbf', icon: 'edit_note' };
    } else if (actionStr.includes('DELETE') || actionStr.includes('PROBLEM_DELETED')) {
      return { color: '#ff7351', icon: 'delete_sweep' };
    }
    return { color: '#a7aca9', icon: 'info' };
  };

  const formatLogMessage = (log) => {
    const action = String(log.action || '').toUpperCase();
    if (action.includes('PROBLEM_DEPLOYED') || action.includes('CREATE')) {
      return `PROBLEM_DEPLOYED: ${log.details || '#X892 - Reverse Matrix Link'}`;
    }
    if (action.includes('VIDEO_SYNC') || action.includes('VIDEO')) {
      return `VIDEO_SYNC_COMPLETE: ${log.details || '#A102 - Pathfinding Logic'}`;
    }
    if (action.includes('PROBLEM_DELETED') || action.includes('DELETE')) {
      return `PROBLEM_DELETED: ${log.details || '#Z404 - Deprecated Stack Overflow'}`;
    }
    return log.details || log.action || 'System activity recorded';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="font-['Space_Grotesk'] text-5xl font-bold tracking-tight text-[#f9fdf9] mb-2 uppercase">
              Admin <span className="text-[#b5fe00]">Management</span>
            </h1>
            <p className="text-[#a7aca9] max-w-lg font-light tracking-wide">
              Command center for algorithmic problem sets. Execute architectural modifications to the system logic with precision and speed.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#a7aca9]">System Uptime</p>
              <p className="font-['Space_Grotesk'] font-bold text-[#68fcbf]">99.998%</p>
            </div>
            <div className="h-10 w-[1px] bg-[#444946]/30"></div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#a7aca9]">Active Instances</p>
              <p className="font-['Space_Grotesk'] font-bold text-[#68fcbf]">{stats.totalProblems || 1402}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          onClick={handleCreateProblem}
          className="lg:col-span-2 bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 group transition-all cursor-pointer relative overflow-hidden h-[320px] flex flex-col justify-between border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]"
        >
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[160px]">add_box</span>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-[#b5fe00]/10 flex items-center justify-center mb-6 border border-[#b5fe00]/20 group-hover:bg-[#b5fe00] group-hover:text-[#476700] transition-all duration-300">
              <span className="material-symbols-outlined">add_box</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-3xl font-semibold mb-2 text-[#f9fdf9]">Create Problem</h3>
            <p className="text-[#a7aca9] text-sm leading-relaxed max-w-sm">
              Initialize a new algorithmic challenge. Define constraints, test cases, and metadata for global deployment.
            </p>
          </div>
          <div className="flex items-center text-[#b5fe00] text-xs font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform">
            Initialize Deployment <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
          </div>
        </div>

        <div 
          onClick={handleVideoSolution}
          className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 group transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]"
        >
          <div className="w-12 h-12 rounded-full bg-[#006c4b]/20 flex items-center justify-center mb-6 border border-[#006c4b]/40 group-hover:border-[#68fcbf] transition-all">
            <span className="material-symbols-outlined text-[#68fcbf]">smart_display</span>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold mb-2 text-[#f9fdf9]">Video Solution</h3>
            <p className="text-[#a7aca9] text-xs leading-relaxed">
              Upload and sync high-resolution solution walkthroughs.
            </p>
          </div>
          <div className="mt-6">
            <span className="bg-[#68fcbf]/10 text-[#68fcbf] text-[9px] px-2 py-1 rounded-full border border-[#68fcbf]/20">LIVE_SYNC</span>
          </div>
        </div>

        <div className="bg-[#1a211e] rounded-lg p-8 flex flex-col justify-between border border-[#444946]/10">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-widest text-[#a7aca9] uppercase">CPU_LOAD</span>
              <span className="text-[#b5fe00] text-xs font-bold">12%</span>
            </div>
            <div className="h-1 bg-[#202724] rounded-full overflow-hidden">
              <div className="h-full bg-[#b5fe00] w-[12%]"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] tracking-widest text-[#a7aca9] uppercase">MEM_ALLOC</span>
              <span className="text-[#68fcbf] text-xs font-bold">4.2GB</span>
            </div>
            <div className="h-1 bg-[#202724] rounded-full overflow-hidden">
              <div className="h-full bg-[#68fcbf] w-[45%]"></div>
            </div>
          </div>
          <div className="pt-8">
            <p className="text-[10px] text-[#a7aca9] uppercase tracking-widest mb-2">Network Hub</p>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-[#b5fe00]/20 border border-[#0A0F0D] flex items-center justify-center text-[8px] text-[#b5fe00]">A</div>
              <div className="w-6 h-6 rounded-full bg-[#68fcbf]/20 border border-[#0A0F0D] flex items-center justify-center text-[8px] text-[#68fcbf]">B</div>
              <div className="w-6 h-6 rounded-full bg-[#ff7351]/20 border border-[#0A0F0D] flex items-center justify-center text-[8px] text-[#ff7351]">C</div>
              <div className="w-6 h-6 rounded-full bg-[#202724] border border-[#0A0F0D] flex items-center justify-center text-[8px] text-[#f9fdf9]">+{Math.min(99, stats.totalProblems)}</div>
            </div>
          </div>
        </div>

        <div 
          onClick={handleUpdateProblem}
          className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 group transition-all cursor-pointer flex flex-col justify-between lg:h-[280px] border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]"
        >
          <div className="w-10 h-10 rounded-full bg-[#b5fe00]/5 flex items-center justify-center mb-6 border border-[#b5fe00]/10 group-hover:bg-[#b5fe00]/20 transition-all">
            <span className="material-symbols-outlined text-[#b5fe00]">edit_note</span>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold mb-2 text-[#f9fdf9]">Update Problem</h3>
            <p className="text-[#a7aca9] text-xs leading-relaxed">
              Modify existing logic structures or adjust difficulty tiers across the registry.
            </p>
          </div>
          <div className="pt-6 border-t border-[#444946]/10 flex justify-between items-center">
            <span className="text-[10px] text-[#a7aca9]">Last mod: Today</span>
            <span className="material-symbols-outlined text-sm opacity-40 group-hover:opacity-100 transition-opacity">north_east</span>
          </div>
        </div>

        <div 
          onClick={handleDeleteProblem}
          className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 group transition-all cursor-pointer flex flex-col justify-between lg:h-[280px] border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]"
        >
          <div className="w-10 h-10 rounded-full bg-[#ff7351]/5 flex items-center justify-center mb-6 border border-[#ff7351]/10 group-hover:bg-[#ff7351]/20 transition-all">
            <span className="material-symbols-outlined text-[#ff7351]">delete_sweep</span>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold mb-2 text-[#f9fdf9]">Delete Problem</h3>
            <p className="text-[#a7aca9] text-xs leading-relaxed">
              Decommission inactive or deprecated problem sets from the production environment.
            </p>
          </div>
          <div className="pt-6 border-t border-[#444946]/10 flex justify-between items-center">
            <span className="text-[10px] text-[#d53d18] font-bold uppercase tracking-tighter">Requires Authorization</span>
            <span className="material-symbols-outlined text-sm text-[#ff7351]/40">lock</span>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 overflow-hidden relative group border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#a7aca9] mb-1">Global Traffic</p>
              <h3 className="font-['Space_Grotesk'] text-4xl font-bold text-[#f9fdf9]">
                {loading ? '...' : `${globalTraffic.toFixed(1)}K`}
              </h3>
            </div>
            <div className="bg-[#68fcbf]/10 text-[#68fcbf] text-[10px] px-3 py-1 rounded-full font-bold">
              {loading ? 'LOADING...' : `+${trafficIncrement}% INCREMENT`}
            </div>
          </div>
          <div className="h-32 flex items-end space-x-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => {
              const height = Math.min(90, Math.max(20, (globalTraffic / 1000) * (i + 1) * 10));
              return (
                <div 
                  key={i}
                  className={`flex-1 ${i < 5 ? 'bg-[#b5fe00]' : 'bg-[#68fcbf]'} rounded-t-sm transition-all duration-700`}
                  style={{ height: `${height}%`, opacity: 0.3 + (i * 0.08) }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <section className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Space_Grotesk'] text-lg font-bold tracking-widest uppercase text-[#f9fdf9]">System_Log</h2>
          <button 
            onClick={() => fetchRecentActivities()}
            className="text-[10px] font-bold uppercase tracking-widest text-[#b5fe00] hover:underline transition-all"
          >
            Download Registry
          </button>
        </div>
        <div className="space-y-4">
          {loading ? (
            <div className="bg-[#0f1512] p-4 rounded-xl text-center">
              <span className="text-[#a7aca9] text-sm">Loading system logs...</span>
            </div>
          ) : systemLogs.length === 0 ? (
            <div className="bg-[#0f1512] p-4 rounded-xl text-center">
              <span className="text-[#a7aca9] text-sm">No recent activities. Create or update problems to see logs here.</span>
            </div>
          ) : (
            systemLogs.map((log, index) => {
              const icon = getLogIcon(log.action);
              return (
                <div key={index} className="bg-[#0f1512] p-4 rounded-xl flex items-center justify-between group hover:bg-[#1a211e] transition-colors">
                  <div className="flex items-center space-x-6 flex-1">
                    <span className="text-[10px] font-mono text-[#a7aca9]">
                      {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : '--:--:--'}
                    </span>
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: icon.color, boxShadow: `0 0 8px ${icon.color}` }}
                    />
                    <span className="text-xs font-bold tracking-wide text-[#f9fdf9]">
                      {formatLogMessage(log)}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#a7aca9] uppercase">
                    Admin: {log.admin || 'System'}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;