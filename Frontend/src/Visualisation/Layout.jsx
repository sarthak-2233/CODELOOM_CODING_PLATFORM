import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './../LandingPage/components/Navbar';


const Layout = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(() => {
    if (location.pathname === '/sorting') return 'sorting';
    if (location.pathname === '/searching') return 'searching';
    if (location.pathname === '/linkedlist') return 'linkedlist';
    if (location.pathname.startsWith('/trees')) return 'trees';
    if (location.pathname.startsWith('/graphs')) return 'graphs';
    if (location.pathname === '/heaps') return 'heaps';
    return 'sorting';
  });
  
  const [activeSubMenu, setActiveSubMenu] = useState(() => {
    // Trees submenu
    if (location.pathname === '/trees/inorder') return 'inorder';
    if (location.pathname === '/trees/preorder') return 'preorder';
    if (location.pathname === '/trees/postorder') return 'postorder';
    // if (location.pathname === '/trees/bfs') return 'bfs';
    // if (location.pathname === '/trees/dfs') return 'dfs';
    // Graphs submenu
    if (location.pathname === '/graphs/bfs') return 'graph-bfs';
    if (location.pathname === '/graphs/dfs') return 'graph-dfs';
    return null;
  });
  
  const [isTreeExpanded, setIsTreeExpanded] = useState(() => {
    return location.pathname.startsWith('/trees');
  });
  
  const [isGraphExpanded, setIsGraphExpanded] = useState(() => {
    return location.pathname.startsWith('/graphs');
  });

  const menuItems = [
    { id: 'sorting', name: 'Sorting', icon: 'bar_chart', path: '/sorting' },
    { id: 'searching', name: 'Searching', icon: 'search', path: '/searching' },
    { id: 'linkedlist', name: 'Linked List', icon: 'link', path: '/linkedlist' },
    { 
      id: 'trees', 
      name: 'Trees', 
      icon: 'account_tree', 
      path: '/trees',
      hasSubmenu: true,
      submenu: [
        { id: 'inorder', name: 'Inorder Traversal', path: '/trees/inorder', icon: 'format_list_bulleted' },
        { id: 'preorder', name: 'Preorder Traversal', path: '/trees/preorder', icon: 'arrow_forward' },
        { id: 'postorder', name: 'Postorder Traversal', path: '/trees/postorder', icon: 'arrow_back' },
        
      ]
    },
    { 
      id: 'graphs', 
      name: 'Graphs', 
      icon: 'hub', 
      path: '/graphs',
      hasSubmenu: true,
      submenu: [
        { id: 'graph-bfs', name: 'BFS Traversal', path: '/graphs/bfs', icon: 'account_tree' },
        { id: 'graph-dfs', name: 'DFS Traversal', path: '/graphs/dfs', icon: 'ssid_chart' }
      ]
    },
    { id: 'heaps', name: 'Heaps', icon: 'layers', path: '/heaps' },
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item.id);
    if (item.id === 'trees') {
      setIsTreeExpanded(!isTreeExpanded);
      if (!isTreeExpanded && item.submenu[0]) {
        window.location.hash = item.submenu[0].path;
        setActiveSubMenu(item.submenu[0].id);
      }
    } else if (item.id === 'graphs') {
      setIsGraphExpanded(!isGraphExpanded);
      if (!isGraphExpanded && item.submenu[0]) {
        window.location.hash = item.submenu[0].path;
        setActiveSubMenu(item.submenu[0].id);
      }
    } else {
      setIsTreeExpanded(false);
      setIsGraphExpanded(false);
      setActiveSubMenu(null);
    }
  };

  const handleSubMenuClick = (subItem, parentId) => {
    setActiveSubMenu(subItem.id);
    setActiveMenu(parentId);
  };

  const getSubmenuIcon = (subItemId) => {
    const icons = {
      inorder: 'format_list_bulleted',
      preorder: 'arrow_forward',
      postorder: 'arrow_back',
      bfs: 'account_tree',
      dfs: 'ssid_chart',
      'graph-bfs': 'hub',
      'graph-dfs': 'ssid_chart'
    };
    return icons[subItemId] || 'circle';
  };

  return (
    <div className="h-screen w-full overflow-hidden" style={{ backgroundColor: '#0a0f0d' }}>
      {/* Navbar on top */}
      <Navbar />
      
      <div className="flex h-screen w-full pt-16">
        {/* Sidebar */}
        <aside
          className="flex flex-col h-screen sticky left-0 py-8"
          style={{
            backgroundColor: '#0A0F0D',
            width: '256px',
            borderRight: '1px solid rgba(182, 255, 0, 0.1)'
          }}
        >
          <div className="px-6 mb-10 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#b5fe00' }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: '#415e00', fontVariationSettings: "'FILL' 1" }}
              >
                terminal
              </span>
            </div>
            <div>
              <h2
                className="font-bold text-lg leading-tight"
                style={{ color: '#B6FF00', fontFamily: 'Space Grotesk' }}
              >
                CodeLoom
              </h2>
              <p
                className="text-[10px] tracking-widest"
                style={{ color: '#E8FFF8', opacity: 0.4 }}
              >
                Visualizer v1.0
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 pr-4">
            {menuItems.map((item) => (
              <div key={item.id}>
                <Link
                  to={item.hasSubmenu ? '#' : item.path}
                  onClick={() => handleMenuClick(item)}
                  className={`flex items-center justify-between gap-4 py-3 px-6 w-full transition-transform group ${
                    activeMenu === item.id && !item.hasSubmenu ? 'border-r-4 rounded-r-full translate-x-1' : ''
                  }`}
                  style={{
                    backgroundColor:
                      activeMenu === item.id && !item.hasSubmenu ? 'rgba(182, 255, 0, 0.1)' : 'transparent',
                    color: activeMenu === item.id ? '#B6FF00' : '#E8FFF8',
                    opacity: activeMenu === item.id ? 1 : 0.4,
                    borderRightColor: activeMenu === item.id && !item.hasSubmenu ? '#B6FF00' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-medium uppercase tracking-widest text-sm">
                      {item.name}
                    </span>
                  </div>
                  {item.hasSubmenu && (
                    <span className="material-symbols-outlined text-sm" style={{ fontSize: '18px' }}>
                      {(item.id === 'trees' && isTreeExpanded) || (item.id === 'graphs' && isGraphExpanded) ? 'expand_less' : 'expand_more'}
                    </span>
                  )}
                </Link>
                
                {/* Submenu for Trees */}
                {item.id === 'trees' && item.hasSubmenu && isTreeExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.path}
                        onClick={() => handleSubMenuClick(subItem, item.id)}
                        className={`flex items-center gap-4 py-2 px-4 w-full transition-all group ${
                          activeSubMenu === subItem.id ? 'border-l-4' : ''
                        }`}
                        style={{
                          backgroundColor: activeSubMenu === subItem.id ? 'rgba(182, 255, 0, 0.08)' : 'transparent',
                          color: activeSubMenu === subItem.id ? '#B6FF00' : '#E8FFF8',
                          opacity: activeSubMenu === subItem.id ? 1 : 0.5,
                          borderLeftColor: activeSubMenu === subItem.id ? '#B6FF00' : 'transparent',
                          textDecoration: 'none',
                          fontSize: '12px'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          {subItem.icon}
                        </span>
                        <span className="font-medium tracking-wider text-xs">
                          {subItem.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Submenu for Graphs */}
                {item.id === 'graphs' && item.hasSubmenu && isGraphExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.path}
                        onClick={() => handleSubMenuClick(subItem, item.id)}
                        className={`flex items-center gap-4 py-2 px-4 w-full transition-all group ${
                          activeSubMenu === subItem.id ? 'border-l-4' : ''
                        }`}
                        style={{
                          backgroundColor: activeSubMenu === subItem.id ? 'rgba(104, 252, 191, 0.08)' : 'transparent',
                          color: activeSubMenu === subItem.id ? '#68fcbf' : '#E8FFF8',
                          opacity: activeSubMenu === subItem.id ? 1 : 0.5,
                          borderLeftColor: activeSubMenu === subItem.id ? '#68fcbf' : 'transparent',
                          textDecoration: 'none',
                          fontSize: '12px'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          {subItem.icon}
                        </span>
                        <span className="font-medium tracking-wider text-xs">
                          {subItem.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto px-6 space-y-4 pt-6" style={{ borderTop: '1px solid rgba(182, 255, 0, 0.05)' }}>
            <button
              className="flex items-center gap-4 transition-colors w-full"
              style={{ color: '#E8FFF8', opacity: 0.4 }}
            >
              <span className="material-symbols-outlined">menu_book</span>
              <span className="font-medium text-xs uppercase tracking-widest">Docs</span>
            </button>
            <button
              className="flex items-center gap-4 transition-colors w-full"
              style={{ color: '#E8FFF8', opacity: 0.4 }}
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-medium text-xs uppercase tracking-widest">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto" style={{ backgroundColor: '#0a0f0d' }}>
          <Outlet />
        </main>
      </div>

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Layout;