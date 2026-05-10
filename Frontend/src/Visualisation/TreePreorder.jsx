import React, { useState, useCallback, useEffect, useRef } from 'react';

const TreePreorder = () => {
  // TreeNode class definition
  class TreeNode {
    constructor(value, x = 0, y = 0) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.x = x;
      this.y = y;
      this.id = `${value}_${Date.now()}_${Math.random()}`;
    }
  }

  // State for the simulation
  const [root, setRoot] = useState(null);
  const [traversalResult, setTraversalResult] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [traversalSpeed, setTraversalSpeed] = useState(500);
  const [isTraversalPlaying, setIsTraversalPlaying] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState('');
  const [arrayValues, setArrayValues] = useState([50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85]);
  const [isPaused, setIsPaused] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isInstantBuild, setIsInstantBuild] = useState(true);
  
  const stopTraversalRef = useRef(false);
  const pauseTraversalRef = useRef(false);
  const canvasContainerRef = useRef(null);
  const popupCanvasRef = useRef(null);
  
  // Canvas dimensions and layout
  const canvasWidth = 1000;
  const canvasHeight = 500;
  const nodeRadius = 30;
  const levelHeight = 80;

  // Helper to insert value into BST
  const insertIntoBST = useCallback((node, value, level = 0, offset = 0, parentX = canvasWidth / 2, width = canvasWidth) => {
    if (!node) {
      const newNode = new TreeNode(value);
      const levelWidth = width / Math.pow(2, level);
      const x = parentX + offset * levelWidth;
      const y = 60 + level * levelHeight;
      newNode.x = Math.max(nodeRadius + 10, Math.min(canvasWidth - nodeRadius - 10, x));
      newNode.y = y;
      return newNode;
    }
    
    if (value < node.value) {
      node.left = insertIntoBST(node.left, value, level + 1, -0.5, node.x, width);
    } else {
      node.right = insertIntoBST(node.right, value, level + 1, 0.5, node.x, width);
    }
    return node;
  }, [canvasWidth, levelHeight, nodeRadius]);

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const length = Math.floor(Math.random() * 12) + 8;
    const randomArr = [];
    for (let i = 0; i < length; i++) {
      randomArr.push(Math.floor(Math.random() * 90) + 10);
    }
    const uniqueArr = [...new Set(randomArr)];
    setArrayValues(uniqueArr);
    setCustomArrayInput(uniqueArr.join(', '));
    setRoot(null);
    setTraversalResult([]);
    setCurrentStep(-1);
    stopTraversalRef.current = true;
    setIsTraversalPlaying(false);
    setIsPlaying(false);
    setIsPaused(false);
    setLastAction(`Random array generated: [${uniqueArr.join(', ')}]. Click Build Tree.`);
  }, []);

  // Build complete tree from array
  const buildCompleteTree = useCallback((arr) => {
    let newRoot = null;
    for (let i = 0; i < arr.length; i++) {
      if (!newRoot) {
        newRoot = new TreeNode(arr[i]);
        newRoot.x = canvasWidth / 2;
        newRoot.y = 60;
      } else {
        newRoot = insertIntoBST(newRoot, arr[i], 0, 0, canvasWidth / 2, canvasWidth);
      }
    }
    return newRoot;
  }, [canvasWidth, insertIntoBST]);

  // Build tree step by step
  const buildTreeStepByStep = useCallback(async () => {
    stopTraversalRef.current = true;
    setIsTraversalPlaying(false);
    setIsPlaying(false);
    setIsPaused(false);
    setIsBuilding(true);
    setTraversalResult([]);
    setCurrentStep(-1);
    setRoot(null);
    setLastAction('Building BST from array...');
    setIsInstantBuild(false);
    
    for (let i = 0; i < arrayValues.length; i++) {
      const val = arrayValues[i];
      setLastAction(`Inserting ${val} into BST...`);
      setHighlightedNodeId(`array_${i}`);
      
      await new Promise(resolve => setTimeout(resolve, 350));
      
      setRoot(prevRoot => {
        if (!prevRoot) {
          const newRoot = new TreeNode(val);
          newRoot.x = canvasWidth / 2;
          newRoot.y = 60;
          return newRoot;
        }
        return insertIntoBST(prevRoot, val, 0, 0, canvasWidth / 2, canvasWidth);
      });
      
      setLastAction(`Inserted ${val} ✓`);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    setHighlightedNodeId(null);
    setLastAction('BST construction complete! Ready for traversal');
    setIsBuilding(false);
    setIsInstantBuild(true);
  }, [arrayValues, canvasWidth, insertIntoBST]);

  // Preorder traversal with animation (Root → Left → Right)
  const preorderTraversalAnimated = useCallback(async (node, result = [], onProgress) => {
    if (!node || stopTraversalRef.current) return result;
    
    while (pauseTraversalRef.current && !stopTraversalRef.current) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (stopTraversalRef.current) return result;
    
    result.push(node.value);
    onProgress(node, 'added', result.length - 1);
    await new Promise(resolve => setTimeout(resolve, traversalSpeed));
    
    if (stopTraversalRef.current) return result;
    
    await preorderTraversalAnimated(node.left, result, onProgress);
    
    if (stopTraversalRef.current) return result;
    
    await preorderTraversalAnimated(node.right, result, onProgress);
    
    return result;
  }, [traversalSpeed]);

  // Start traversal
  const startTraversal = useCallback(async () => {
    if (!root) {
      setLastAction('Please build the tree first!');
      return;
    }
    
    stopTraversalRef.current = false;
    pauseTraversalRef.current = false;
    setIsTraversalPlaying(true);
    setIsPlaying(true);
    setIsPaused(false);
    setTraversalResult([]);
    setCurrentStep(-1);
    
    setLastAction(`Starting Preorder Traversal (Root → Left → Right)...`);
    
    const result = [];
    
    await preorderTraversalAnimated(root, result, (node, action, index) => {
      if (action === 'added') {
        setTraversalResult([...result]);
        setCurrentStep(index);
        setLastAction(`Visited node: ${node.value}`);
        setHighlightedNodeId(node.id);
        setTimeout(() => {
          if (!stopTraversalRef.current && !pauseTraversalRef.current) {
            setHighlightedNodeId(null);
          }
        }, traversalSpeed / 2);
      }
    });
    
    if (!stopTraversalRef.current && !pauseTraversalRef.current) {
      setLastAction('Preorder Traversal Complete!');
      setHighlightedNodeId(null);
      setIsTraversalPlaying(false);
      setIsPlaying(false);
    } else if (pauseTraversalRef.current) {
      setLastAction('Traversal paused. Click Resume to continue.');
    } else {
      setLastAction('Traversal stopped.');
      setIsTraversalPlaying(false);
      setIsPlaying(false);
    }
  }, [root, preorderTraversalAnimated, traversalSpeed]);

  // Pause traversal
  const pauseTraversal = useCallback(() => {
    if (isTraversalPlaying && !pauseTraversalRef.current) {
      pauseTraversalRef.current = true;
      setIsPaused(true);
      setIsTraversalPlaying(false);
      setLastAction('Traversal paused. Click Resume to continue.');
    }
  }, [isTraversalPlaying]);

  // Resume traversal
  const resumeTraversal = useCallback(() => {
    if (pauseTraversalRef.current && !stopTraversalRef.current) {
      pauseTraversalRef.current = false;
      setIsPaused(false);
      setIsTraversalPlaying(true);
      setLastAction('Resuming traversal...');
      startTraversal();
    }
  }, [startTraversal]);

  // Stop traversal
  const stopTraversal = useCallback(() => {
    stopTraversalRef.current = true;
    pauseTraversalRef.current = false;
    setIsTraversalPlaying(false);
    setIsPlaying(false);
    setIsPaused(false);
    setLastAction('Traversal stopped by user.');
    setHighlightedNodeId(null);
  }, []);

  // Reset everything
  const handleReset = useCallback(() => {
    stopTraversalRef.current = true;
    pauseTraversalRef.current = false;
    setIsTraversalPlaying(false);
    setIsPlaying(false);
    setIsPaused(false);
    setIsBuilding(false);
    setRoot(null);
    setTraversalResult([]);
    setCurrentStep(-1);
    setHighlightedNodeId(null);
    setLastAction('Reset complete. Click "Build Tree" to start over.');
  }, []);

  // Build tree instantly
  const buildTreeInstant = useCallback(() => {
    stopTraversalRef.current = true;
    setIsTraversalPlaying(false);
    setIsPlaying(false);
    setIsPaused(false);
    const newRoot = buildCompleteTree(arrayValues);
    setRoot(newRoot);
    setTraversalResult([]);
    setCurrentStep(-1);
    setHighlightedNodeId(null);
    setLastAction('Tree built instantly! Click Start Traversal.');
    setIsInstantBuild(true);
  }, [arrayValues, buildCompleteTree]);

  // Apply custom array
  const applyCustomArray = useCallback(() => {
    if (!customArrayInput.trim()) {
      setLastAction('Please enter comma-separated numbers');
      return;
    }
    
    const parsedArray = customArrayInput.split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));
    
    if (parsedArray.length === 0) {
      setLastAction('Invalid array. Please enter numbers separated by commas.');
      return;
    }
    
    const uniqueArr = [...new Set(parsedArray)];
    stopTraversalRef.current = true;
    setIsTraversalPlaying(false);
    setIsPlaying(false);
    setIsPaused(false);
    setArrayValues(uniqueArr);
    setRoot(null);
    setTraversalResult([]);
    setCurrentStep(-1);
    setLastAction(`Custom array loaded: [${uniqueArr.join(', ')}]. Click Build Tree.`);
  }, [customArrayInput]);

  // Use default array
  const useDefaultArray = useCallback(() => {
    const defaultArr = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
    setArrayValues(defaultArr);
    setCustomArrayInput(defaultArr.join(', '));
    setRoot(null);
    setTraversalResult([]);
    setCurrentStep(-1);
    stopTraversalRef.current = true;
    setIsTraversalPlaying(false);
    setIsPlaying(false);
    setIsPaused(false);
    setLastAction('Default array loaded. Click Build Tree.');
  }, []);

  // Auto-build on mount
  useEffect(() => {
    setTimeout(() => {
      buildTreeInstant();
    }, 500);
  }, []);

  // Draw tree on canvas
  const drawTree = useCallback((ctx, node) => {
    if (!node) return;
    
    if (node.left) {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y + nodeRadius);
      ctx.lineTo(node.left.x, node.left.y - nodeRadius);
      ctx.strokeStyle = 'rgba(104, 252, 191, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
      drawTree(ctx, node.left);
    }
    
    if (node.right) {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y + nodeRadius);
      ctx.lineTo(node.right.x, node.right.y - nodeRadius);
      ctx.strokeStyle = 'rgba(104, 252, 191, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
      drawTree(ctx, node.right);
    }
    
    const isHighlighted = highlightedNodeId === node.id;
    const isVisited = traversalResult.includes(node.value);
    const isCurrent = traversalResult[traversalResult.length - 1] === node.value && isTraversalPlaying;
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    
    if (isHighlighted || isCurrent) {
      ctx.fillStyle = '#68fcbf';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#68fcbf';
    } else if (isVisited) {
      ctx.fillStyle = '#b5fe00';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#b5fe00';
    } else {
      ctx.fillStyle = '#1a211e';
      ctx.shadowBlur = 0;
    }
    ctx.fill();
    
    ctx.strokeStyle = isHighlighted || isCurrent ? '#68fcbf' : 'rgba(104, 252, 191, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = '#f9fdf9';
    ctx.font = `bold ${nodeRadius - 10}px 'Inter'`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.value.toString(), node.x, node.y);
    
    ctx.shadowBlur = 0;
  }, [highlightedNodeId, traversalResult, isTraversalPlaying, nodeRadius]);

  // Canvas effect
  useEffect(() => {
    const canvas = document.getElementById('tree-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(104, 252, 191, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvasWidth; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasHeight);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvasWidth, i);
      ctx.stroke();
    }
    
    if (root) {
      drawTree(ctx, root);
    }
  }, [root, drawTree, canvasWidth, canvasHeight]);

  // Draw popup tree
  useEffect(() => {
    if (!isPopupOpen || !popupCanvasRef.current) return;
    const canvas = popupCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const popupWidth = 900;
    const popupHeight = 600;
    canvas.width = popupWidth;
    canvas.height = popupHeight;
    
    ctx.clearRect(0, 0, popupWidth, popupHeight);
    
    // Helper to reposition nodes for popup
    const repositionNodes = (node, level = 0, offset = 0, parentX = popupWidth / 2, width = popupWidth) => {
      if (!node) return;
      const levelWidth = width / Math.pow(2, level);
      const x = parentX + offset * levelWidth;
      const y = 50 + level * 80;
      node.popupX = Math.max(35, Math.min(popupWidth - 35, x));
      node.popupY = y;
      
      if (node.left) {
        repositionNodes(node.left, level + 1, -0.5, x, width);
      }
      if (node.right) {
        repositionNodes(node.right, level + 1, 0.5, x, width);
      }
    };
    
    if (root) {
      repositionNodes(root);
      
      const drawPopupTree = (node) => {
        if (!node) return;
        
        if (node.left) {
          ctx.beginPath();
          ctx.moveTo(node.popupX, node.popupY + nodeRadius);
          ctx.lineTo(node.left.popupX, node.left.popupY - nodeRadius);
          ctx.strokeStyle = 'rgba(104, 252, 191, 0.5)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
          drawPopupTree(node.left);
        }
        
        if (node.right) {
          ctx.beginPath();
          ctx.moveTo(node.popupX, node.popupY + nodeRadius);
          ctx.lineTo(node.right.popupX, node.right.popupY - nodeRadius);
          ctx.strokeStyle = 'rgba(104, 252, 191, 0.5)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
          drawPopupTree(node.right);
        }
        
        const isHighlighted = highlightedNodeId === node.id;
        const isVisited = traversalResult.includes(node.value);
        
        ctx.beginPath();
        ctx.arc(node.popupX, node.popupY, nodeRadius, 0, 2 * Math.PI);
        
        if (isHighlighted) {
          ctx.fillStyle = '#68fcbf';
          ctx.shadowBlur = 25;
          ctx.shadowColor = '#68fcbf';
        } else if (isVisited) {
          ctx.fillStyle = '#b5fe00';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#b5fe00';
        } else {
          ctx.fillStyle = '#1a211e';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        
        ctx.strokeStyle = isHighlighted ? '#68fcbf' : 'rgba(104, 252, 191, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        
        ctx.fillStyle = '#f9fdf9';
        ctx.font = `bold ${nodeRadius - 10}px 'Inter'`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value.toString(), node.popupX, node.popupY);
        
        ctx.shadowBlur = 0;
      };
      
      drawPopupTree(root);
    }
  }, [root, highlightedNodeId, traversalResult, isPopupOpen, nodeRadius]);

  return (
    <div className="p-6 text-white h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#68fcbf', fontFamily: 'Space Grotesk' }}>
          Binary Tree - Preorder Traversal
        </h1>
        <p className="text-sm" style={{ color: '#E8FFF8', opacity: 0.7 }}>
          Root → Left → Right (used for tree copying / serialization)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Controls */}
        <div className="lg:col-span-1 space-y-4">
          {/* Array Input Section */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#68fcbf' }}>
              Array Input
            </h3>
            <input
              type="text"
              value={customArrayInput}
              onChange={(e) => setCustomArrayInput(e.target.value)}
              placeholder="e.g., 50, 30, 70, 20, 40"
              className="w-full bg-[#1a211e] border border-[rgba(104,252,191,0.3)] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#68fcbf] transition-all mb-2"
            />
            <div className="flex gap-2 mb-2">
              <button
                onClick={applyCustomArray}
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#68fcbf] text-[#005e40] text-xs font-bold hover:scale-105 transition-all"
              >
                Apply
              </button>
              <button
                onClick={useDefaultArray}
                className="flex-1 px-3 py-1.5 rounded-lg border border-[rgba(104,252,191,0.3)] text-xs hover:border-[#68fcbf] hover:text-[#68fcbf] transition-all"
              >
                Default
              </button>
            </div>
            <button
              onClick={generateRandomArray}
              className="w-full px-3 py-1.5 rounded-lg bg-[#b5fe00]/20 text-[#b5fe00] text-xs font-bold hover:bg-[#b5fe00]/30 hover:scale-105 transition-all"
            >
              🎲 Generate Random
            </button>
          </div>

          {/* Tree Controls */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#68fcbf' }}>
              Tree Controls
            </h3>
            <div className="space-y-2">
              <button
                onClick={buildTreeStepByStep}
                disabled={isBuilding || isTraversalPlaying}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#68fcbf] text-[#005e40] text-sm font-bold hover:scale-105 transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">construction</span>
                Build Step by Step
              </button>
              <button
                onClick={buildTreeInstant}
                disabled={isBuilding || isTraversalPlaying}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#b5fe00] text-[#476700] text-sm font-bold hover:scale-105 transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">bolt</span>
                Build Instant
              </button>
              <button
                onClick={handleReset}
                disabled={isTraversalPlaying}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#1a211e] border border-[rgba(104,252,191,0.3)] text-sm hover:border-[#68fcbf] transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">replay</span>
                Reset
              </button>
            </div>
          </div>

          {/* Traversal Controls */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#68fcbf' }}>
              Traversal Controls
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-gray-400">Speed:</span>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={traversalSpeed}
                  onChange={(e) => setTraversalSpeed(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs text-[#68fcbf] font-mono">{traversalSpeed}ms</span>
              </div>
              
              <div className="flex gap-2">
                {!isTraversalPlaying && !isPaused ? (
                  <button
                    onClick={startTraversal}
                    disabled={!root || isBuilding}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#68fcbf] text-[#005e40] text-sm font-bold hover:scale-105 transition-all disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-base">play_arrow</span>
                    Start
                  </button>
                ) : isPaused ? (
                  <button
                    onClick={resumeTraversal}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#68fcbf] text-[#005e40] text-sm font-bold hover:scale-105 transition-all"
                  >
                    <span className="material-symbols-outlined text-base">play_circle</span>
                    Resume
                  </button>
                ) : (
                  <button
                    onClick={pauseTraversal}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#ffbd2e] text-[#476700] text-sm font-bold hover:scale-105 transition-all"
                  >
                    <span className="material-symbols-outlined text-base">pause</span>
                    Pause
                  </button>
                )}
                
                <button
                  onClick={stopTraversal}
                  disabled={!isTraversalPlaying && !isPaused}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#ff7351] text-white text-sm font-bold hover:scale-105 transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">stop</span>
                  Stop
                </button>
              </div>
            </div>
          </div>

          {/* View in Popup Button */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#68fcbf]/10 border-2 border-[#68fcbf] text-[#68fcbf] text-sm font-bold hover:bg-[#68fcbf]/20 transition-all"
          >
            <span className="material-symbols-outlined">open_in_full</span>
            View Tree in Popup
          </button>
        </div>

        {/* Right Column - Visualization */}
        <div className="lg:col-span-3">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(104, 252, 191, 0.03)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <div className="p-3 border-b border-[rgba(104,252,191,0.1)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#68fcbf' }}>Tree Visualization</span>
                <span className="text-xs text-gray-400">{lastAction}</span>
              </div>
            </div>
            <div 
              ref={canvasContainerRef}
              className="w-full overflow-auto"
              style={{ height: '500px', cursor: isTraversalPlaying ? 'wait' : 'default' }}
            >
              <canvas
                id="tree-canvas"
                width={canvasWidth}
                height={canvasHeight}
                className="min-w-[1000px] min-h-[500px]"
                style={{ background: 'transparent' }}
              />
            </div>
          </div>

          {/* Traversal Result */}
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.2)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#68fcbf' }}>
              Preorder Traversal Result
            </h3>
            <div className="flex gap-2 flex-wrap">
              {traversalResult.map((val, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    idx === currentStep
                      ? 'bg-[#68fcbf] text-[#005e40] scale-110 shadow-lg shadow-[#68fcbf]/50'
                      : 'bg-[#b5fe00] text-[#476700]'
                  }`}
                >
                  {val}
                </div>
              ))}
              {traversalResult.length === 0 && (
                <div className="text-sm text-gray-400 italic">Click "Start" to begin preorder traversal...</div>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.1)' }}>
              <span className="text-[10px] font-bold uppercase text-gray-400">Time Complexity</span>
              <div className="text-xl font-bold text-[#68fcbf] mt-1">O(n)</div>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.1)' }}>
              <span className="text-[10px] font-bold uppercase text-gray-400">Space Complexity</span>
              <div className="text-xl font-bold text-[#b5fe00] mt-1">O(h)</div>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(104, 252, 191, 0.05)', border: '1px solid rgba(104, 252, 191, 0.1)' }}>
              <span className="text-[10px] font-bold uppercase text-gray-400">Pattern</span>
              <div className="text-sm font-bold text-white mt-1">Root → Left → Right</div>
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
                <h2 className="text-xl font-bold" style={{ color: '#68fcbf', fontFamily: 'Space Grotesk' }}>Binary Search Tree - Preorder Traversal</h2>
                <p className="text-xs text-gray-400 mt-1">Root → Left → Right (Tree Copying / Serialization)</p>
              </div>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-2 rounded-lg hover:bg-[rgba(104,252,191,0.1)] transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            
            <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
              <canvas
                ref={popupCanvasRef}
                width={900}
                height={600}
                className="w-full"
                style={{ background: 'radial-gradient(#1a211e 1px, transparent 1px)', backgroundSize: '40px 40px' }}
              />
            </div>
            
            <div className="mt-4 pt-3 border-t border-[rgba(104,252,191,0.2)]">
              <div className="flex gap-2 flex-wrap">
                {traversalResult.map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                      idx === currentStep
                        ? 'bg-[#68fcbf] text-[#005e40] scale-110 shadow-lg shadow-[#68fcbf]/50'
                        : 'bg-[#b5fe00] text-[#476700]'
                    }`}
                  >
                    {val}
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

export default TreePreorder;