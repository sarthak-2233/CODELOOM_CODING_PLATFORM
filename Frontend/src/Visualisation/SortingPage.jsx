import React, { useState, useEffect, useRef } from 'react';


// ─── Algorithm step generators ───────────────────────────────────────────────

const generateMergeSortSteps = (originalArr) => {
  const steps = [];
  const arr = [...originalArr];
  const merge = (left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      steps.push({ array: [...arr], highlightedIndices: [left + i, mid + 1 + j] });
      if (leftArr[i] <= rightArr[j]) { arr[k] = leftArr[i]; i++; }
      else { arr[k] = rightArr[j]; j++; }
      k++;
    }
    while (i < leftArr.length) { arr[k] = leftArr[i]; i++; k++; }
    while (j < rightArr.length) { arr[k] = rightArr[j]; j++; k++; }
  };
  const mergeSort = (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({ array: [...arr], highlightedIndices: [left, mid, right] });
      mergeSort(left, mid);
      mergeSort(mid + 1, right);
      merge(left, mid, right);
      steps.push({ array: [...arr], highlightedIndices: [left, right] });
    }
  };
  mergeSort(0, arr.length - 1);
  steps.push({ array: [...arr], highlightedIndices: [] });
  return steps;
};

const generateBubbleSortSteps = (originalArr) => {
  const steps = [];
  const arr = [...originalArr];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({ array: [...arr], highlightedIndices: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ array: [...arr], highlightedIndices: [j, j + 1] });
      }
    }
  }
  steps.push({ array: [...arr], highlightedIndices: [] });
  return steps;
};

const generateSelectionSortSteps = (originalArr) => {
  const steps = [];
  const arr = [...originalArr];
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({ array: [...arr], highlightedIndices: [minIdx, j] });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ array: [...arr], highlightedIndices: [i, minIdx] });
    }
  }
  steps.push({ array: [...arr], highlightedIndices: [] });
  return steps;
};

const generateInsertionSortSteps = (originalArr) => {
  const steps = [];
  const arr = [...originalArr];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    steps.push({ array: [...arr], highlightedIndices: [i] });
    while (j >= 0 && arr[j] > key) {
      steps.push({ array: [...arr], highlightedIndices: [j, j + 1] });
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    steps.push({ array: [...arr], highlightedIndices: [j + 1] });
  }
  steps.push({ array: [...arr], highlightedIndices: [] });
  return steps;
};

const generateQuickSortSteps = (originalArr) => {
  const steps = [];
  const arr = [...originalArr];
  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ array: [...arr], highlightedIndices: [j, high] });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ array: [...arr], highlightedIndices: [i, j] });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ array: [...arr], highlightedIndices: [i + 1] });
    return i + 1;
  };
  const quickSort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  };
  quickSort(0, arr.length - 1);
  steps.push({ array: [...arr], highlightedIndices: [] });
  return steps;
};

// ─── Code snippets per algorithm & language ──────────────────────────────────

const CODE = {
  'Merge Sort': {
    python: [
      { line: 1, code: 'def merge_sort(arr):' },
      { line: 2, code: '    if len(arr) > 1:' },
      { line: 3, code: '        mid = len(arr) // 2', highlight: true },
      { line: 4, code: '        L = arr[:mid]' },
      { line: 5, code: '        R = arr[mid:]' },
      { line: 6, code: '        merge_sort(L)' },
      { line: 7, code: '        merge_sort(R)' },
      { line: 8, code: '        i = j = k = 0' },
      { line: 9, code: '        while i < len(L) and j < len(R):' },
      { line: 10, code: '            if L[i] < R[j]:' },
      { line: 11, code: '                arr[k] = L[i]' },
      { line: 12, code: '                i += 1' },
    ],
    cpp: [
      { line: 1, code: 'void merge(int arr[], int l, int m, int r) {' },
      { line: 2, code: '    int n1 = m - l + 1, n2 = r - m;' },
      { line: 3, code: '    int L[n1], R[n2];', highlight: true },
      { line: 4, code: '    for (int i=0; i<n1; i++) L[i] = arr[l+i];' },
      { line: 5, code: '    for (int j=0; j<n2; j++) R[j] = arr[m+1+j];' },
      { line: 6, code: '    int i=0, j=0, k=l;' },
      { line: 7, code: '    while (i<n1 && j<n2) {' },
      { line: 8, code: '        if (L[i] <= R[j]) arr[k++] = L[i++];' },
      { line: 9, code: '        else arr[k++] = R[j++];' },
      { line: 10, code: '    }' },
      { line: 11, code: '    while (i<n1) arr[k++] = L[i++];' },
      { line: 12, code: '    while (j<n2) arr[k++] = R[j++]; }' },
    ],
    java: [
      { line: 1, code: 'void mergeSort(int[] arr, int l, int r) {' },
      { line: 2, code: '    if (l < r) {' },
      { line: 3, code: '        int mid = (l + r) / 2;', highlight: true },
      { line: 4, code: '        mergeSort(arr, l, mid);' },
      { line: 5, code: '        mergeSort(arr, mid+1, r);' },
      { line: 6, code: '        merge(arr, l, mid, r);' },
      { line: 7, code: '    }' },
      { line: 8, code: '}' },
      { line: 9, code: 'void merge(int[] arr, int l, int m, int r) {' },
      { line: 10, code: '    int[] temp = new int[r-l+1];' },
      { line: 11, code: '    int i=l, j=m+1, k=0;' },
      { line: 12, code: '    while (i<=m && j<=r) { ... }' },
    ],
  },
  'Bubble Sort': {
    python: [
      { line: 1, code: 'def bubble_sort(arr):' },
      { line: 2, code: '    n = len(arr)' },
      { line: 3, code: '    for i in range(n-1):', highlight: true },
      { line: 4, code: '        for j in range(n-i-1):' },
      { line: 5, code: '            if arr[j] > arr[j+1]:' },
      { line: 6, code: '                arr[j], arr[j+1] = arr[j+1], arr[j]' },
      { line: 7, code: '    return arr' },
    ],
    cpp: [
      { line: 1, code: 'void bubbleSort(int arr[], int n) {' },
      { line: 2, code: '    for (int i=0; i<n-1; i++) {', highlight: true },
      { line: 3, code: '        for (int j=0; j<n-i-1; j++) {' },
      { line: 4, code: '            if (arr[j] > arr[j+1]) {' },
      { line: 5, code: '                swap(arr[j], arr[j+1]);' },
      { line: 6, code: '            }' },
      { line: 7, code: '        }' },
      { line: 8, code: '    }' },
      { line: 9, code: '}' },
    ],
    java: [
      { line: 1, code: 'void bubbleSort(int[] arr) {' },
      { line: 2, code: '    int n = arr.length;' },
      { line: 3, code: '    for (int i=0; i<n-1; i++) {', highlight: true },
      { line: 4, code: '        for (int j=0; j<n-i-1; j++) {' },
      { line: 5, code: '            if (arr[j] > arr[j+1]) {' },
      { line: 6, code: '                int t = arr[j];' },
      { line: 7, code: '                arr[j] = arr[j+1];' },
      { line: 8, code: '                arr[j+1] = t;' },
      { line: 9, code: '            }' },
      { line: 10, code: '        }' },
      { line: 11, code: '    }' },
      { line: 12, code: '}' },
    ],
  },
  'Selection Sort': {
    python: [
      { line: 1, code: 'def selection_sort(arr):' },
      { line: 2, code: '    n = len(arr)' },
      { line: 3, code: '    for i in range(n-1):', highlight: true },
      { line: 4, code: '        min_idx = i' },
      { line: 5, code: '        for j in range(i+1, n):' },
      { line: 6, code: '            if arr[j] < arr[min_idx]:' },
      { line: 7, code: '                min_idx = j' },
      { line: 8, code: '        arr[i], arr[min_idx] = arr[min_idx], arr[i]' },
    ],
    cpp: [
      { line: 1, code: 'void selectionSort(int arr[], int n) {' },
      { line: 2, code: '    for (int i=0; i<n-1; i++) {', highlight: true },
      { line: 3, code: '        int minIdx = i;' },
      { line: 4, code: '        for (int j=i+1; j<n; j++)' },
      { line: 5, code: '            if (arr[j] < arr[minIdx]) minIdx = j;' },
      { line: 6, code: '        swap(arr[minIdx], arr[i]);' },
      { line: 7, code: '    }' },
      { line: 8, code: '}' },
    ],
    java: [
      { line: 1, code: 'void selectionSort(int[] arr) {' },
      { line: 2, code: '    int n = arr.length;' },
      { line: 3, code: '    for (int i=0; i<n-1; i++) {', highlight: true },
      { line: 4, code: '        int minIdx = i;' },
      { line: 5, code: '        for (int j=i+1; j<n; j++)' },
      { line: 6, code: '            if (arr[j] < arr[minIdx]) minIdx = j;' },
      { line: 7, code: '        int t = arr[minIdx];' },
      { line: 8, code: '        arr[minIdx] = arr[i]; arr[i] = t;' },
      { line: 9, code: '    }' },
      { line: 10, code: '}' },
    ],
  },
  'Insertion Sort': {
    python: [
      { line: 1, code: 'def insertion_sort(arr):' },
      { line: 2, code: '    for i in range(1, len(arr)):' },
      { line: 3, code: '        key = arr[i]', highlight: true },
      { line: 4, code: '        j = i - 1' },
      { line: 5, code: '        while j >= 0 and arr[j] > key:' },
      { line: 6, code: '            arr[j+1] = arr[j]' },
      { line: 7, code: '            j -= 1' },
      { line: 8, code: '        arr[j+1] = key' },
    ],
    cpp: [
      { line: 1, code: 'void insertionSort(int arr[], int n) {' },
      { line: 2, code: '    for (int i=1; i<n; i++) {' },
      { line: 3, code: '        int key = arr[i];', highlight: true },
      { line: 4, code: '        int j = i - 1;' },
      { line: 5, code: '        while (j>=0 && arr[j]>key) {' },
      { line: 6, code: '            arr[j+1] = arr[j]; j--;' },
      { line: 7, code: '        }' },
      { line: 8, code: '        arr[j+1] = key;' },
      { line: 9, code: '    }' },
      { line: 10, code: '}' },
    ],
    java: [
      { line: 1, code: 'void insertionSort(int[] arr) {' },
      { line: 2, code: '    int n = arr.length;' },
      { line: 3, code: '    for (int i=1; i<n; i++) {' },
      { line: 4, code: '        int key = arr[i];', highlight: true },
      { line: 5, code: '        int j = i - 1;' },
      { line: 6, code: '        while (j>=0 && arr[j]>key) {' },
      { line: 7, code: '            arr[j+1] = arr[j]; j--;' },
      { line: 8, code: '        }' },
      { line: 9, code: '        arr[j+1] = key;' },
      { line: 10, code: '    }' },
      { line: 11, code: '}' },
    ],
  },
  'Quick Sort': {
    python: [
      { line: 1, code: 'def quick_sort(arr, low, high):' },
      { line: 2, code: '    if low < high:' },
      { line: 3, code: '        pi = partition(arr, low, high)', highlight: true },
      { line: 4, code: '        quick_sort(arr, low, pi-1)' },
      { line: 5, code: '        quick_sort(arr, pi+1, high)' },
      { line: 6, code: 'def partition(arr, low, high):' },
      { line: 7, code: '    pivot = arr[high]' },
      { line: 8, code: '    i = low - 1' },
      { line: 9, code: '    for j in range(low, high):' },
      { line: 10, code: '        if arr[j] < pivot:' },
      { line: 11, code: '            i += 1' },
      { line: 12, code: '            arr[i], arr[j] = arr[j], arr[i]' },
    ],
    cpp: [
      { line: 1, code: 'int partition(int arr[], int l, int h) {' },
      { line: 2, code: '    int pivot = arr[h], i = l-1;' },
      { line: 3, code: '    for (int j=l; j<h; j++) {', highlight: true },
      { line: 4, code: '        if (arr[j] < pivot)' },
      { line: 5, code: '            swap(arr[++i], arr[j]);' },
      { line: 6, code: '    }' },
      { line: 7, code: '    swap(arr[i+1], arr[h]);' },
      { line: 8, code: '    return i+1;' },
      { line: 9, code: '}' },
      { line: 10, code: 'void quickSort(int arr[], int l, int h) {' },
      { line: 11, code: '    if (l < h) { int pi = partition(arr,l,h);' },
      { line: 12, code: '    quickSort(arr,l,pi-1); quickSort(arr,pi+1,h); }}' },
    ],
    java: [
      { line: 1, code: 'void quickSort(int[] arr, int low, int high) {' },
      { line: 2, code: '    if (low < high) {' },
      { line: 3, code: '        int pi = partition(arr, low, high);', highlight: true },
      { line: 4, code: '        quickSort(arr, low, pi-1);' },
      { line: 5, code: '        quickSort(arr, pi+1, high);' },
      { line: 6, code: '    }' },
      { line: 7, code: '}' },
      { line: 8, code: 'int partition(int[] arr, int low, int high) {' },
      { line: 9, code: '    int pivot = arr[high], i = low-1;' },
      { line: 10, code: '    for (int j=low; j<high; j++) {' },
      { line: 11, code: '        if (arr[j]<pivot) { i++; swap(arr,i,j); }' },
      { line: 12, code: '    } swap(arr,i+1,high); return i+1; }' },
    ],
  },
};

const ALGO_INFO = {
  'Merge Sort':      { efficiency: 'O(n log n)', space: 'O(n)',      stability: 'Stable',   effColor: '#68fcbf', spaceColor: '#e9ffbd' },
  'Bubble Sort':     { efficiency: 'O(n²)',      space: 'O(1)',      stability: 'Stable',   effColor: '#68fcbf', spaceColor: '#e9ffbd' },
  'Selection Sort':  { efficiency: 'O(n²)',      space: 'O(1)',      stability: 'Unstable', effColor: '#ff7351', spaceColor: '#e9ffbd' },
  'Insertion Sort':  { efficiency: 'O(n²)',      space: 'O(1)',      stability: 'Stable',   effColor: '#68fcbf', spaceColor: '#e9ffbd' },
  'Quick Sort':      { efficiency: 'O(n log n)', space: 'O(log n)',  stability: 'Unstable', effColor: '#68fcbf', spaceColor: '#e9ffbd' },
};

const FILE_LABELS = {
  python: { ext: '.py',   label: 'Python 3.11' },
  cpp:    { ext: '.cpp',  label: 'C++ 17' },
  java:   { ext: '.java', label: 'Java 21' },
};

const SORT_GENERATORS = {
  'Merge Sort':     generateMergeSortSteps,
  'Bubble Sort':    generateBubbleSortSteps,
  'Selection Sort': generateSelectionSortSteps,
  'Insertion Sort': generateInsertionSortSteps,
  'Quick Sort':     generateQuickSortSteps,
};

const DEFAULT_ARRAY = [45, 62, 38, 85, 72, 55, 25, 95, 40, 18, 66, 48, 77, 30, 52, 88, 12, 92, 60, 35];

// ─── CodeLine renderer ────────────────────────────────────────────────────────
const CodeLine = ({ line }) => {
  const keywords = ['def', 'if', 'while', 'for', 'void', 'int', 'return', 'else', 'class', 'public', 'static', 'new', 'in', 'range'];
  const funcNames = ['merge_sort', 'bubble_sort', 'selection_sort', 'insertion_sort', 'quick_sort',
                     'mergeSort', 'bubbleSort', 'selectionSort', 'insertionSort', 'quickSort',
                     'merge', 'partition', 'swap', 'len', 'range'];
  const tokens = line.code.split(/(\s+|[()[\]{},;])/);
  return (
    <div
      className={`flex gap-6 group ${line.highlight ? '-mx-6 px-6 border-l-2' : ''}`}
      style={{
        backgroundColor: line.highlight ? 'rgba(181, 254, 0, 0.1)' : 'transparent',
        borderLeftColor: line.highlight ? '#b5fe00' : 'transparent'
      }}
    >
      <span className={`w-6 text-right select-none flex-shrink-0 ${line.highlight ? '' : 'opacity-30'}`}
            style={{ color: line.highlight ? '#b5fe00' : '#a7aca9' }}>
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

// ─── New Simulation Modal ─────────────────────────────────────────────────────
const SimulationModal = ({ onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleRandom = () => {
    const count = Math.floor(Math.random() * 10) + 10;
    const arr = Array.from({ length: count }, () => Math.floor(Math.random() * 88) + 8);
    onConfirm(arr);
  };

  const handleManual = () => {
    const nums = inputValue.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && n > 0);
    if (nums.length < 3) { setError('Enter at least 3 numbers (e.g. 40, 70, 20, 55)'); return; }
    if (nums.some(n => n > 100)) { setError('Values must be between 1 and 100'); return; }
    onConfirm(nums);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="rounded-2xl p-8 w-full max-w-md relative" style={{
        backgroundColor: '#111916',
        border: '1px solid rgba(182, 255, 0, 0.2)',
        boxShadow: '0 0 60px rgba(182, 255, 0, 0.08)'
      }}>
        <button onClick={onClose} className="absolute top-5 right-5 opacity-40 hover:opacity-100 transition-opacity" style={{ color: '#e8fff8' }}>
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(182,255,0,0.15)' }}>
            <span className="material-symbols-outlined text-lg" style={{ color: '#b5fe00' }}>add_chart</span>
          </div>
          <div>
            <h2 className="font-bold text-lg" style={{ color: '#f9fdf9', fontFamily: 'Space Grotesk' }}>New Simulation</h2>
            <p className="text-xs" style={{ color: '#a7aca9' }}>Define your dataset to visualize</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#a7aca9' }}>
              Enter Numbers (comma or space separated, 1–100)
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={e => { setInputValue(e.target.value); setError(''); }}
              placeholder="e.g. 40, 72, 20, 55, 88, 15"
              className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none transition-all"
              style={{
                backgroundColor: '#1a211e',
                border: '1px solid rgba(68,73,70,0.5)',
                color: '#e8fff8',
                caretColor: '#b5fe00'
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(182,255,0,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(68,73,70,0.5)'}
              onKeyDown={e => e.key === 'Enter' && handleManual()}
            />
            {error && <p className="text-xs mt-1" style={{ color: '#ff7351' }}>{error}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleRandom}
              className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-80"
              style={{ backgroundColor: '#1a211e', border: '1px solid rgba(182,255,0,0.15)', color: '#68fcbf', fontFamily: 'Space Grotesk' }}
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

// ─── Main Sorting Page ─────────────────────────────────────────────────────────────────
const SortingPage = () => {
  const [array, setArray] = useState(DEFAULT_ARRAY);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [isDescOpen, setIsDescOpen] = useState(true);

  const [selectedAlgo, setSelectedAlgo] = useState('Merge Sort');
  const [algoDropdownOpen, setAlgoDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('python');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [showSimModal, setShowSimModal] = useState(false);

  const algoRef = useRef(null);
  const langRef = useRef(null);

  const runAlgorithm = (arr, algo) => {
    const gen = SORT_GENERATORS[algo];
    const newSteps = gen(arr);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    runAlgorithm(array, selectedAlgo);
  }, []);

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
      timer = setTimeout(() => setCurrentStep(prev => prev + 1), speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handlePlay = () => { if (currentStep >= steps.length - 1) setCurrentStep(0); setIsPlaying(true); };
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => { setCurrentStep(0); setIsPlaying(false); };

  const handleAlgoChange = (algo) => {
    setSelectedAlgo(algo);
    setAlgoDropdownOpen(false);
    runAlgorithm(array, algo);
  };

  const handleNewSimulation = (newArr) => {
    setArray(newArr);
    setShowSimModal(false);
    runAlgorithm(newArr, selectedAlgo);
  };

  const currentArray = steps[currentStep]?.array || array;
  const highlightedIndices = steps[currentStep]?.highlightedIndices || [];
  const info = ALGO_INFO[selectedAlgo];
  const codeLines = CODE[selectedAlgo][selectedLang];
  const isFinished = currentStep >= steps.length - 1;
  const statusText = isPlaying ? 'Simulating' : isFinished ? 'Complete' : 'Paused';

  const sortingAlgos = ['Merge Sort', 'Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Quick Sort'];

  const algoShortName = (a) => {
    const map = { 'Merge Sort': 'mergeSort', 'Bubble Sort': 'bubbleSort', 'Selection Sort': 'selectionSort', 'Insertion Sort': 'insertionSort', 'Quick Sort': 'quickSort' };
    return map[a] + FILE_LABELS[selectedLang].ext;
  };

  // Get max value for bar scaling
  const maxValue = Math.max(...currentArray);

  return (
    <div className="w-full h-full">
      {showSimModal && <SimulationModal onClose={() => setShowSimModal(false)} onConfirm={handleNewSimulation} />}

      

      {/* Body */}
      <div className="p-6 grid grid-cols-12 gap-6" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Left Column */}
        <div className="col-span-8 flex flex-col gap-6 h-full overflow-hidden">
          {/* Visualization Card */}
          <section className="flex-1 rounded-lg relative overflow-hidden flex flex-col p-8" style={{
            background: 'rgba(10, 15, 13, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(182, 255, 0, 0.1)'
          }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="relative" ref={algoRef}>
                  <button
                    onClick={() => setAlgoDropdownOpen(p => !p)}
                    className="flex items-center gap-2 text-3xl font-bold tracking-tight transition-opacity hover:opacity-80"
                    style={{ color: '#f9fdf9', fontFamily: 'Space Grotesk' }}
                  >
                    {selectedAlgo}
                    <span className="material-symbols-outlined text-2xl" style={{ color: '#b5fe00' }}>
                      {algoDropdownOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {algoDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden z-50 min-w-[200px]" style={{
                      backgroundColor: '#151b18',
                      border: '1px solid rgba(182,255,0,0.15)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}>
                      {sortingAlgos.map(algo => (
                        <button
                          key={algo}
                          onClick={() => handleAlgoChange(algo)}
                          className="w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center justify-between gap-4"
                          style={{
                            color: algo === selectedAlgo ? '#b5fe00' : '#e8fff8',
                            backgroundColor: algo === selectedAlgo ? 'rgba(182,255,0,0.08)' : 'transparent'
                          }}
                          onMouseEnter={e => { if (algo !== selectedAlgo) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                          onMouseLeave={e => { if (algo !== selectedAlgo) e.currentTarget.style.backgroundColor = 'transparent'; }}
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
                          type="range" min="50" max="1000"
                          value={1050 - speed}
                          onChange={e => setSpeed(1050 - Number(e.target.value))}
                          className="w-20 h-1 rounded-full appearance-none cursor-pointer"
                          style={{ backgroundColor: '#202724', accentColor: '#b5fe00' }}
                        />
                        <span className="text-[8px]" style={{ color: '#a7aca9' }}>Slow</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="flex items-center gap-2" style={{ color: '#a7aca9' }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: isPlaying ? '#68fcbf' : isFinished ? '#b5fe00' : '#a7aca9' }}></span>
                    {isPlaying ? 'Simulation in progress...' : isFinished ? 'Sorting complete!' : 'Ready to simulate'}
                  </p>
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
  
</div>
            </div>

            {/* Bars */}
            <div className="flex-1 flex items-end justify-between gap-1 w-full">
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
                      border: highlightedIndices.includes(idx) ? '1px solid #b5fe00' : '1px solid rgba(104, 252, 191, 0.1)'
                    }}
                  >
                    <div 
                      className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-mono font-bold whitespace-nowrap transition-opacity"
                      style={{ 
                        color: highlightedIndices.includes(idx) ? '#b5fe00' : '#e8fff8',
                        opacity: 0.9
                      }}
                    >
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Info Section */}
          <section className="rounded-lg p-6 flex flex-col gap-4" style={{
            background: 'rgba(10, 15, 13, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(182, 255, 0, 0.1)'
          }}>
            <button onClick={() => setIsDescOpen(!isDescOpen)} className="flex justify-between items-center cursor-pointer w-full">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ color: '#e9ffbd' }}>info</span>
                <h3 className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>{selectedAlgo} Breakdown</h3>
              </div>
              <span className="material-symbols-outlined transition-transform">{isDescOpen ? 'expand_less' : 'expand_more'}</span>
            </button>
            {isDescOpen && (
              <div className="grid grid-cols-3 gap-8 mt-2">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: '#a7aca9' }}>Efficiency</p>
                  <p className="text-2xl font-bold" style={{ color: info.effColor, fontFamily: 'Space Grotesk' }}>{info.efficiency}</p>
                  <p className="text-xs" style={{ color: '#a7aca9' }}>Time complexity across cases.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: '#a7aca9' }}>Space Needs</p>
                  <p className="text-2xl font-bold" style={{ color: info.spaceColor, fontFamily: 'Space Grotesk' }}>{info.space}</p>
                  <p className="text-xs" style={{ color: '#a7aca9' }}>Auxiliary space required.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: '#a7aca9' }}>Stability</p>
                  <p className="text-2xl font-bold" style={{ color: '#f9fdf9', fontFamily: 'Space Grotesk' }}>{info.stability}</p>
                  <p className="text-xs" style={{ color: '#a7aca9' }}>
                    {info.stability === 'Stable' ? 'Preserves relative order of equal elements.' : 'May not preserve equal element order.'}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column – Code Editor */}
        <section className="col-span-4 h-full rounded-lg flex flex-col overflow-hidden" style={{
          background: 'rgba(10, 15, 13, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(182, 255, 0, 0.1)'
        }}>
          <div className="px-4 py-3 flex justify-between items-center" style={{ backgroundColor: '#151b18', borderBottom: '1px solid rgba(68, 73, 70, 0.2)' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff7351', opacity: 0.4 }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFD700', opacity: 0.4 }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#68fcbf', opacity: 0.4 }}></div>
            </div>

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(p => !p)}
                className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded border transition-colors hover:opacity-80"
                style={{ backgroundColor: '#1a211e', borderColor: 'rgba(68, 73, 70, 0.3)', color: '#e8fff8' }}
              >
                {algoShortName(selectedAlgo)}
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 rounded-xl overflow-hidden z-50 min-w-[160px]" style={{
                  backgroundColor: '#151b18',
                  border: '1px solid rgba(182,255,0,0.15)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}>
                  {Object.entries(FILE_LABELS).map(([lang, meta]) => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLang(lang); setLangDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-mono flex items-center justify-between gap-3 transition-colors"
                      style={{
                        color: lang === selectedLang ? '#b5fe00' : '#e8fff8',
                        backgroundColor: lang === selectedLang ? 'rgba(182,255,0,0.08)' : 'transparent'
                      }}
                      onMouseEnter={e => { if (lang !== selectedLang) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                      onMouseLeave={e => { if (lang !== selectedLang) e.currentTarget.style.backgroundColor = 'transparent'; }}
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
              {codeLines.map((line) => <CodeLine key={line.line} line={line} />)}
            </div>
          </div>

          <div className="p-4" style={{ backgroundColor: 'rgba(26, 33, 30, 0.3)', borderTop: '1px solid rgba(68, 73, 70, 0.2)' }}>
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

export default SortingPage;