// Editorial.jsx - Standalone Page Version
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { Pause, Play, Volume2, VolumeX, Maximize, Minimize, AlertTriangle } from 'lucide-react';
import axiosClient from '../utils/axiosClient'; // Adjust path as needed

const Editorial = () => {
  const { problemId } = useParams(); // Get problemId from URL
  const videoRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Video data states
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [problemTitle, setProblemTitle] = useState('');

  // Fetch video on component mount
  useEffect(() => {
    if (problemId) {
      fetchVideo();
    }
  }, [problemId]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`/video/problem/${problemId}`);
      
      if (data.exists) {
        setVideoData(data.video);
        setError(null);
        // Optionally fetch problem title
        fetchProblemTitle();
      } else {
        setError('No video solution available for this problem');
      }
    } catch (err) {
      console.error('Error fetching video:', err);
      setError(err.response?.data?.message || 'Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  const fetchProblemTitle = async () => {
    try {
      const { data } = await axiosClient.get(`/problem/getProblem/${problemId}`);
      setProblemTitle(data.title);
    } catch (err) {
      console.error('Error fetching problem:', err);
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement?.parentElement;
    if (!videoContainer) return;

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setVideoDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoData]); // Re-run when videoData changes

  const handleSeek = (e) => {
    if (videoRef.current) {
      videoRef.current.currentTime = parseFloat(e.target.value);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0f0d]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b5fe00]/20 border-t-[#b5fe00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a7aca9]">Loading video...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0f0d] p-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center max-w-md">
          <AlertTriangle className="text-red-500 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-red-400 text-xl font-bold mb-2">Video Not Found</h2>
          <p className="text-[#a7aca9] mb-6">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-[#b5fe00] text-[#476700] px-6 py-2 rounded-full font-bold hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // No Video State
  if (!videoData) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0f0d] p-8">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-8 text-center max-w-md">
          <AlertTriangle className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-yellow-400 text-xl font-bold mb-2">No Video Available</h2>
          <p className="text-[#a7aca9] mb-6">This problem doesn't have a video solution yet.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-[#b5fe00] text-[#476700] px-6 py-2 rounded-full font-bold hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0f0d] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()}
            className="text-[#a7aca9] hover:text-[#b5fe00] transition-colors mb-4 inline-flex items-center gap-2"
          >
            ← Back to Problems
          </button>
          <h1 className="text-2xl md:text-3xl font-headline text-[#f9fdf9]">
            {problemTitle || 'Video Solution'}
          </h1>
        </div>

        {/* Video Player */}
        <div 
          className="relative w-full rounded-xl overflow-hidden bg-black shadow-2xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={videoData.secureUrl}
            poster={videoData.thumbnailUrl}
            onClick={togglePlayPause}
            className="w-full aspect-video bg-black cursor-pointer"
            preload="metadata"
          />
          
          {/* Video Controls Overlay */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div className="flex items-center w-full mb-3">
              <input
                type="range"
                min="0"
                max={videoDuration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all"
                style={{
                  background: `linear-gradient(to right, #b5fe00 ${(currentTime / (videoDuration || 1)) * 100}%, #4a4a4a ${(currentTime / (videoDuration || 1)) * 100}%)`
                }}
              />
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="text-white hover:text-[#b5fe00] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                {/* Time Display */}
                <div className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(videoDuration)}
                </div>
                
                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-[#b5fe00] transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #b5fe00 ${volume * 100}%, #4a4a4a ${volume * 100}%)`
                    }}
                  />
                </div>
              </div>
              
              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-[#b5fe00] transition-colors"
                aria-label="Fullscreen"
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Video Info */}
        {videoData && (
          <div className="mt-6 p-4 bg-[#1a211e] rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-[#a7aca9] text-sm">
                  Uploaded: {new Date(videoData.uploadedAt).toLocaleDateString()}
                </p>
                <p className="text-[#a7aca9] text-sm">
                  Duration: {Math.floor(videoData.duration / 60)} minutes {Math.floor(videoData.duration % 60)} seconds
                </p>
              </div>
              <div className="flex gap-2">
                <a 
                  href={videoData.secureUrl}
                  download
                  className="px-4 py-2 bg-[#b5fe00]/10 text-[#b5fe00] rounded-lg text-sm font-semibold hover:bg-[#b5fe00]/20 transition-all"
                >
                  Download Video
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap');
        
        .font-headline {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        
        input[type="range"]:focus {
          outline: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #b5fe00;
          cursor: pointer;
          margin-top: -4px;
        }
        
        input[type="range"]::-webkit-slider-runnable-track {
          height: 4px;
          background: #4a4a4a;
          border-radius: 2px;
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #b5fe00;
          cursor: pointer;
          border: none;
        }
        
        input[type="range"]::-moz-range-track {
          height: 4px;
          background: #4a4a4a;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default Editorial;