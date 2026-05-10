import React, { useState, useCallback, useEffect, useRef } from 'react';

const MaxHeap = () => {
  // State for the simulation
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [lastAction, setLastAction] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const stopAnimationRef = useRef(false);
  const pauseAnimationRef = useRef(false);
  const canvasRef = useRef(null);
  const popupCanvasRef = useRef(null);
  
  // Canvas dimensions
  const canvasWidth = 900;
  const canvasHeight = 400;
  const nodeRadius = 30;
  const levelHeight = 80;

  // Heap operations
  const getParentIndex = (i) => Math.floor((i - 1) / 2);
  const getLeftChildIndex = (i) => 2 * i + 1;
  const getRightChildIndex = (i) => 2 * i + 2;

  // Max Heap bubble up
  const bubbleUpMax = useCallback(async (heapArray, index, onProgress) => {
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = getParentIndex(currentIndex);
      if (heapArray[currentIndex] > heapArray[parentIndex]) {
        [heapArray[currentIndex], heapArray[parentIndex]] = [heapArray[parentIndex], heapArray[currentIndex]];
        onProgress([...heapArray], parentIndex, currentIndex);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
    return heapArray;
  }, [animationSpeed]);

  // Max Heap bubble down
  const bubbleDownMax = useCallback(async (heapArray, index, onProgress) => {
    let currentIndex = index;
    const size = heapArray.length;
    
    while (true) {
      let largestIndex = currentIndex;
      const leftIndex = getLeftChildIndex(currentIndex);
      const rightIndex = getRightChildIndex(currentIndex);
      
      if (leftIndex < size && heapArray[leftIndex] > heapArray[largestIndex]) {
        largestIndex = leftIndex;
      }
      if (rightIndex < size && heapArray[rightIndex] > heapArray[largestIndex]) {
        largestIndex = rightIndex;
      }
      
      if (largestIndex !== currentIndex) {
        [heapArray[currentIndex], heapArray[largestIndex]] = [heapArray[largestIndex], heapArray[currentIndex]];
        onProgress([...heapArray], largestIndex, currentIndex);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        currentIndex = largestIndex;
      } else {
        break;
      }
    }
    return heapArray;
  }, [animationSpeed]);

  // Insert into heap
  const insertValue = useCallback(async () => {
    if (!inputValue.trim()) {
      setLastAction('Please enter a value to insert');
      return;
    }
    
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setLastAction('Please enter a valid number');
      return;
    }
    
    stopAnimationRef.current = true;
    pauseAnimationRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    
    setLastAction(`Inserting ${value} into Max Heap...`);
    
    const newHeap = [...heap, value];
    setHeap(newHeap);
    setHighlightedIndex(newHeap.length - 1);
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed / 2));
    
    const finalHeap = await bubbleUpMax(newHeap, newHeap.length - 1, (updatedHeap, parentIdx, childIdx) => {
      setHeap([...updatedHeap]);
      setHighlightedIndex(parentIdx);
    });
    
    setHeap([...finalHeap]);
    setHighlightedIndex(null);
    setInputValue('');
    setLastAction(`Inserted ${value} successfully! Maximum is now ${finalHeap[0]}`);
    
    stopAnimationRef.current = false;
  }, [inputValue, heap, animationSpeed, bubbleUpMax]);

  // Extract max
  const extractMax = useCallback(async () => {
    if (heap.length === 0) {
      setLastAction('Heap is empty!');
      return;
    }
    
    stopAnimationRef.current = true;
    pauseAnimationRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    
    const maxValue = heap[0];
    setLastAction(`Extracting maximum value ${maxValue} from Max Heap...`);
    
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    setHeap([...newHeap]);
    setHighlightedIndex(0);
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    
    if (newHeap.length > 0) {
      const finalHeap = await bubbleDownMax(newHeap, 0, (updatedHeap, swapIdx, currentIdx) => {
        setHeap([...updatedHeap]);
        setHighlightedIndex(swapIdx);
      });
      setHeap([...finalHeap]);
    }
    
    setHighlightedIndex(null);
    setLastAction(`Extracted ${maxValue}! New maximum is ${newHeap[0] || 'none'}`);
    
    stopAnimationRef.current = false;
  }, [heap, animationSpeed, bubbleDownMax]);

  // Build heap from array
  const buildHeapFromArray = useCallback(async (arr) => {
    stopAnimationRef.current = true;
    setIsPlaying(false);
    setIsPaused(false);
    setIsBuilding(true);
    
    const newHeap = [...arr];
    setHeap(newHeap);
    setLastAction(`Building Max Heap from array...`);
    
    for (let i = Math.floor(newHeap.length / 2) - 1; i >= 0; i--) {
      if (stopAnimationRef.current) break;
      setHighlightedIndex(i);
      await new Promise(resolve => setTimeout(resolve, animationSpeed / 2));
      await bubbleDownMax(newHeap, i, (updatedHeap, swapIdx, currentIdx) => {
        setHeap([...updatedHeap]);
        setHighlightedIndex(swapIdx);
      });
    }
    
    setHighlightedIndex(null);
    setLastAction(`Max Heap built successfully! Maximum is ${newHeap[0]}`);
    setIsBuilding(false);
    stopAnimationRef.current = false;
  }, [animationSpeed, bubbleDownMax]);

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const length = Math.floor(Math.random() * 10) + 5;
    const randomArr = [];
    for (let i = 0; i < length; i++) {
      randomArr.push(Math.floor(Math.random() * 90) + 10);
    }
    buildHeapFromArray(randomArr);
  }, [buildHeapFromArray]);

  // Use default array
  const useDefaultArray = useCallback(() => {
    const defaultArr = [50, 30, 70, 20, 40, 60, 80];
    buildHeapFromArray(defaultArr);
  }, [buildHeapFromArray]);

  // Clear heap
  const clearHeap = useCallback(() => {
    stopAnimationRef.current = true;
    pauseAnimationRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    setHeap([]);
    setHighlightedIndex(null);
    setLastAction('Heap cleared. Add elements or build from array.');
  }, []);

  // Draw heap tree on canvas
  const drawHeap = useCallback((ctx, heapArray, width, height) => {
    ctx.clearRect(0, 0, width, height);
    
    if (heapArray.length === 0) {
      ctx.fillStyle = '#E8FFF8';
      ctx.font = '14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Heap is empty. Add elements to visualize.', width / 2, height / 2);
      return;
    }
    
    const calculatePositions = (index, level = 0, offset = 0, parentX = width / 2, spacing = width) => {
      if (index >= heapArray.length) return null;
      
      const levelWidth = spacing / Math.pow(2, level);
      const x = parentX + offset * levelWidth;
      const y = 60 + level * levelHeight;
      
      return {
        x: Math.max(nodeRadius + 10, Math.min(width - nodeRadius - 10, x)),
        y: y,
        left: calculatePositions(getLeftChildIndex(index), level + 1, -0.5, x, spacing),
        right: calculatePositions(getRightChildIndex(index), level + 1, 0.5, x, spacing)
      };
    };
    
    const positions = calculatePositions(0);
    
    const drawEdges = (node) => {
      if (!node) return;
      if (node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y + nodeRadius);
        ctx.lineTo(node.left.x, node.left.y - nodeRadius);
        ctx.strokeStyle = 'rgba(104, 252, 191, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        drawEdges(node.left);
      }
      if (node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y + nodeRadius);
        ctx.lineTo(node.right.x, node.right.y - nodeRadius);
        ctx.strokeStyle = 'rgba(104, 252, 191, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        drawEdges(node.right);
      }
    };
    
    const drawNodes = (node, idx = 0) => {
      if (!node) return;
      
      const isHighlighted = highlightedIndex === idx;
      const value = heapArray[idx];
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
      
      if (isHighlighted) {
        ctx.fillStyle = '#b5fe00';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#b5fe00';
      } else if (idx === 0) {
        ctx.fillStyle = '#68fcbf';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#68fcbf';
      } else {
        ctx.fillStyle = '#1a211e';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      
      ctx.strokeStyle = isHighlighted || idx === 0 ? '#b5fe00' : 'rgba(104, 252, 191, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      ctx.fillStyle = '#f9fdf9';
      ctx.font = `bold ${nodeRadius - 10}px 'Inter'`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), node.x, node.y);
      
      ctx.shadowBlur = 0;
      
      drawNodes(node.left, getLeftChildIndex(idx));
      drawNodes(node.right, getRightChildIndex(idx));
    };
    
    drawEdges(positions);
    drawNodes(positions);
  }, [highlightedIndex, nodeRadius, levelHeight]);

  // Canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawHeap(ctx, heap, canvasWidth, canvasHeight);
  }, [heap, drawHeap, canvasWidth, canvasHeight]);

  // Popup effect
  useEffect(() => {
    if (!isPopupOpen || !popupCanvasRef.current) return;
    const canvas = popupCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const popupWidth = 900;
    const popupHeight = 500;
    canvas.width = popupWidth;
    canvas.height = popupHeight;
    
    drawHeap(ctx, heap, popupWidth, popupHeight);
  }, [isPopupOpen, heap, drawHeap]);

  return (
    <div className="p-6 text-white h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#68fcbf', fontFamily: 'Space Grotesk' }}>
            Max Heap Visualizer
          </h1>
          <p className="text-sm" style={{ color: '#E8FFF8', opacity: 0.7 }}>
            Parent ≥ Children (Largest at root)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Controls */}
        <div className="lg:col-span-1 space-y-4">
          {/* Insert Section */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#68fcbf' }}>
              Insert Value
            </h3>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter number"
                className="flex-1 bg-[#1a211e] border border-[rgba(104,252,191,0.3)] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#68fcbf] transition-all"
              />
              <button
                onClick={insertValue}
                disabled={isBuilding}
                className="px-4 py-2 rounded-lg bg-[#68fcbf] text-[#005e40] text-sm font-bold hover:scale-105 transition-all disabled:opacity-50"
              >
                Insert
              </button>
            </div>
          </div>

          {/* Heap Controls */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#68fcbf' }}>
              Heap Operations
            </h3>
            <div className="space-y-2">
              <button
                onClick={extractMax}
                disabled={heap.length === 0 || isBuilding}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#b5fe00] text-[#476700] text-sm font-bold hover:scale-105 transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">remove_circle</span>
                Extract Max
              </button>
              
              <div className="border-t border-[rgba(104,252,191,0.1)] my-2"></div>
              
              <button
                onClick={useDefaultArray}
                disabled={isBuilding}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#b5fe00]/20 text-[#b5fe00] text-sm font-bold hover:scale-105 transition-all"
              >
                <span className="material-symbols-outlined text-base">settings_backup_restore</span>
                Default Array
              </button>
              
              <button
                onClick={generateRandomArray}
                disabled={isBuilding}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#68fcbf]/20 text-[#68fcbf] text-sm font-bold hover:scale-105 transition-all"
              >
                <span className="material-symbols-outlined text-base">casino</span>
                Random Array
              </button>
              
              <button
                onClick={clearHeap}
                disabled={isBuilding}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#1a211e] border border-[rgba(104,252,191,0.3)] text-sm hover:border-[#68fcbf] transition-all"
              >
                <span className="material-symbols-outlined text-base">delete_sweep</span>
                Clear Heap
              </button>
            </div>
          </div>

          {/* Animation Controls */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#68fcbf' }}>
              Animation Speed
            </h3>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-gray-400">Speed:</span>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-[#68fcbf] font-mono">{animationSpeed}ms</span>
            </div>
          </div>

          {/* Current Maximum */}
          {heap.length > 0 && (
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 189, 46, 0.05)', border: '1px solid rgba(255, 189, 46, 0.2)' }}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#ffbd2e' }}>
                Current Maximum
              </h3>
              <div className="text-2xl font-bold text-[#ffbd2e]">{heap[0]}</div>
            </div>
          )}

          {/* View in Popup Button */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#68fcbf]/10 border-2 border-[#68fcbf] text-[#68fcbf] text-sm font-bold hover:bg-[#68fcbf]/20 transition-all"
          >
            <span className="material-symbols-outlined">open_in_full</span>
            View Heap in Popup
          </button>
        </div>

        {/* Right Column - Visualization */}
        <div className="lg:col-span-3">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(104, 252, 191, 0.03)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <div className="p-3 border-b border-[rgba(104,252,191,0.1)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#68fcbf' }}>Max Heap Visualization</span>
                <span className="text-xs text-gray-400">{lastAction}</span>
              </div>
            </div>
            <div className="w-full overflow-auto" style={{ height: '450px' }}>
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="w-full"
                style={{ background: 'radial-gradient(#1a211e 1px, transparent 1px)', backgroundSize: '40px 40px' }}
              />
            </div>
          </div>

          {/* Heap Array Representation */}
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#68fcbf' }}>
              Heap Array Representation
            </h3>
            <div className="flex gap-2 flex-wrap">
              {heap.map((value, idx) => (
                <div
                  key={idx}
                  className={`min-w-[50px] h-12 rounded-lg flex flex-col items-center justify-center font-bold text-sm transition-all duration-300 ${
                    idx === highlightedIndex
                      ? 'bg-[#68fcbf] text-[#005e40] scale-110 shadow-lg shadow-[#68fcbf]/50'
                      : idx === 0
                      ? 'bg-[#b5fe00] text-[#476700]'
                      : 'bg-[#1a211e] border border-[rgba(104,252,191,0.3)]'
                  }`}
                >
                  <span>{value}</span>
                  <span className="text-[8px] opacity-50">{idx}</span>
                </div>
              ))}
              {heap.length === 0 && (
                <div className="text-sm text-gray-400 italic">Heap is empty. Insert values or build from array...</div>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.1)' }}>
              <span className="text-[10px] font-bold uppercase text-gray-400">Time Complexity</span>
              <div className="text-lg font-bold text-[#68fcbf] mt-1">Insert: O(log n)</div>
              <div className="text-lg font-bold text-[#b5fe00]">Extract: O(log n)</div>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.1)' }}>
              <span className="text-[10px] font-bold uppercase text-gray-400">Space Complexity</span>
              <div className="text-xl font-bold text-[#b5fe00] mt-1">O(n)</div>
              <div className="text-[8px] text-gray-500">n = number of elements</div>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.1)' }}>
              <span className="text-[10px] font-bold uppercase text-gray-400">Applications</span>
              <div className="text-xs font-bold text-white mt-1">Priority Queue</div>
              <div className="text-[8px] text-gray-500">Heap Sort</div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setIsPopupOpen(false)}>
          <div 
            className="relative rounded-2xl p-4 max-w-4xl w-full mx-4"
            style={{ backgroundColor: '#0a0f0d', border: '2px solid rgba(104, 252, 191, 0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(104,252,191,0.2)]">
              <div>
                <h2 className="text-xl font-bold" style={{ color: '#68fcbf', fontFamily: 'Space Grotesk' }}>Max Heap Visualizer</h2>
                <p className="text-xs text-gray-400 mt-1">Parent ≥ Children (Largest at root)</p>
              </div>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-2 rounded-lg hover:bg-[rgba(104,252,191,0.1)] transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            
            <div className="overflow-auto" style={{ maxHeight: '60vh' }}>
              <canvas
                ref={popupCanvasRef}
                width={900}
                height={500}
                className="w-full"
                style={{ background: 'radial-gradient(#1a211e 1px, transparent 1px)', backgroundSize: '40px 40px' }}
              />
            </div>
            
            <div className="mt-4 pt-3 border-t border-[rgba(104,252,191,0.2)]">
              <div className="flex gap-2 flex-wrap">
                {heap.map((value, idx) => (
                  <div
                    key={idx}
                    className={`min-w-[45px] h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                      idx === highlightedIndex
                        ? 'bg-[#68fcbf] text-[#005e40] scale-110'
                        : idx === 0
                        ? 'bg-[#b5fe00] text-[#476700]'
                        : 'bg-[#1a211e] border border-[rgba(104,252,191,0.3)]'
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">{lastAction}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaxHeap;