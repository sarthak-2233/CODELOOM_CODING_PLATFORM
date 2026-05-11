import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  // ✅ FIX: min(1) instead of length(3) — allow any number of languages
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initalCode: z.string().min(1, 'Initial code is required') // ✅ matches backend typo
    })
  ).min(1, 'At least one language required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).min(1, 'At least one language required')
});

function AdminPanel() {
  const navigate = useNavigate();
  const [newTag, setNewTag] = useState('');
  const [selectedCodeLang, setSelectedCodeLang] = useState('C++');
  // ✅ NEW: track which languages are checked
  const [selectedLangs, setSelectedLangs] = useState(['C++']);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      tags: ['array'], // ✅ FIX: lowercase to match backend enum
      startCode: [
        { language: 'C++', initalCode: '// Write your C++ code here\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}' },
        { language: 'Java', initalCode: '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}' },
        { language: 'JavaScript', initalCode: '// Write your JavaScript code here\nfunction solution() {\n    // Your code here\n}' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '// Reference solution in C++' },
        { language: 'Java', completeCode: '// Reference solution in Java' },
        { language: 'JavaScript', completeCode: '// Reference solution in JavaScript' }
      ],
      visibleTestCases: [
        { input: '', output: '', explanation: '' }
      ],
      hiddenTestCases: [
        { input: '', output: '' }
      ]
    }
  });

  const watchTags = watch('tags', []);

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({ control, name: 'visibleTestCases' });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({ control, name: 'hiddenTestCases' });

  const addCustomTag = () => {
    if (newTag.trim() && !watchTags.includes(newTag.trim().toLowerCase())) {
      setValue('tags', [...watchTags, newTag.trim().toLowerCase()]); // ✅ always lowercase
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', watchTags.filter(tag => tag !== tagToRemove));
  };

  // ✅ NEW: toggle language checkbox
  const toggleLang = (lang) => {
    setSelectedLangs(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
    // also switch editor to that language if adding
    if (!selectedLangs.includes(lang)) setSelectedCodeLang(lang);
  };

  // ✅ FIX: filter only selected languages before sending + add problemCreator
 const onSubmit = async (data) => {
  try {
    if (selectedLangs.length === 0) {
      alert('Please select at least one language!');
      return;
    }

    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload._id;

    const filteredData = {
      ...data,
      startCode: data.startCode.filter(s => selectedLangs.includes(s.language)),
      referenceSolution: data.referenceSolution.filter(s => selectedLangs.includes(s.language)),
      problemCreator: userId,
      tags: data.tags  // ✅ Send the entire array, not just the first element
    };
    
    console.log(filteredData);
    await axiosClient.post('/problem/create', filteredData);
    alert('Problem created successfully!');
    navigate('/admin/dashboard');
  } catch (error) {
    alert(`Error: ${error.response?.data?.message || error.message}`);
  }
};

  const languageOptions = [
    { value: 'C++', label: 'C++', icon: '🔵', extension: 'cpp' },
    { value: 'Java', label: 'Java', icon: '🟠', extension: 'java' },
    { value: 'JavaScript', label: 'JavaScript', icon: '🟡', extension: 'js' }
  ];

  const getLanguageIndex = (lang) => {
    if (lang === 'C++') return 0;
    if (lang === 'Java') return 1;
    return 2;
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#f9fdf9] mb-2 tracking-tight font-['Space_Grotesk']">
          Create New Problem
        </h1>
        <p className="text-[#a7aca9] text-base font-light">
          Architect a new algorithmic challenge for the CodeLoom ecosystem.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-xl border border-[rgba(182,255,0,0.08)] overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[#b5fe00] text-2xl">info</span>
              <h2 className="text-xl font-semibold text-[#f9fdf9] font-['Space_Grotesk']">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem Title */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-[#b5fe00] uppercase tracking-wider ml-1">
                  Problem Title
                </label>
                <input
                  {...register('title')}
                  className={`w-full bg-[#0A0F0D]/60 border ${errors.title ? 'border-red-500' : 'border-[#444946]'} rounded-xl px-5 py-3.5 text-[#f9fdf9] placeholder:text-[#a7aca9]/40 focus:outline-none focus:border-[#b5fe00] focus:ring-1 focus:ring-[#b5fe00]/50 transition-all text-base`}
                  placeholder="e.g., Matrix Spiral Traversal"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-[#b5fe00] uppercase tracking-wider ml-1">
                  Difficulty
                </label>
                <select
                  {...register('difficulty')}
                  className="w-full bg-[#0A0F0D]/60 border border-[#444946] rounded-xl px-5 py-3.5 text-[#f9fdf9] focus:outline-none focus:border-[#b5fe00] focus:ring-1 focus:ring-[#b5fe00]/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 space-y-2">
              <label className="block text-[11px] font-bold text-[#b5fe00] uppercase tracking-wider ml-1">
                Topic Tags
              </label>
              <div className="bg-[#0A0F0D]/40 rounded-xl border border-[#444946] p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {watchTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#b5fe00]/10 text-[#b5fe00] px-3 py-1.5 rounded-full text-sm font-medium border border-[#b5fe00]/30 flex items-center gap-2"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-[#ff7351] transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  ))}
                  {watchTags.length === 0 && (
                    <span className="text-[#a7aca9]/40 text-sm">No tags added yet</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                    placeholder="Type your own tag and press Enter..."
                    className="flex-1 bg-[#0A0F0D]/60 border border-[#444946] rounded-lg px-4 py-2 text-[#f9fdf9] text-sm placeholder:text-[#a7aca9]/40 focus:outline-none focus:border-[#b5fe00] transition-all"
                  />
                  <button
                    type="button"
                    onClick={addCustomTag}
                    className="px-4 py-2 rounded-lg border border-[#b5fe00]/40 text-[#b5fe00] text-sm font-medium hover:bg-[#b5fe00]/10 transition-all"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
              {errors.tags && <p className="text-red-400 text-xs mt-1">{errors.tags.message}</p>}
            </div>

            {/* Problem Description */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-[11px] font-bold text-[#b5fe00] uppercase tracking-wider">
                  Problem Description
                </label>
                <span className="text-[10px] text-[#a7aca9]/50 italic">Markdown supported</span>
              </div>
              <textarea
                {...register('description')}
                className={`w-full bg-[#0A0F0D]/60 border ${errors.description ? 'border-red-500' : 'border-[#444946]'} rounded-xl px-5 py-4 text-[#f9fdf9] placeholder:text-[#a7aca9]/40 focus:outline-none focus:border-[#b5fe00] focus:ring-1 focus:ring-[#b5fe00]/50 transition-all font-mono text-sm`}
                placeholder="Describe the problem, constraints, and examples..."
                rows={8}
              />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        {/* Test Cases Section */}
        <div className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-xl border border-[rgba(182,255,0,0.08)] overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[#b5fe00] text-2xl">science</span>
              <h2 className="text-xl font-semibold text-[#f9fdf9] font-['Space_Grotesk']">Test Cases</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visible Test Cases */}
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-base font-medium text-[#68fcbf]">Visible Test Cases</h3>
                  <button
                    type="button"
                    onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#b5fe00]/40 text-[#b5fe00] text-xs font-bold hover:bg-[#b5fe00]/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Case
                  </button>
                </div>
                <div className="space-y-4">
                  {visibleFields.map((field, index) => (
                    <div key={field.id} className="bg-[#0A0F0D]/40 rounded-xl border border-[rgba(182,255,0,0.1)] p-5 relative group">
                      <button
                        type="button"
                        onClick={() => removeVisible(index)}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity material-symbols-outlined text-red-400 text-base hover:text-red-300"
                      >
                        delete
                      </button>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold text-[#a7aca9] uppercase tracking-wider block mb-1.5">Input</label>
                          <textarea
                            {...register(`visibleTestCases.${index}.input`)}
                            className="w-full font-mono text-sm p-3 bg-black/40 rounded-lg text-[#b5fe00]/80 border border-[#444946] focus:outline-none focus:border-[#b5fe00] transition-all resize-none"
                            placeholder="e.g: -1 0 1 2 -1 -4"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#a7aca9] uppercase tracking-wider block mb-1.5">Output</label>
                          <textarea
                            {...register(`visibleTestCases.${index}.output`)}
                            className="w-full font-mono text-sm p-3 bg-black/40 rounded-lg text-[#68fcbf]/80 border border-[#444946] focus:outline-none focus:border-[#b5fe00] transition-all resize-none"
                            placeholder={"e.g: -1 -1 2 \n-1 0 1 "}
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#a7aca9] uppercase tracking-wider block mb-1.5">Explanation</label>
                          <textarea
                            {...register(`visibleTestCases.${index}.explanation`)}
                            className="w-full font-mono text-sm p-3 bg-black/40 rounded-lg text-[#f9fdf9]/80 border border-[#444946] focus:outline-none focus:border-[#b5fe00] transition-all"
                            rows={2}
                            placeholder="Explain why this output is correct..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hidden Test Cases */}
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-base font-medium text-[#a7aca9]">Hidden Test Cases</h3>
                  <button
                    type="button"
                    onClick={() => appendHidden({ input: '', output: '' })}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#a7aca9]/40 text-[#a7aca9] text-xs font-bold hover:bg-white/5 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Case
                  </button>
                </div>
                <div className="space-y-4">
                  {hiddenFields.map((field, index) => (
                    <div key={field.id} className="bg-[#0A0F0D]/40 rounded-xl border border-[rgba(182,255,0,0.1)] p-5 relative group">
                      <button
                        type="button"
                        onClick={() => removeHidden(index)}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity material-symbols-outlined text-red-400 text-base hover:text-red-300"
                      >
                        delete
                      </button>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold text-[#a7aca9] uppercase tracking-wider block mb-1.5">Input</label>
                          <textarea
                            {...register(`hiddenTestCases.${index}.input`)}
                            className="w-full font-mono text-sm p-3 bg-black/40 rounded-lg text-[#b5fe00]/80 border border-[#444946] focus:outline-none focus:border-[#b5fe00] transition-all resize-none"
                            placeholder="Hidden test input"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#a7aca9] uppercase tracking-wider block mb-1.5">Output</label>
                          <textarea
                            {...register(`hiddenTestCases.${index}.output`)}
                            className="w-full font-mono text-sm p-3 bg-black/40 rounded-lg text-[#68fcbf]/80 border border-[#444946] focus:outline-none focus:border-[#b5fe00] transition-all resize-none"
                            placeholder="Expected output"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {hiddenFields.length === 0 && (
                    <div className="bg-[#0A0F0D]/40 rounded-xl border border-dashed border-[rgba(182,255,0,0.2)] p-8 text-center">
                      <p className="text-xs text-[#a7aca9]/60">No hidden cases defined yet.</p>
                      <p className="text-[10px] text-[#a7aca9]/40 mt-1">Click "Add Case" to create hidden test cases</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Templates Section */}
        <div className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-xl border border-[rgba(182,255,0,0.08)] overflow-hidden">
          <div className="px-8 pt-8 pb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[#b5fe00] text-2xl">code_blocks</span>
              <h2 className="text-xl font-semibold text-[#f9fdf9] font-['Space_Grotesk']">Code Templates</h2>
            </div>

            {/* ✅ NEW: Language Checkboxes */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold text-[#b5fe00] uppercase tracking-wider mb-3 ml-1">
                Select Languages to Include
              </label>
              <div className="flex gap-6">
                {languageOptions.map(lang => (
                  <label key={lang.value} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedLangs.includes(lang.value)}
                      onChange={() => toggleLang(lang.value)}
                      className="accent-[#b5fe00] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[#f9fdf9] text-sm group-hover:text-[#b5fe00] transition-colors">
                      {lang.icon} {lang.label}
                    </span>
                  </label>
                ))}
              </div>
              {selectedLangs.length === 0 && (
                <p className="text-red-400 text-xs mt-2">⚠️ Select at least one language</p>
              )}
            </div>

            {/* Language Dropdown — only shows selected languages */}
            <div className="mb-8">
              <label className="block text-[11px] font-bold text-[#b5fe00] uppercase tracking-wider mb-2 ml-1">
                Edit Code For
              </label>
              <select
                value={selectedCodeLang}
                onChange={(e) => setSelectedCodeLang(e.target.value)}
                className="w-full md:w-64 bg-[#0A0F0D]/60 border border-[#444946] rounded-xl px-5 py-3 text-[#f9fdf9] focus:outline-none focus:border-[#b5fe00] focus:ring-1 focus:ring-[#b5fe00]/50 transition-all cursor-pointer"
              >
                {/* ✅ Only show checked languages in dropdown */}
                {languageOptions
                  .filter(lang => selectedLangs.includes(lang.value))
                  .map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.icon} {lang.label}
                    </option>
                  ))}
              </select>
            </div>

            {/* Code Editor */}
            {(() => {
              const langIndex = getLanguageIndex(selectedCodeLang);
              const langInfo = languageOptions.find(l => l.value === selectedCodeLang);
              return (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#a7aca9] uppercase tracking-wider">
                        Initial Code (Scaffold)
                      </label>
                      <span className="text-[10px] text-[#a7aca9]/40 font-mono">main.{langInfo?.extension}</span>
                    </div>
                    <div className="bg-[#050807] rounded-xl border border-[#b5fe00]/10 overflow-hidden">
                      <div className="flex gap-2 p-2.5 bg-[#0A0F0D]/50 border-b border-[rgba(182,255,0,0.08)]">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                        <span className="text-[10px] text-[#a7aca9]/40 ml-2">{langInfo?.label}</span>
                      </div>
                      <textarea
                        {...register(`startCode.${langIndex}.initalCode`)} // ✅ matches backend typo
                        className="w-full bg-transparent border-none focus:outline-none p-5 font-mono text-sm text-[#b5fe00]/70 leading-relaxed resize-none"
                        rows={10}
                        placeholder={`// Write your ${selectedCodeLang} starter code here...`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#a7aca9] uppercase tracking-wider">
                        Reference Solution
                      </label>
                      <span className="text-[10px] text-[#a7aca9]/40 font-mono">solution.{langInfo?.extension}</span>
                    </div>
                    <div className="bg-[#050807] rounded-xl border border-[#68fcbf]/10 overflow-hidden">
                      <div className="flex gap-2 p-2.5 bg-[#0A0F0D]/50 border-b border-[rgba(182,255,0,0.08)]">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                        <span className="text-[10px] text-[#a7aca9]/40 ml-2">Solution</span>
                      </div>
                      <textarea
                        {...register(`referenceSolution.${langIndex}.completeCode`)}
                        className="w-full bg-transparent border-none focus:outline-none p-5 font-mono text-sm text-[#68fcbf]/70 leading-relaxed resize-none"
                        rows={10}
                        placeholder={`// Write your complete ${selectedCodeLang} solution here...`}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="mt-6 pt-4 border-t border-[rgba(182,255,0,0.08)]">
              <p className="text-[10px] text-[#a7aca9]/40 text-center">
                💡 Only checked languages will be submitted. Use dropdown to edit each one.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 pb-4">
          <button
            type="submit"
            disabled={isSubmitting || selectedLangs.length === 0}
            className="bg-[#b5fe00] text-[#1a2e00] px-10 py-4 rounded-full font-bold text-base uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(182,255,0,0.2)] hover:shadow-[0_0_40px_rgba(182,255,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Creating Problem...
              </>
            ) : (
              <>
                Initialize New Problem
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">rocket_launch</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/2 bg-[#b5fe00]/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-[#68fcbf]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        textarea, input, select {
          transition: all 0.2s ease;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #444946; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default AdminPanel;