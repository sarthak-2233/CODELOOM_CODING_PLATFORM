import React, { useState, useCallback } from 'react';

// ========== DOUBLY LINKED LIST DATA STRUCTURE ==========
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
    return newNode;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
    return newNode;
  }

  popFront() {
    if (!this.head) return null;
    const val = this.head.value;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size--;
    return val;
  }

  popBack() {
    if (!this.tail) return null;
    const val = this.tail.value;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;
    return val;
  }

  toArray() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push(current.value);
      current = current.next;
    }
    return nodes;
  }
}

// ========== REACT COMPONENT ==========
const App = () => {
  const [list, setList] = useState(() => {
    const initialList = new DoublyLinkedList();
    initialList.append(12);
    initialList.append(45);
    initialList.append(89);
    return initialList;
  });
  const [activeIndex, setActiveIndex] = useState(1);
  const [message, setMessage] = useState(null);

  const showTemporaryMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 1500);
  };

  const handleAddFront = useCallback(() => {
    const randomVal = Math.floor(Math.random() * 90) + 10;
    list.prepend(randomVal);
    setList(new DoublyLinkedList());
    // Rebuild with same data
    const newList = new DoublyLinkedList();
    let current = list.head;
    while (current) {
      newList.append(current.value);
      current = current.next;
    }
    setList(newList);
    setActiveIndex(0);
    showTemporaryMessage(`Added ${randomVal} at front`);
  }, [list]);

  const handleAddBack = useCallback(() => {
    const randomVal = Math.floor(Math.random() * 90) + 10;
    list.append(randomVal);
    setList(new DoublyLinkedList());
    const newList = new DoublyLinkedList();
    let current = list.head;
    while (current) {
      newList.append(current.value);
      current = current.next;
    }
    setList(newList);
    setActiveIndex(list.size - 1);
    showTemporaryMessage(`Added ${randomVal} at back`);
  }, [list]);

  const handlePopFront = useCallback(() => {
    if (list.size === 0) {
      showTemporaryMessage("List is empty!");
      return;
    }
    const val = list.popFront();
    setList(new DoublyLinkedList());
    const newList = new DoublyLinkedList();
    let current = list.head;
    while (current) {
      newList.append(current.value);
      current = current.next;
    }
    setList(newList);
    setActiveIndex(0);
    showTemporaryMessage(`Removed ${val} from front`);
  }, [list]);

  const handlePopBack = useCallback(() => {
    if (list.size === 0) {
      showTemporaryMessage("List is empty!");
      return;
    }
    const val = list.popBack();
    setList(new DoublyLinkedList());
    const newList = new DoublyLinkedList();
    let current = list.head;
    while (current) {
      newList.append(current.value);
      current = current.next;
    }
    setList(newList);
    setActiveIndex(list.size - 1);
    showTemporaryMessage(`Removed ${val} from back`);
  }, [list]);

  const nodesArray = list.toArray();
  const totalNodes = nodesArray.length;

  return (
    <div className="bg-background text-on-surface font-body min-h-screen relative">
      {/* Background Decoration */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#B6FF00] opacity-[0.02] blur-[150px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#34D399] opacity-[0.02] blur-[120px] -z-10 pointer-events-none"></div>

      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 h-16 w-full border-b border-[#B6FF00]/10 bg-[#0A0F0D]/60 backdrop-blur-xl shadow-[0_0_20px_rgba(182,255,0,0.05)]">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold tracking-tighter text-[#B6FF00] font-headline">LUMEN_DSA</span>
          <nav className="hidden md:flex gap-8 ml-8">
            <a className="font-headline tracking-tight text-[#E8FFF8]/60 hover:text-[#E8FFF8] transition-all duration-300" href="#">Visualizer</a>
            <a className="font-headline tracking-tight text-[#E8FFF8]/60 hover:text-[#E8FFF8] transition-all duration-300" href="#">Sandbox</a>
            <a className="font-headline tracking-tight text-[#E8FFF8]/60 hover:text-[#E8FFF8] transition-all duration-300" href="#">Tutorials</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-[#B6FF00]/10 transition-all text-[#B6FF00]">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-10 w-10 rounded-full border border-[#B6FF00]/30 overflow-hidden">
            <img alt="Developer Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaWkRpCPRSa44FPHwQ1_1gfx416kbjrC8tR51vR7mN-ZufRy-9saoz0s3aYV4cA2Oh9lXoVQBDItu46jp85HB_NqAe2KLOeZGRq5LkbgSErWOELky8wHjem4mIOhvOBZUlcUKEVkmNN2EM1ytj3u66F4WGXWcTe_vO1fF18RkXOFHqhKuRyXwTJaNj-M1GoZGj9K4tq9ag1v2Ha5x31AZ8LYYdbK0rkGfvzNKC1bgL4CtNsPIzCdh1aATTu9dpEvPQQX-rEx2wYVU" />
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-[#B6FF00]/10 bg-[#0A0F0D] flex flex-col justify-between py-6 z-40">
        <div>
          <div className="px-6 mb-8">
            <h2 className="text-[#B6FF00] font-black font-headline text-lg">Algorithm Lab</h2>
            <p className="text-[#E8FFF8]/40 text-xs font-medium tracking-wide">V1.0.4-Alpha</p>
          </div>
          <nav className="space-y-1">
            <div className="text-[#E8FFF8]/40 py-3 px-6 hover:bg-[#B6FF00]/5 hover:text-[#B6FF00] flex items-center gap-3 transition-colors duration-200 cursor-pointer">
              <span className="material-symbols-outlined">view_list</span>
              <span className="font-medium text-sm">Arrays</span>
            </div>
            {/* Linked List Active Section */}
            <div className="bg-gradient-to-r from-[#B6FF00]/20 to-transparent text-[#B6FF00] border-l-4 border-[#B6FF00] py-3 px-6 flex items-center gap-3">
              <span className="material-symbols-outlined">link</span>
              <span className="font-medium text-sm">Linked Lists</span>
            </div>
            <div className="ml-10 space-y-1 mt-1 mb-2">
              <div className="text-[#E8FFF8]/40 py-2 px-4 text-xs hover:text-[#B6FF00] transition-colors cursor-pointer">Singly Linked List</div>
              <div className="text-[#B6FF00] py-2 px-4 text-xs font-bold border-l border-[#B6FF00]/30">Doubly Linked List</div>
            </div>
            <div className="text-[#E8FFF8]/40 py-3 px-6 hover:bg-[#B6FF00]/5 hover:text-[#B6FF00] flex items-center gap-3 transition-colors duration-200 cursor-pointer">
              <span className="material-symbols-outlined">account_tree</span>
              <span className="font-medium text-sm">Trees</span>
            </div>
            <div className="text-[#E8FFF8]/40 py-3 px-6 hover:bg-[#B6FF00]/5 hover:text-[#B6FF00] flex items-center gap-3 transition-colors duration-200 cursor-pointer">
              <span className="material-symbols-outlined">hub</span>
              <span className="font-medium text-sm">Graphs</span>
            </div>
            <div className="text-[#E8FFF8]/40 py-3 px-6 hover:bg-[#B6FF00]/5 hover:text-[#B6FF00] flex items-center gap-3 transition-colors duration-200 cursor-pointer">
              <span className="material-symbols-outlined">sort</span>
              <span className="font-medium text-sm">Sorting</span>
            </div>
            <div className="text-[#E8FFF8]/40 py-3 px-6 hover:bg-[#B6FF00]/5 hover:text-[#B6FF00] flex items-center gap-3 transition-colors duration-200 cursor-pointer">
              <span className="material-symbols-outlined">refresh</span>
              <span className="font-medium text-sm">Recursion</span>
            </div>
          </nav>
        </div>
        <div className="px-6 space-y-4">
          <button className="w-full bg-[#B6FF00] text-[#476700] py-3 rounded-full font-bold font-headline text-sm tracking-tight active:scale-95 duration-100 neo-glow shadow-[0_0_15px_rgba(182,255,0,0.15)]">
            Deploy Code
          </button>
          <div className="pt-4 border-t border-[#B6FF00]/10 flex flex-col gap-2">
            <div className="flex items-center gap-3 text-[#E8FFF8]/40 text-sm py-2 hover:text-[#E8FFF8] cursor-pointer">
              <span className="material-symbols-outlined">menu_book</span>
              <span>Docs</span>
            </div>
            <div className="flex items-center gap-3 text-[#E8FFF8]/40 text-sm py-2 hover:text-[#E8FFF8] cursor-pointer">
              <span className="material-symbols-outlined">contact_support</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 mt-16 p-8 min-h-screen bg-background grid grid-cols-12 gap-8">
        {/* Visualization Panel */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-8 gap-y-6">
          <div className="relative bg-[rgba(21,27,24,0.6)] backdrop-blur-[20px] rounded-lg p-8 h-[500px] border border-[#B6FF00]/5 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h3 className="text-xl font-headline font-semibold text-on-surface">Live Visualization</h3>
                <p className="text-on-surface-variant text-sm">Active Structure: DoublyLinkedList()</p>
              </div>
              <div className="flex gap-3">
                <button onClick={handleAddFront} className="px-6 py-2 rounded-full border border-[#B6FF00]/20 text-[#B6FF00] text-sm font-semibold hover:bg-[#B6FF00]/10 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">add</span> Add Node
                </button>
                <button onClick={handlePopBack} className="px-6 py-2 rounded-full border border-error/20 text-error text-sm font-semibold hover:bg-error/10 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">remove</span> Pop Node
                </button>
              </div>
            </div>

            {/* Linked List Visualization */}
            <div className="flex-1 flex items-center justify-center gap-x-24 flex-wrap">
              {nodesArray.map((value, idx) => (
                <div key={`${idx}-${value}`} className="relative flex items-center">
                  <div className={`
                    relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300
                    ${idx === activeIndex 
                      ? 'bg-[#B6FF00]/10 border-2 border-[#B6FF00] scale-110 shadow-[0_0_25px_rgba(182,255,0,0.4)]' 
                      : 'bg-surface-container-high border border-[#B6FF00]/20 shadow-[0_0_15px_rgba(182,255,0,0.15)]'
                    }
                  `}>
                    <span className={`text-xs mb-1 font-label ${idx === activeIndex ? 'text-[#B6FF00] font-bold' : 'text-on-surface-variant'}`}>
                      {idx === 0 ? 'HEAD' : idx === totalNodes - 1 ? 'TAIL' : idx === activeIndex ? 'ACTIVE' : `NODE`}
                    </span>
                    <span className={`text-2xl font-headline font-bold ${idx === activeIndex ? 'text-[#B6FF00] text-3xl' : idx === 0 ? 'text-[#B6FF00]' : 'text-on-surface'}`}>
                      {value}
                    </span>
                  </div>
                  {idx < totalNodes - 1 && (
                    <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                      <span className="material-symbols-outlined text-[#B6FF00] scale-x-150">arrow_forward</span>
                      <span className="material-symbols-outlined text-[#B6FF00]/40 scale-x-150 rotate-180">arrow_forward</span>
                    </div>
                  )}
                  {idx === totalNodes - 1 && (
                    <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-30">
                      <span className="text-xs font-bold tracking-widest">NULL</span>
                    </div>
                  )}
                </div>
              ))}
              {totalNodes === 0 && (
                <div className="text-on-surface-variant text-center">
                  <span className="material-symbols-outlined text-4xl mb-2">link_off</span>
                  <p className="text-sm">List is empty. Add a node to begin.</p>
                </div>
              )}
            </div>

            {/* Toast Message */}
            {message && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#B6FF00] text-[#476700] px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg z-20">
                {message}
              </div>
            )}

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#B6FF00_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          {/* Bottom Analysis Card */}
          <div className="bg-[rgba(21,27,24,0.6)] backdrop-blur-[20px] border border-[#B6FF00]/10 p-6 rounded-lg mb-0">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/60 font-label ml-4">Add Operations</span>
                <div className="flex gap-3">
                  <button onClick={handleAddFront} className="px-6 py-2.5 rounded-full border border-[#B6FF00] text-[#B6FF00] text-sm font-headline font-bold hover:bg-[#B6FF00]/10 transition-all active:scale-95 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">first_page</span> Add Front
                  </button>
                  <button onClick={handleAddBack} className="px-6 py-2.5 rounded-full bg-[#B6FF00] text-[#476700] text-sm font-headline font-bold hover:brightness-110 transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_15px_rgba(182,255,0,0.15)]">
                    <span className="material-symbols-outlined text-sm">last_page</span> Add Back
                  </button>
                </div>
              </div>
              <div className="hidden md:block h-12 w-px bg-[#B6FF00]/10"></div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/60 font-label ml-4">Pop Operations</span>
                <div className="flex gap-3">
                  <button onClick={handlePopFront} className="px-6 py-2.5 rounded-full border border-error text-error text-sm font-headline font-bold hover:bg-error/10 transition-all active:scale-95 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">keyboard_tab_rtl</span> Pop Front
                  </button>
                  <button onClick={handlePopBack} className="px-6 py-2.5 rounded-full border border-error text-error text-sm font-headline font-bold hover:bg-error/10 transition-all active:scale-95 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">keyboard_tab</span> Pop Back
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-[rgba(21,27,24,0.6)] backdrop-blur-[20px] border border-[#B6FF00]/5 p-6 rounded-lg">
              <h4 className="text-[#B6FF00] font-headline font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">timer</span>
                Time Complexity
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Append / Prepend</span>
                  <span className="text-on-surface font-headline font-bold">O(1)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Search / Access</span>
                  <span className="text-on-surface font-headline font-bold">O(n)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Deletion (at tail)</span>
                  <span className="text-on-surface font-headline font-bold">O(1)</span>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(21,27,24,0.6)] backdrop-blur-[20px] border border-[#B6FF00]/5 p-6 rounded-lg">
              <h4 className="text-[#B6FF00] font-headline font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">storage</span>
                Space Complexity
              </h4>
              <div className="flex flex-col justify-center h-full pb-4">
                <span className="text-3xl font-headline font-bold text-on-surface mb-1">O(n)</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">Each node requires memory for data, a next pointer, and a previous pointer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Editor Panel */}
        <section className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="bg-[rgba(21,27,24,0.6)] backdrop-blur-[20px] border border-[#B6FF00]/5 rounded-lg flex-1 flex flex-col overflow-hidden">
            <div className="bg-surface-container px-6 py-4 border-b border-[#B6FF00]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="ml-4 text-xs font-bold text-on-surface-variant tracking-wider uppercase">python_impl.py</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-lg cursor-pointer hover:text-[#B6FF00] transition-colors">content_copy</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-y-auto">
              <pre className="text-on-surface/80 whitespace-pre-wrap font-mono text-sm">
{`<span class="text-secondary">class</span> <span class="text-[#B6FF00]">Node</span>:
    <span class="text-secondary">def</span> <span class="text-primary-dim">__init__</span>(<span class="text-primary">self</span>, value):
        <span class="text-primary">self</span>.value = value
        <span class="text-primary">self</span>.next = <span class="text-secondary">None</span>
        <span class="text-primary">self</span>.prev = <span class="text-secondary">None</span>

<span class="text-secondary">class</span> <span class="text-[#B6FF00]">DoublyLinkedList</span>:
    <span class="text-secondary">def</span> <span class="text-primary-dim">__init__</span>(<span class="text-primary">self</span>):
        <span class="text-primary">self</span>.head = <span class="text-secondary">None</span>
        <span class="text-primary">self</span>.tail = <span class="text-secondary">None</span>

    <span class="text-secondary">def</span> <span class="text-primary-dim">append</span>(<span class="text-primary">self</span>, value):
        new_node = Node(value)
        <span class="text-secondary">if not</span> <span class="text-primary">self</span>.head:
            <span class="text-primary">self</span>.head = new_node
            <span class="text-primary">self</span>.tail = new_node
            <span class="text-secondary">return</span>
        <span class="text-primary">self</span>.tail.next = new_node
        new_node.prev = <span class="text-primary">self</span>.tail
        <span class="text-primary">self</span>.tail = new_node

    <span class="text-secondary">def</span> <span class="text-primary-dim">pop</span>(<span class="text-primary">self</span>):
        <span class="text-secondary">if not</span> <span class="text-primary">self</span>.tail:
            <span class="text-secondary">return None</span>
        val = <span class="text-primary">self</span>.tail.value
        <span class="text-primary">self</span>.tail = <span class="text-primary">self</span>.tail.prev
        <span class="text-secondary">if</span> <span class="text-primary">self</span>.tail:
            <span class="text-primary">self</span>.tail.next = <span class="text-secondary">None</span>
        <span class="text-secondary">return</span> val`}
              </pre>
            </div>
            <div className="mt-auto p-4 bg-surface-container-high/50 border-t border-[#B6FF00]/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#B6FF00] animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B6FF00]/70">Environment: Python 3.12 Optimized</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CSS for fonts and material icons */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        .neo-glow {
          box-shadow: 0 0 15px rgba(182, 255, 0, 0.15);
        }
        
        .active-glow {
          box-shadow: 0 0 25px rgba(182, 255, 0, 0.4);
        }

        body {
          margin: 0;
          padding: 0;
          background-color: #0a0f0d;
        }

        .text-secondary { color: #68fcbf; }
        .text-primary { color: #e9ffbd; }
        .text-primary-dim { color: #aaef00; }
        
        .bg-surface-container { background-color: #151b18; }
        .bg-surface-container-high\\/50 { background-color: rgba(32, 39, 36, 0.5); }
        
        .text-on-surface { color: #f9fdf9; }
        .text-on-surface-variant { color: #a7aca9; }
        .text-error { color: #ff7351; }
        .border-error { border-color: #ff7351; }
        .bg-error { background-color: #ff7351; }
        .bg-secondary { background-color: #68fcbf; }
      `}</style>
    </div>
  );
};

export default App;