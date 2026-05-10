import React, { useState, useEffect, useRef } from 'react';

// ─── Algorithm step generators for Searching ─────────────────────────────────

const generateLinearSearchSteps = (originalArr, target) => {
  const steps = [];
  const arr = [...originalArr];
  let foundIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      highlightedIndices: [i],

    });
    if (arr[i] === target) {
      foundIndex = i;
      steps.push({
        array: [...arr],
        highlightedIndices: [i],
        description: `✓ FOUND ${target} at position ${i}! ✓`,
        isFinal: true,
      });
      break;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      highlightedIndices: [],
      description: `✗ Could not find ${target} in the array. ✗`,
      isFinal: true,
    });
  }
  return steps;
};

const generateBinarySearchSteps = (originalArr, target) => {
  const steps = [];
  const arr = [...originalArr];
  let low = 0;
  let high = arr.length - 1;
  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      array: [...arr],
      highlightedIndices: [mid],
      description: `Looking in the middle at position ${mid} (number ${arr[mid]})`,
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      steps.push({
        array: [...arr],
        highlightedIndices: [mid],
        description: `✓ FOUND ${target} at position ${mid}! ✓`,
        isFinal: true,
      });
      break;
    } else if (arr[mid] < target) {
      low = mid + 1;
      steps.push({
        array: [...arr],
        highlightedIndices: [],
        description: `${arr[mid]} is too small! Looking in the right side.`,
      });
    } else {
      high = mid - 1;
      steps.push({
        array: [...arr],
        highlightedIndices: [],
        description: `${arr[mid]} is too big! Looking in the left side.`,
      });
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      highlightedIndices: [],
      description: `✗ Could not find ${target} in the array. ✗`,
      isFinal: true,
    });
  }
  return steps;
};

// ─── Code snippets per search algorithm & language ─────────────────────────

const SEARCH_CODE = {
  'Linear Search': {
    python: [
      { line: 1, code: 'def linear_search(arr, target):' },
      { line: 2, code: '    for i in range(len(arr)):' },
      { line: 3, code: '        if arr[i] == target:', highlight: true },
      { line: 4, code: '            return i' },
      { line: 5, code: '    return -1' },
    ],
    cpp: [
      { line: 1, code: 'int linearSearch(int arr[], int n, int target) {' },
      { line: 2, code: '    for (int i = 0; i < n; i++) {', highlight: true },
      { line: 3, code: '        if (arr[i] == target) return i;' },
      { line: 4, code: '    }' },
      { line: 5, code: '    return -1;' },
      { line: 6, code: '}' },
    ],
    java: [
      { line: 1, code: 'int linearSearch(int[] arr, int target) {' },
      { line: 2, code: '    for (int i = 0; i < arr.length; i++) {', highlight: true },
      { line: 3, code: '        if (arr[i] == target) return i;' },
      { line: 4, code: '    }' },
      { line: 5, code: '    return -1;' },
      { line: 6, code: '}' },
    ],
  },
  'Binary Search': {
    python: [
      { line: 1, code: 'def binary_search(arr, target):' },
      { line: 2, code: '    low, high = 0, len(arr) - 1' },
      { line: 3, code: '    while low <= high:', highlight: true },
      { line: 4, code: '        mid = (low + high) // 2' },
      { line: 5, code: '        if arr[mid] == target:' },
      { line: 6, code: '            return mid' },
      { line: 7, code: '        elif arr[mid] < target:' },
      { line: 8, code: '            low = mid + 1' },
      { line: 9, code: '        else:' },
      { line: 10, code: '            high = mid - 1' },
      { line: 11, code: '    return -1' },
    ],
    cpp: [
      { line: 1, code: 'int binarySearch(int arr[], int n, int target) {' },
      { line: 2, code: '    int low = 0, high = n - 1;' },
      { line: 3, code: '    while (low <= high) {', highlight: true },
      { line: 4, code: '        int mid = low + (high - low) / 2;' },
      { line: 5, code: '        if (arr[mid] == target) return mid;' },
      { line: 6, code: '        else if (arr[mid] < target) low = mid + 1;' },
      { line: 7, code: '        else high = mid - 1;' },
      { line: 8, code: '    }' },
      { line: 9, code: '    return -1;' },
      { line: 10, code: '}' },
    ],
    java: [
      { line: 1, code: 'int binarySearch(int[] arr, int target) {' },
      { line: 2, code: '    int low = 0, high = arr.length - 1;' },
      { line: 3, code: '    while (low <= high) {', highlight: true },
      { line: 4, code: '        int mid = low + (high - low) / 2;' },
      { line: 5, code: '        if (arr[mid] == target) return mid;' },
      { line: 6, code: '        else if (arr[mid] < target) low = mid + 1;' },
      { line: 7, code: '        else high = mid - 1;' },
      { line: 8, code: '    }' },
      { line: 9, code: '    return -1;' },
      { line: 10, code: '}' },
    ],
  },
};

const ALGO_INFO_SEARCH = {
  'Linear Search': {
    efficiency: 'O(n)',
    space: 'O(1)',
    approach: 'Sequential / Iterative',
    bestCase: 'O(1)',
    worstCase: 'O(n)',
    effColor: '#68fcbf',
    spaceColor: '#e9ffbd',
  },
  'Binary Search': {
    efficiency: 'O(log n)',
    space: 'O(1)',
    approach: 'Divide and Conquer',
    bestCase: 'O(1)',
    worstCase: 'O(log n)',
    effColor: '#68fcbf',
    spaceColor: '#e9ffbd',
  },
};

const FILE_LABELS = {
  python: { ext: '.py', label: 'Python 3.11' },
  cpp: { ext: '.cpp', label: 'C++ 17' },
  java: { ext: '.java', label: 'Java 21' },
};

const SEARCH_GENERATORS = {
  'Linear Search': generateLinearSearchSteps,
  'Binary Search': generateBinarySearchSteps,
};

const DEFAULT_ARRAY = [8, 12, 18, 25, 30, 40, 55, 62, 72, 85];
const DEFAULT_TARGET = 40;

// ─── CodeLine renderer ────────────────────────────────────
const CodeLine = ({ line }) => {
  const keywords = ['def', 'if', 'while', 'for', 'void', 'int', 'return', 'else', 'class', 'public', 'static', 'new', 'in', 'range', 'elif'];
  const funcNames = ['linear_search', 'binary_search', 'linearSearch', 'binarySearch', 'len', 'range', 'mid'];
  const tokens = line.code.split(/(\s+|[()[\]{},;])/);
  return (
    <div
      className={`flex gap-6 group ${line.highlight ? '-mx-6 px-6 border-l-2' : ''}`}
      style={{
        backgroundColor: line.highlight ? 'rgba(181, 254, 0, 0.1)' : 'transparent',
        borderLeftColor: line.highlight ? '#b5fe00' : 'transparent',
      }}
    >
      <span
        className={`w-6 text-right select-none flex-shrink-0 ${line.highlight ? '' : 'opacity-30'}`}
        style={{ color: line.highlight ? '#b5fe00' : '#a7aca9' }}
      >
        {line.line}
      </span>
      <p style={{ color: line.highlight ? '#f9fdf9' : '#a7aca9', whiteSpace: 'pre' }}>
        {tokens.map((tok, i) => {
          const t = tok.trim();
          if (keywords.includes(t)) return <span key={i} style={{ color: '#b5fe00' }}>{tok}</span>;
          if (funcNames.includes(t)) return <span key={i} style={{ color: '#68fcbf' }}>{tok}</span>;
          if (/^\d+$/.test(t)) return <span key={i} style={{ color: '#ff7351' }}>{tok}</span>;
          return <span key={i}>{tok}</span>;
        })}
      </p>
    </div>
  );
};

// ─── Simulation Modal ────────────────────────────────────
const SimulationModal = ({ onClose, onConfirm, isBinaryMode }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleRandom = () => {
    const count = Math.floor(Math.random() * 10) + 8;
    let arr = Array.from({ length: count }, () => Math.floor(Math.random() * 88) + 8);
    if (isBinaryMode) arr.sort((a, b) => a - b);
    onConfirm(arr);
  };

  const handleManual = () => {
    const nums = inputValue.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n) && n > 0);
    if (nums.length < 2) {
      setError('Enter at least 2 numbers (e.g. 10, 25, 40, 55)');
      return;
    }
    if (nums.some((n) => n > 100)) {
      setError('Values must be between 1 and 100');
      return;
    }
    let finalArr = nums;
    if (isBinaryMode) finalArr = [...nums].sort((a, b) => a - b);
    onConfirm(finalArr);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="rounded-2xl p-8 w-full max-w-md relative"
        style={{
          backgroundColor: '#111916',
          border: '1px solid rgba(182, 255, 0, 0.2)',
          boxShadow: '0 0 60px rgba(182, 255, 0, 0.08)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 opacity-40 hover:opacity-100 transition-opacity"
          style={{ color: '#e8fff8' }}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(182,255,0,0.15)' }}
          >
            <span className="material-symbols-outlined text-lg" style={{ color: '#b5fe00' }}>
              search
            </span>
          </div>
          <div>
            <h2 className="font-bold text-lg" style={{ color: '#f9fdf9', fontFamily: 'Space Grotesk' }}>
              New Search Simulation
            </h2>
            <p className="text-xs" style={{ color: '#a7aca9' }}>
              Define your dataset to search
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              className="block text-[10px] uppercase tracking-widest font-bold mb-2"
              style={{ color: '#a7aca9' }}
            >
              Enter Numbers (comma or space separated, 1–100)
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError('');
              }}
              placeholder="e.g. 15, 28, 40, 55, 72, 88"
              className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none transition-all"
              style={{
                backgroundColor: '#1a211e',
                border: '1px solid rgba(68,73,70,0.5)',
                color: '#e8fff8',
                caretColor: '#b5fe00',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(182,255,0,0.4)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(68,73,70,0.5)')}
              onKeyDown={(e) => e.key === 'Enter' && handleManual()}
            />
            {error && <p className="text-xs mt-1" style={{ color: '#ff7351' }}>{error}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleRandom}
              className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-80"
              style={{
                backgroundColor: '#1a211e',
                border: '1px solid rgba(182,255,0,0.15)',
                color: '#68fcbf',
                fontFamily: 'Space Grotesk',
              }}
            >
              <span className="material-symbols-outlined text-sm">shuffle</span>
              Random Array
            </button>
            <button
              onClick={handleManual}
              className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: '#b5fe00', color: '#415e00', fontFamily: 'Space Grotesk' }}
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Visualization Popup Modal for Step-by-Step Working ───────────────────
const VisualizationPopup = ({ isOpen, onClose, array, target, selectedAlgo }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [isFinished, setIsFinished] = useState(false);

  // Generate steps when popup opens or props change
  useEffect(() => {
    if (isOpen && array && target && selectedAlgo) {
      const gen = SEARCH_GENERATORS[selectedAlgo];
      if (gen) {
        let workingArr = [...array];
        if (selectedAlgo === 'Binary Search') {
          workingArr = [...array].sort((a, b) => a - b);
        }
        const newSteps = gen(workingArr, target);
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(false);
        setIsFinished(false);
      }
    }
  }, [isOpen, array, target, selectedAlgo]);

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep((prev) => prev + 1), speed);
    } else if (isPlaying && currentStep >= steps.length - 1) {
      setIsPlaying(false);
      setIsFinished(true);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setIsFinished(false);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsFinished(false);
  };

  if (!isOpen) return null;

  const currentArray = steps[currentStep]?.array || array;
  const highlightedIndices = steps[currentStep]?.highlightedIndices || [];
  const stepDescription = steps[currentStep]?.description || '';
  const maxValue = currentArray?.length ? Math.max(...currentArray) : 100;
  const statusText = isPlaying ? 'Searching...' : isFinished ? 'Complete' : 'Paused';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-[90vw] max-w-5xl h-[80vh] flex flex-col relative overflow-hidden"
        style={{
          backgroundColor: '#0a0f0d',
          border: '1px solid rgba(182, 255, 0, 0.3)',
          boxShadow: '0 0 80px rgba(182, 255, 0, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-6 py-4"
          style={{ borderBottom: '1px solid rgba(182, 255, 0, 0.15)', backgroundColor: '#111916' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(182,255,0,0.15)' }}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: '#b5fe00' }}>
                visibility
              </span>
            </div>
            <div>
              <h2 className="font-bold text-lg" style={{ color: '#f9fdf9', fontFamily: 'Space Grotesk' }}>
                {selectedAlgo} Visualization
              </h2>
              <p className="text-xs" style={{ color: '#a7aca9' }}>
                Searching for {target} in array of {currentArray?.length || 0} elements
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: '#e8fff8' }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body - Visualization Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Bars Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 w-full mb-6">
            {currentArray?.map((value, idx) => {
              const barHeight = (value / maxValue) * 85 + 5;
              const isHighlighted = highlightedIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="relative group"
                  style={{
                    flex: 1,
                    height: `${barHeight}%`,
                    minWidth: '8px',
                    backgroundColor: isHighlighted ? '#b5fe00' : 'rgba(104, 252, 191, 0.3)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.2s ease',
                    boxShadow: isHighlighted ? '0 0 20px rgba(182, 255, 0, 0.6)' : 'none',
                    border: isHighlighted ? '1px solid #b5fe00' : '1px solid rgba(104, 252, 191, 0.1)',
                  }}
                >
                  <div 
                    className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-mono font-bold whitespace-nowrap transition-opacity"
                    style={{ 
                      color: isHighlighted ? '#b5fe00' : '#e8fff8',
                      opacity: 0.9,
                    }}
                  >
                    {value}
                  </div>
                  <div 
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono"
                    style={{ color: '#a7aca9' }}
                  >
                    {idx}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Description */}
          {stepDescription && (
            <div className="text-center text-sm font-mono px-4 py-3 rounded-full mx-auto mb-6" style={{ backgroundColor: '#151b18', color: '#e9ffbd', maxWidth: '90%' }}>
              {stepDescription}
            </div>
          )}

          {/* Step Progress Indicator */}
          {steps.length > 0 && (
            <div className="flex justify-center gap-1 mt-4 flex-wrap">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: idx === currentStep ? '24px' : '8px',
                    backgroundColor: idx <= currentStep ? '#b5fe00' : 'rgba(104,252,191,0.2)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer - Controls */}
        <div
          className="px-6 py-4 flex justify-between items-center"
          style={{
            backgroundColor: '#111916',
            borderTop: '1px solid rgba(182, 255, 0, 0.1)',
          }}
        >
          <div className="flex items-center gap-4">
            {/* Play/Pause/Reset Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlay}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: '#b5fe00',
                  color: '#415e00',
                  opacity: isPlaying ? 0.7 : 1,
                }}
                disabled={isPlaying}
              >
                <span className="material-symbols-outlined text-xl">play_arrow</span>
              </button>
              <button
                onClick={handlePause}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: '#202724',
                  color: '#e8fff8',
                  opacity: !isPlaying && !isFinished ? 1 : 0.5,
                }}
                disabled={!isPlaying}
              >
                <span className="material-symbols-outlined text-xl">pause</span>
              </button>
              <button
                onClick={handleReset}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: '#202724',
                  color: '#e8fff8',
                }}
              >
                <span className="material-symbols-outlined text-xl">restart_alt</span>
              </button>
            </div>

            {/* Speed Slider */}
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#1a211e' }}>
              <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: '#a7aca9' }}>
                Speed
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px]" style={{ color: '#68fcbf' }}>Fast</span>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  value={1300 - speed}
                  onChange={(e) => setSpeed(1300 - Number(e.target.value))}
                  className="w-24 h-1 rounded-full appearance-none cursor-pointer"
                  style={{ backgroundColor: '#202724', accentColor: '#b5fe00' }}
                />
                <span className="text-[10px]" style={{ color: '#a7aca9' }}>Slow</span>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ backgroundColor: '#1a211e' }}>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: isPlaying ? '#68fcbf' : isFinished ? '#b5fe00' : '#a7aca9' }}
              />
              <span className="text-xs font-mono" style={{ color: '#e8fff8' }}>{statusText}</span>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 rounded-full" style={{ backgroundColor: '#1a211e', color: '#a7aca9' }}>
              Step: {currentStep + 1} / {steps.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Search Page ─────────────────────────────────────────────────────────
const SearchingPage = () => {
  const [array, setArray] = useState(DEFAULT_ARRAY);
  const [target, setTarget] = useState(DEFAULT_TARGET);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [isDescOpen, setIsDescOpen] = useState(true);

  const [selectedAlgo, setSelectedAlgo] = useState('Linear Search');
  const [algoDropdownOpen, setAlgoDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('python');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [showSimModal, setShowSimModal] = useState(false);
  const [showVisualPopup, setShowVisualPopup] = useState(false); // New state for popup

  const algoRef = useRef(null);
  const langRef = useRef(null);

  const runAlgorithm = (arr, algo, searchTarget) => {
    const gen = SEARCH_GENERATORS[algo];
    if (!gen) return;
    let workingArr = [...arr];
    if (algo === 'Binary Search') {
      workingArr = [...arr].sort((a, b) => a - b);
      if (JSON.stringify(workingArr) !== JSON.stringify(arr)) {
        setArray(workingArr);
      }
    }
    const newSteps = gen(workingArr, searchTarget);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    runAlgorithm(array, selectedAlgo, target);
  }, []);

  useEffect(() => {
    let workingArray = array;
    if (selectedAlgo === 'Binary Search') {
      const sorted = [...array].sort((a, b) => a - b);
      if (JSON.stringify(sorted) !== JSON.stringify(array)) {
        setArray(sorted);
        workingArray = sorted;
      }
    }
    runAlgorithm(workingArray, selectedAlgo, target);
  }, [selectedAlgo, target]);

  useEffect(() => {
    if (selectedAlgo === 'Binary Search') {
      const sorted = [...array].sort((a, b) => a - b);
      if (JSON.stringify(sorted) !== JSON.stringify(array)) {
        setArray(sorted);
      }
    }
  }, [array, selectedAlgo]);

  useEffect(() => {
    const handler = (e) => {
      if (algoRef.current && !algoRef.current.contains(e.target)) setAlgoDropdownOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep((prev) => prev + 1), speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) setCurrentStep(0);
    setIsPlaying(true);
  };
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleAlgoChange = (algo) => {
    setSelectedAlgo(algo);
    setAlgoDropdownOpen(false);
    if (algo === 'Binary Search') {
      const sortedArr = [...array].sort((a, b) => a - b);
      setArray(sortedArr);
      runAlgorithm(sortedArr, algo, target);
    } else {
      runAlgorithm(array, algo, target);
    }
  };

  const handleNewSimulation = (newArr) => {
    setArray(newArr);
    setShowSimModal(false);
    if (selectedAlgo === 'Binary Search') {
      const sorted = [...newArr].sort((a, b) => a - b);
      setArray(sorted);
      runAlgorithm(sorted, selectedAlgo, target);
    } else {
      runAlgorithm(newArr, selectedAlgo, target);
    }
  };

  const currentArray = steps[currentStep]?.array || array;
  const highlightedIndices = steps[currentStep]?.highlightedIndices || [];
  const stepDescription = steps[currentStep]?.description || '';
  const info = ALGO_INFO_SEARCH[selectedAlgo];
  const codeLines = SEARCH_CODE[selectedAlgo][selectedLang];
  const isFinished = currentStep >= steps.length - 1;
  const statusText = isPlaying ? 'Searching...' : isFinished ? 'Complete' : 'Paused';

  const searchAlgos = ['Linear Search', 'Binary Search'];

  const algoShortName = (a) => {
    const map = { 'Linear Search': 'linearSearch', 'Binary Search': 'binarySearch' };
    return map[a] + FILE_LABELS[selectedLang].ext;
  };

  // Find the biggest number in the array to make bars the right size
  const maxValue = Math.max(...currentArray);

  return (
    <div className="w-full h-full">
      {showSimModal && (
        <SimulationModal
          onClose={() => setShowSimModal(false)}
          onConfirm={handleNewSimulation}
          isBinaryMode={selectedAlgo === 'Binary Search'}
        />
      )}

      {/* Visualization Popup */}
      <VisualizationPopup
        isOpen={showVisualPopup}
        onClose={() => setShowVisualPopup(false)}
        array={array}
        target={target}
        selectedAlgo={selectedAlgo}
      />

      {/* Body */}
      <div className="p-6 grid grid-cols-12 gap-6" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Left Column */}
        <div className="col-span-8 flex flex-col gap-6 h-full overflow-hidden">
          {/* Visualization Card */}
          <section
            className="flex-1 rounded-lg relative overflow-hidden flex flex-col p-8"
            style={{
              background: 'rgba(10, 15, 13, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(182, 255, 0, 0.1)',
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="relative" ref={algoRef}>
                  <button
                    onClick={() => setAlgoDropdownOpen((p) => !p)}
                    className="flex items-center gap-2 text-3xl font-bold tracking-tight transition-opacity hover:opacity-80"
                    style={{ color: '#f9fdf9', fontFamily: 'Space Grotesk' }}
                  >
                    {selectedAlgo}
                    <span className="material-symbols-outlined text-2xl" style={{ color: '#b5fe00' }}>
                      {algoDropdownOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {algoDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden z-50 min-w-[200px]"
                      style={{
                        backgroundColor: '#151b18',
                        border: '1px solid rgba(182,255,0,0.15)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      {searchAlgos.map((algo) => (
                        <button
                          key={algo}
                          onClick={() => handleAlgoChange(algo)}
                          className="w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center justify-between gap-4"
                          style={{
                            color: algo === selectedAlgo ? '#b5fe00' : '#e8fff8',
                            backgroundColor: algo === selectedAlgo ? 'rgba(182,255,0,0.08)' : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (algo !== selectedAlgo) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                          }}
                          onMouseLeave={(e) => {
                            if (algo !== selectedAlgo) e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {algo}
                          {algo === selectedAlgo && <span className="material-symbols-outlined text-sm">check</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* PLAY/PAUSE/RESET/SPEED CONTROLS - MOVED HERE */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center px-4 py-1.5 rounded-full gap-3" style={{ backgroundColor: '#202724' }}>
                    <button
                      onClick={handlePlay}
                      className="transition-all hover:opacity-100 active:scale-90"
                      style={{ color: '#E8FFF8', opacity: isPlaying ? 1 : 0.6 }}
                      title="Play"
                    >
                      <span className="material-symbols-outlined text-xl">play_arrow</span>
                    </button>
                    <button
                      onClick={handlePause}
                      className="transition-all hover:opacity-100 active:scale-90"
                      style={{ color: '#E8FFF8', opacity: !isPlaying && !isFinished ? 1 : 0.6 }}
                      title="Pause"
                    >
                      <span className="material-symbols-outlined text-xl">pause</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="transition-all hover:opacity-100 active:scale-90"
                      style={{ color: '#E8FFF8', opacity: 0.6 }}
                      title="Restart"
                    >
                      <span className="material-symbols-outlined text-xl">restart_alt</span>
                    </button>
                    <div className="h-5 w-px" style={{ backgroundColor: '#444946', opacity: 0.3 }}></div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-bold tracking-widest" style={{ color: '#a7aca9' }}>Speed</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px]" style={{ color: '#68fcbf' }}>Fast</span>
                        <input
                          type="range"
                          min="50"
                          max="1000"
                          value={1050 - speed}
                          onChange={(e) => setSpeed(1050 - Number(e.target.value))}
                          className="w-20 h-1 rounded-full appearance-none cursor-pointer"
                          style={{ backgroundColor: '#202724', accentColor: '#b5fe00' }}
                        />
                        <span className="text-[8px]" style={{ color: '#a7aca9' }}>Slow</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    <p className="flex items-center gap-2" style={{ color: '#a7aca9' }}>
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: isPlaying ? '#68fcbf' : isFinished ? '#b5fe00' : '#a7aca9' }}
                      ></span>
                      {isPlaying ? 'Looking for the number...' : isFinished ? 'Found it!' : 'Ready to search'}
                    </p>
                    <div className="flex items-center gap-2 bg-[#1a211e] px-3 py-1 rounded-full">
                      <span className="text-[10px] uppercase font-bold" style={{ color: '#a7aca9' }}>
                        Find:
                      </span>
                      <input
                        type="number"
                        value={target}
                        onChange={(e) => setTarget(Number(e.target.value))}
                        className="w-16 bg-transparent text-[#b5fe00] font-mono text-sm outline-none border-b border-[#444946] focus:border-[#b5fe00] text-center"
                        step="1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSimModal(true)}
                  className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full transition-all hover:opacity-80 flex items-center gap-1"
                  style={{ backgroundColor: '#b5fe00', color: '#415e00', fontFamily: 'Space Grotesk', border: 'none' }}
                >
                  <span className="material-symbols-outlined text-[12px]">add</span>
                  New Simulation
                </button>
                {/* New Button to open Visualization Popup */}
                <button
                  onClick={() => setShowVisualPopup(true)}
                  className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full transition-all hover:opacity-80 flex items-center gap-1"
                  style={{ backgroundColor: '#202724', color: '#e8fff8', fontFamily: 'Space Grotesk', border: '1px solid rgba(182,255,0,0.3)' }}
                >
                  <span className="material-symbols-outlined text-[12px]">fullscreen</span>
                  Popup View
                </button>
              </div>
            </div>

            {/* BARS */}
            <div className="flex-1 flex items-end justify-between gap-2 w-full" style={{ height: '300px', minHeight: '300px' }}>
              {currentArray.map((value, idx) => {
                const barHeight = (value / maxValue) * 85 + 5;
                
                return (
                  <div
                    key={idx}
                    className="relative group"
                    style={{
                      flex: 1,
                      height: `${barHeight}%`,
                      minWidth: '8px',
                      backgroundColor: highlightedIndices.includes(idx) ? '#b5fe00' : 'rgba(104, 252, 191, 0.3)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'all 0.15s ease',
                      boxShadow: highlightedIndices.includes(idx) ? '0 0 20px rgba(182, 255, 0, 0.6)' : 'none',
                      border: highlightedIndices.includes(idx) ? '1px solid #b5fe00' : '1px solid rgba(104, 252, 191, 0.1)',
                    }}
                  >
                    <div 
                      className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-mono font-bold whitespace-nowrap transition-opacity"
                      style={{ 
                        color: highlightedIndices.includes(idx) ? '#b5fe00' : '#e8fff8',
                        opacity: 0.9,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step Description */}
            {stepDescription && (
              <div className="mt-8 text-center text-sm font-mono px-4 py-3 rounded-full self-center" style={{ backgroundColor: '#151b18', color: '#e9ffbd', maxWidth: '90%' }}>
                {stepDescription}
              </div>
            )}
          </section>

          {/* Info Section */}
          <section
            className="rounded-lg p-6 flex flex-col gap-4"
            style={{
              background: 'rgba(10, 15, 13, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(182, 255, 0, 0.1)',
            }}
          >
            <button onClick={() => setIsDescOpen(!isDescOpen)} className="flex justify-between items-center cursor-pointer w-full">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ color: '#e9ffbd' }}>
                  info
                </span>
                <h3 className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                  {selectedAlgo} Analysis
                </h3>
              </div>
              <span className="material-symbols-outlined transition-transform">{isDescOpen ? 'expand_less' : 'expand_more'}</span>
            </button>
            {isDescOpen && (
              <div className="grid grid-cols-3 gap-8 mt-2">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: '#a7aca9' }}>
                    Time Complexity
                  </p>
                  <p className="text-2xl font-bold" style={{ color: info.effColor, fontFamily: 'Space Grotesk' }}>
                    {info.efficiency}
                  </p>
                  <p className="text-xs" style={{ color: '#a7aca9' }}>
                    Best: {info.bestCase} | Worst: {info.worstCase}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: '#a7aca9' }}>
                    Space Complexity
                  </p>
                  <p className="text-2xl font-bold" style={{ color: info.spaceColor, fontFamily: 'Space Grotesk' }}>
                    {info.space}
                  </p>
                  <p className="text-xs" style={{ color: '#a7aca9' }}>
                    Extra space needed
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: '#a7aca9' }}>
                    Approach
                  </p>
                  <p className="text-2xl font-bold" style={{ color: '#f9fdf9', fontFamily: 'Space Grotesk' }}>
                    {info.approach}
                  </p>
                  <p className="text-xs" style={{ color: '#a7aca9' }}>
                    {selectedAlgo === 'Linear Search' ? 'Checks each number one by one' : 'Jumps to the middle and splits in half'}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column – Code Editor */}
        <section
          className="col-span-4 h-full rounded-lg flex flex-col overflow-hidden"
          style={{
            background: 'rgba(10, 15, 13, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(182, 255, 0, 0.1)',
          }}
        >
          <div
            className="px-4 py-3 flex justify-between items-center"
            style={{ backgroundColor: '#151b18', borderBottom: '1px solid rgba(68, 73, 70, 0.2)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff7351', opacity: 0.4 }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFD700', opacity: 0.4 }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#68fcbf', opacity: 0.4 }}></div>
            </div>

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen((p) => !p)}
                className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded border transition-colors hover:opacity-80"
                style={{ backgroundColor: '#1a211e', borderColor: 'rgba(68, 73, 70, 0.3)', color: '#e8fff8' }}
              >
                {algoShortName(selectedAlgo)}
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </button>
              {langDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-1 rounded-xl overflow-hidden z-50 min-w-[160px]"
                  style={{
                    backgroundColor: '#151b18',
                    border: '1px solid rgba(182,255,0,0.15)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {Object.entries(FILE_LABELS).map(([lang, meta]) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-mono flex items-center justify-between gap-3 transition-colors"
                      style={{
                        color: lang === selectedLang ? '#b5fe00' : '#e8fff8',
                        backgroundColor: lang === selectedLang ? 'rgba(182,255,0,0.08)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (lang !== selectedLang) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        if (lang !== selectedLang) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>{meta.label}</span>
                      {lang === selectedLang && <span className="material-symbols-outlined text-xs">check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto" style={{ backgroundColor: 'rgba(15, 21, 18, 0.5)' }}>
            <div className="space-y-1">
              {codeLines.map((line) => (
                <CodeLine key={line.line} line={line} />
              ))}
            </div>
          </div>

          <div
            className="p-4"
            style={{ backgroundColor: 'rgba(26, 33, 30, 0.3)', borderTop: '1px solid rgba(68, 73, 70, 0.2)' }}
          >
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold" style={{ color: '#a7aca9' }}>
              <span>Status: {statusText}</span>
              <span>{FILE_LABELS[selectedLang].label}</span>
            </div>
          </div>
        </section>
      </div>

      
    </div>
  );
};

export default SearchingPage;