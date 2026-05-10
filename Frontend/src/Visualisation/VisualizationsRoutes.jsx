// Visualisation/VisualizationsRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VisualizationsLayout from './VisualizationsLayout';
import SortingPage from './SortingPage';
import SearchingPage from './SearchingPage';
import TreeInorder from './TreeInorder';
import TreePreorder from './TreePreorder';
import TreePostorder from './TreePostorder';
import GraphBFS from './GraphBFS';
import GraphDFS from './GraphDFS';
import MinHeap from './MinHeap';
import MaxHeap from './MaxHeap';
import SinglyLinkedListVisualizer from './SinglyLinkList';

const VisualizationsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<VisualizationsLayout />}>
        <Route index element={<SortingPage />} />
        <Route path="sorting" element={<SortingPage />} />
        <Route path="searching" element={<SearchingPage />} />
        <Route path="linkedlist" element={<SinglyLinkedListVisualizer />} />
        <Route path="trees/inorder" element={<TreeInorder />} />
        <Route path="trees/preorder" element={<TreePreorder />} />
        <Route path="trees/postorder" element={<TreePostorder />} />
        <Route path="graphs/bfs" element={<GraphBFS />} />
        <Route path="graphs/dfs" element={<GraphDFS />} />
        <Route path="heaps/min" element={<MinHeap />} />
        <Route path="heaps/max" element={<MaxHeap />} />
      </Route>
    </Routes>
  );
};

export default VisualizationsRoutes;