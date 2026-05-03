import React, { useState } from 'react';
import FAQItem from '../components/FAQItem';

const faqData = [
  {
    question: "How are the problem sets curated?",
    answer: "Our problem sets are hand-picked by senior engineers from FAANG and high-growth startups. We focus on patterns rather than memorization, ensuring each problem teaches a unique algorithmic technique that frequently appears in real-world system design and interviews.",
    category: "Content"
  },
  {
    question: "Can I contribute notes to the community?",
    answer: "Absolutely. We have a robust peer-review system. Top-rated contributors get access to exclusive platform features and can even earn professional credits. Your contributions help build a collective brain for engineers worldwide.",
    category: "Community"
  },
  {
    question: "Do the visual tools support custom inputs?",
    answer: "Yes. Unlike static animations, our DSANotesVisuals engine allows you to inject your own arrays, trees, and graph data. You can watch step-by-step as your specific edge case unfolds in real-time with memory-state monitoring.",
    category: "Features"
  },
  {
    question: "What programming languages are supported?",
    answer: "We currently offer first-class support for C++, Python, Java, JavaScript, and Rust. Each problem comes with boilerplate code, testcases, and idiomatic solutions for these languages, complete with complexity analysis.",
    category: "Technical"
  }
];

const categories = ["All", "Content", "Community", "Features", "Technical"];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 relative">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-container/3 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header with modern styling */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/10 border border-primary-container/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-primary-container">
              Knowledge Base
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-on-surface mb-4">
            Frequently asked
            <span className="text-primary-container relative ml-3">
              questions
              <svg className="absolute -bottom-2 left-0 w-full h-1" viewBox="0 0 200 4" preserveAspectRatio="none">
                <path d="M0 2 L200 2" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="text-primary-container/30"/>
              </svg>
            </span>
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Everything you need to know about mastering DSA with CodeLoom
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-on-surface-variant/40 group-focus-within:text-primary-container transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-highest/30 border border-outline-variant/20 focus:border-primary-container/50 focus:outline-none focus:ring-2 focus:ring-primary-container/20 text-on-surface placeholder-on-surface-variant/50 transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-container text-on-primary-container shadow-lg scale-105'
                  : 'bg-surface-container-highest/30 text-on-surface-variant hover:bg-surface-container-highest/50 border border-outline-variant/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items with animation */}
        <div className="space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:translate-x-1"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <FAQItem question={item.question} answer={item.answer} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-on-surface-variant">No matching questions found.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-primary-container hover:underline text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-surface-container-highest/20 backdrop-blur-sm border border-outline-variant/20">
            <span className="text-on-surface-variant text-sm">Still have questions?</span>
            <button className="group flex items-center gap-2 text-primary-container font-medium text-sm">
              Contact support
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default FAQ;