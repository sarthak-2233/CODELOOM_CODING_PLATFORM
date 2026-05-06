// AdminVideo.jsx - FULLY WORKING VERSION
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosClient from '../utils/axiosClient';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Upload, 
  CloudUpload,
  Check,
  Circle,
  Info,
  Trash2,
  Video,
  AlertTriangle
} from 'lucide-react';

const AdminVideo = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (problemId, file) => {
    if (!file) {
      alert('Please select a video file first');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Get upload signature from backend
      const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
      const { signature, timestamp, public_id, api_key, upload_url } = signatureResponse.data;

      // Step 2: Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('public_id', public_id);
      formData.append('api_key', api_key);

      // Step 3: Upload directly to Cloudinary
      const uploadResponse = await axios.post(upload_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      const cloudinaryResult = uploadResponse.data;

      // Step 4: Save video metadata to backend
      await axiosClient.post('/video/save', {
        problemId: problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });
      
      alert(`✅ Video uploaded successfully for ${selectedProblem?.title}!`);
      setSelectedFile(null);
      setUploadProgress(0);
      
      // Refresh problems list to update any video status
      fetchProblems();
      
    } catch (err) {
      console.error('Upload error:', err);
      alert(`❌ Upload failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteVideo = async (problemId) => {
    const problem = problems.find(p => p._id === problemId);
    
    if (!window.confirm(`⚠️ Are you sure you want to DELETE the video solution for "${problem?.title}"?\n\nThis action CANNOT be undone!`)) {
      return;
    }
    
    try {
      await axiosClient.delete(`/video/delete/${problemId}`);
      alert(`✅ Video deleted successfully for ${problem?.title}!`);
      // Refresh problems list
      fetchProblems();
    } catch (err) {
      console.error('Delete error:', err);
      alert(`❌ Delete failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
      const maxSize = 500 * 1024 * 1024; // 500MB
      
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid video file (MP4, WEBM, or MOV)');
        return;
      }
      
      if (file.size > maxSize) {
        alert('File size must be less than 500MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const selectedProblem = problems.find(p => p._id === selectedProblemId);

  const filteredProblems = problems.filter(problem =>
    problem.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (problem.tags && problem.tags?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    problem._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyBadge = (difficulty) => {
    const difficultyLower = difficulty?.toLowerCase();
    if (difficultyLower === 'easy') {
      return "bg-[#68fcbf]/10 text-[#68fcbf]";
    } else if (difficultyLower === 'medium') {
      return "bg-[#b5fe00]/10 text-[#b5fe00]";
    } else {
      return "bg-[#ff7351]/10 text-[#ff7351]";
    }
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
    <div className="bg-[#0a0f0d] text-[#f9fdf9] font-body min-h-screen">
      {/* Main Content Area */}
      <div className="p-4 md:p-8">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-headline text-[#f9fdf9] mb-2 tracking-tight">
              Video Solution <span className="text-[#b5fe00]">Vault</span>
            </h1>
            <p className="text-[#a7aca9] max-w-xl text-sm md:text-base">
              Select a problem from the registry to upload or manage its technical walkthrough solution.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={fetchProblems}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#b5fe00]/20 text-[#b5fe00] font-semibold hover:bg-[#b5fe00]/10 transition-all"
            >
              <Filter size={16} />
              <span>Refresh Registry</span>
            </button>
          </div>
        </header>

        <div className="space-y-8">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-[#1a211e] px-4 py-2 rounded-full border border-[#444946]/30 max-w-md">
            <Search className="text-[#a7aca9]" size={16} />
            <input 
              className="bg-transparent border-none text-sm focus:ring-0 text-[#f9fdf9] w-full font-label outline-none" 
              placeholder="Search problems or videos..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Problem Selection Registry */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-headline text-[#f9fdf9]">Problem Selection Registry</h2>
              <div className="text-xs font-label text-[#a7aca9]">Step 1: Identify Target Problem</div>
            </div>
            <div className="glass-panel rounded-lg overflow-hidden border border-[#444946]/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-[#1a211e] text-[#a7aca9] uppercase text-[10px] tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Problem Identity</th>
                      <th className="px-6 py-4">Difficulty</th>
                      <th className="px-6 py-4">Tags</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#444946]/5">
                    {filteredProblems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-[#a7aca9]">
                          No problems found. Try a different search term.
                        </td>
                      </tr>
                    ) : (
                      filteredProblems.map((problem) => (
                        <tr 
                          key={problem._id} 
                          className={`transition-colors ${selectedProblemId === problem._id ? 'selected-row' : 'hover:bg-[#0f1512]'}`}
                        >
                          <td className="px-6 py-5">
                            <span className={`text-xs font-mono ${selectedProblemId === problem._id ? 'text-[#b5fe00]' : 'text-[#a7aca9]'}`}>
                              #{problem._id?.slice(-6)}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-[#f9fdf9] font-semibold block">{problem.title}</span>
                            <span className="text-[10px] text-[#a7aca9] capitalize">{problem.difficulty} • {problem.tags}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-2 py-0.5 rounded ${getDifficultyBadge(problem.difficulty)} text-[10px] font-bold uppercase tracking-wider`}>
                              {problem.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex gap-2">
                              <span className="px-2 py-1 bg-[#202724] rounded text-[10px] text-[#a7aca9]">{problem.tags}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            {selectedProblemId === problem._id ? (
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleDeleteVideo(problem._id)}
                                  className="bg-[#ff7351]/20 text-[#ff7351] text-[10px] font-bold px-4 py-1.5 rounded-full border border-[#ff7351]/40 flex items-center gap-1 hover:bg-[#ff7351]/30 transition-all"
                                >
                                  <Trash2 size={12} />
                                  DELETE VIDEO
                                </button>
                                <button className="bg-[#b5fe00]/20 text-[#b5fe00] text-[10px] font-bold px-4 py-1.5 rounded-full border border-[#b5fe00]/40 flex items-center gap-1">
                                  <CheckCircle size={12} />
                                  SELECTED
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setSelectedProblemId(problem._id)}
                                className="bg-[#202724] text-[#f9fdf9] text-[10px] font-bold px-4 py-1.5 rounded-full hover:bg-[#b5fe00] hover:text-[#324a00] transition-all"
                              >
                                SELECT FOR UPLOAD
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Conditional Upload State: Secure Upload Hub */}
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 glass-panel rounded-lg p-4 md:p-8 neon-glow-border relative overflow-hidden group border border-[#b5fe00]/20 shadow-[0_0_50px_rgba(182,255,0,0.05)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#b5fe00]/5 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-headline text-[#f9fdf9] flex items-center gap-3">
                    <Upload className="text-[#b5fe00]" size={24} />
                    Secure Upload Hub
                  </h2>
                  <p className="text-xs text-[#b5fe00] mt-1 font-mono uppercase tracking-widest">
                    {selectedProblem ? (
                      `Active Target: ${selectedProblem.title}`
                    ) : (
                      'No problem selected. Please select a problem from the registry above.'
                    )}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#202724] rounded-full text-[10px] text-[#b5fe00] font-bold uppercase tracking-widest border border-[#b5fe00]/20">
                  Secure Channel
                </span>
              </div>

              {/* Drag & Drop / Upload Zone */}
              {selectedProblem ? (
                <div className="flex-1 border-2 border-dashed border-[#b5fe00]/10 rounded-lg bg-[#0f1512]/50 hover:border-[#b5fe00]/30 transition-all flex flex-col items-center justify-center p-8 md:p-12 text-center cursor-pointer min-h-[300px] group/drop">
                  {uploading ? (
                    <div className="text-center w-full max-w-md">
                      <div className="w-20 h-20 bg-[#b5fe00]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <CloudUpload className="text-4xl text-[#b5fe00] animate-pulse" size={40} />
                      </div>
                      <h3 className="text-lg md:text-xl font-body text-[#f9fdf9] mb-2">Uploading to Cloudinary...</h3>
                      <div className="w-full bg-[#202724] rounded-full h-2 mb-2">
                        <div 
                          className="bg-[#b5fe00] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-[#b5fe00] text-sm">{uploadProgress}% complete</p>
                    </div>
                  ) : selectedFile ? (
                    <div className="text-center">
                      <Video className="text-[#b5fe00] w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-lg font-body text-[#f9fdf9] mb-2">{selectedFile.name}</h3>
                      <p className="text-[#a7aca9] text-sm mb-4">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={() => handleVideoUpload(selectedProblem._id, selectedFile)}
                          className="bg-[#b5fe00] text-[#324a00] text-sm font-bold px-6 py-2 rounded-full hover:shadow-[0_0_25px_rgba(182,255,0,0.5)] transition-all"
                        >
                          Confirm Upload
                        </button>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="bg-[#ff7351]/20 text-[#ff7351] text-sm font-bold px-6 py-2 rounded-full hover:bg-[#ff7351]/30 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-[#b5fe00]/10 rounded-full flex items-center justify-center mb-4 group-hover/drop:scale-110 transition-transform duration-500">
                        <CloudUpload className="text-4xl text-[#b5fe00]" size={40} />
                      </div>
                      <h3 className="text-lg md:text-xl font-body text-[#f9fdf9] mb-1">Drop walkthrough video sequence</h3>
                      <p className="text-[#a7aca9] text-sm mb-6">MP4, WEBM or MOV. Max 500MB. Auto-encrypting on ingestion.</p>
                      <label className="bg-[#b5fe00] text-[#324a00] text-sm font-bold px-10 py-3 rounded-full hover:shadow-[0_0_25px_rgba(182,255,0,0.5)] transition-all active:scale-95 cursor-pointer">
                        Browse Local Storage
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="video/mp4,video/webm,video/quicktime"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="text-[#a7aca9]/50 text-xs mt-4">
                        Maximum file size: 500MB
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex-1 border-2 border-dashed border-[#444946]/30 rounded-lg bg-[#0f1512]/30 flex flex-col items-center justify-center p-8 md:p-12 text-center min-h-[300px]">
                  <div className="w-20 h-20 bg-[#444946]/20 rounded-full flex items-center justify-center mb-4">
                    <Info className="text-4xl text-[#a7aca9]/40" size={40} />
                  </div>
                  <h3 className="text-lg md:text-xl font-body text-[#a7aca9] mb-1">No Problem Selected</h3>
                  <p className="text-[#a7aca9]/60 text-sm">
                    Please select a problem from the registry above to upload a video solution.
                  </p>
                </div>
              )}
            </div>

            {/* Contextual Insights */}
            <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="glass-panel rounded-lg p-6 border border-[#444946]/10">
                <h4 className="text-xs font-label uppercase tracking-widest text-[#a7aca9] mb-4">Solution Requirements</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3 text-[#f9fdf9]">
                    <Check className="text-[#b5fe00]" size={18} />
                    Code clarity walkthrough
                  </li>
                  <li className="flex items-center gap-3 text-[#f9fdf9]">
                    <Check className="text-[#b5fe00]" size={18} />
                    Complexity analysis (O-Notation)
                  </li>
                  <li className="flex items-center gap-3 text-[#a7aca9]/60">
                    <Circle size={18} />
                    Alternative approach mention
                  </li>
                </ul>
              </div>
              
              {selectedProblem && (
                <div className="glass-panel rounded-lg p-6 border border-[#b5fe00]/20 bg-[#b5fe00]/5">
                  <div className="flex items-center gap-4 mb-3">
                    <Video className="text-[#b5fe00]" size={20} />
                    <h4 className="text-[#f9fdf9] font-semibold">Selected Problem</h4>
                  </div>
                  <p className="text-sm text-[#f9fdf9] font-medium">{selectedProblem.title}</p>
                  <p className="text-xs text-[#a7aca9] mt-1">ID: {selectedProblem._id?.slice(-8)}</p>
                  <div className="mt-3 flex gap-2">
                    <span className={`text-[10px] px-2 py-1 rounded ${getDifficultyBadge(selectedProblem.difficulty)}`}>
                      {selectedProblem.difficulty}
                    </span>
                    <span className="text-[10px] px-2 py-1 bg-[#202724] rounded text-[#a7aca9]">
                      {selectedProblem.tags}
                    </span>
                  </div>
                </div>
              )}

              <div className="glass-panel rounded-lg p-6 border border-[#ff7351]/20 bg-[#ff7351]/5">
                <div className="flex items-center gap-4 mb-3">
                  <Info className="text-[#ff7351]" size={20} />
                  <h4 className="text-[#f9fdf9] font-semibold">Upload Notice</h4>
                </div>
                <p className="text-xs text-[#a7aca9] leading-relaxed">
                  Ensure no internal PII or environment variables are visible in the screen recording before deployment.
                </p>
              </div>
            </aside>
          </section>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#b5fe00]/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#68fcbf]/10 blur-[200px] rounded-full"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap');
        
        .glass-panel {
          background: rgba(10, 15, 13, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .neon-glow-border {
          position: relative;
        }
        
        .neon-glow-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px solid rgba(182, 255, 0, 0.15);
          pointer-events: none;
        }
        
        .selected-row {
          background: rgba(182, 255, 0, 0.05);
          border-left: 4px solid #b5fe00;
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

export default AdminVideo;