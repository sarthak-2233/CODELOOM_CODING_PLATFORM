import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useState, useEffect } from 'react';

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().optional().default('')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).optional().default([]),
  startCode: z.array(
    z.object({
      language: z.enum(['c++', 'java', 'javascript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).min(1, 'At least one language required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['c++', 'java', 'javascript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).min(1, 'At least one language required')
});

const languageOptions = [
  { value: 'c++', label: 'C++', icon: '🔵', extension: 'cpp' },
  { value: 'java', label: 'Java', icon: '🟠', extension: 'java' },
  { value: 'javascript', label: 'JavaScript', icon: '🟡', extension: 'js' }
];

// ✅ FIX: Default placeholder codes — any referenceSolution matching these will be filtered out
const PLACEHOLDER_CODES = {
  'c++':        { start: '// C++ starter code',        solution: '// C++ solution' },
  'java':       { start: '// Java starter code',       solution: '// Java solution' },
  'javascript': { start: '// JavaScript starter code', solution: '// JavaScript solution' }
};

const isPlaceholderCode = (code, lang, type) => {
  if (!code?.trim()) return true;
  const placeholder = PLACEHOLDER_CODES[lang]?.[type];
  return placeholder && code.trim() === placeholder;
};

const difficultyColor = (d) => {
  if (d === 'easy') return 'text-[#b5fe00] border-[#b5fe00]/40 bg-[#b5fe00]/10';
  if (d === 'medium') return 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10';
  return 'text-red-400 border-red-400/40 bg-red-400/10';
};

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({ problem, onClose, onUpdated }) {
  const [newTag, setNewTag] = useState('');
  const [selectedCodeLang, setSelectedCodeLang] = useState('c++');

  const normaliseTags = (tags) => {
    if (!tags) return ['array'];
    if (Array.isArray(tags)) return tags;
    return [tags];
  };

  const buildCodeArray = (codeArray, type) => {
    const defaultCodes = {
      'c++':        PLACEHOLDER_CODES['c++'][type === 'start' ? 'start' : 'solution'],
      'java':       PLACEHOLDER_CODES['java'][type === 'start' ? 'start' : 'solution'],
      'javascript': PLACEHOLDER_CODES['javascript'][type === 'start' ? 'start' : 'solution'],
    };

    const codeMap = {};
    if (codeArray && Array.isArray(codeArray)) {
      codeArray.forEach(item => {
        const lang = item.language?.toLowerCase();
        if (lang) {
          codeMap[lang] = type === 'start'
            ? (item.initialCode || item.initalCode || defaultCodes[lang])
            : (item.completeCode || defaultCodes[lang]);
        }
      });
    }

    return languageOptions.map(langOpt => ({
      language: langOpt.value,
      ...(type === 'start'
        ? { initialCode: codeMap[langOpt.value] || defaultCodes[langOpt.value] }
        : { completeCode: codeMap[langOpt.value] || defaultCodes[langOpt.value] }
      )
    }));
  };

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
      title: problem.title || '',
      description: problem.description || '',
      difficulty: problem.difficulty || 'easy',
      tags: normaliseTags(problem.tags),
      visibleTestCases: problem.visibleTestCases?.length
        ? problem.visibleTestCases
        : [{ input: '', output: '', explanation: '' }],
      hiddenTestCases: problem.hiddenTestCases?.length
        ? problem.hiddenTestCases
        : [],
      startCode: buildCodeArray(problem.startCode, 'start'),
      referenceSolution: buildCodeArray(problem.referenceSolution, 'solution')
    }
  });

  const watchTags = watch('tags', []);

  const [selectedLangs, setSelectedLangs] = useState(() => {
    const langs = new Set();
    if (problem.startCode?.length) {
      problem.startCode.forEach(s => {
        const lang = s.language?.toLowerCase();
        const code = s.initialCode || s.initalCode || '';
        if (lang && code.trim()) langs.add(lang);
      });
    }
    if (problem.referenceSolution?.length) {
      problem.referenceSolution.forEach(s => {
        const lang = s.language?.toLowerCase();
        if (lang && s.completeCode?.trim()) langs.add(lang);
      });
    }
    return langs.size > 0 ? Array.from(langs) : ['c++'];
  });

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } =
    useFieldArray({ control, name: 'visibleTestCases' });
  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } =
    useFieldArray({ control, name: 'hiddenTestCases' });

  const addCustomTag = () => {
    if (newTag.trim() && !watchTags.includes(newTag.trim().toLowerCase())) {
      setValue('tags', [...watchTags, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };
  const removeTag = (tag) => setValue('tags', watchTags.filter(t => t !== tag));

  const toggleLang = (lang) => {
    setSelectedLangs(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
    if (!selectedLangs.includes(lang)) setSelectedCodeLang(lang);
  };

  const onSubmit = async (data) => {
    try {
      if (selectedLangs.length === 0) {
        alert('Select at least one language!');
        return;
      }

      // ✅ FIX: Filter out placeholder/empty code so Judge0 never receives them
      const filteredStartCode = data.startCode
        .filter(s => selectedLangs.includes(s.language) && !isPlaceholderCode(s.initialCode, s.language, 'start'))
        .map(s => ({ language: s.language, initialCode: s.initialCode }));

      const filteredReferenceSolution = data.referenceSolution
        .filter(s => selectedLangs.includes(s.language) && !isPlaceholderCode(s.completeCode, s.language, 'solution'))
        .map(s => ({ language: s.language, completeCode: s.completeCode }));

      // ✅ FIX: Warn user clearly if any selected language has no real solution written
      const missingStartCode = selectedLangs.filter(
        lang => !filteredStartCode.find(s => s.language === lang)
      );
      const missingSolutions = selectedLangs.filter(
        lang => !filteredReferenceSolution.find(s => s.language === lang)
      );

      if (missingStartCode.length > 0) {
        alert(`Please write real starter code for: ${missingStartCode.join(', ')}\n(Default placeholder code is not accepted)`);
        return;
      }

      if (missingSolutions.length > 0) {
        alert(`Please write a real reference solution for: ${missingSolutions.join(', ')}\n(Default placeholder code is not accepted)`);
        return;
      }

      if (filteredStartCode.length === 0) {
        alert('Please provide starter code for at least one selected language');
        return;
      }

      if (filteredReferenceSolution.length === 0) {
        alert('Please provide reference solution for at least one selected language');
        return;
      }

      const filteredData = {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        tags: data.tags,
        visibleTestCases: data.visibleTestCases,
        hiddenTestCases: data.hiddenTestCases,
        startCode: filteredStartCode,
        referenceSolution: filteredReferenceSolution,
        // ✅ FIX: Always send problemCreator from the original fetched problem
        problemCreator: problem.problemCreator
      };

      console.log('Submitting filtered data:', filteredData);

      const response = await axiosClient.put(`/problem/update/${problem._id}`, filteredData);
      console.log('Update response:', response.data);
      alert('Problem updated successfully!');
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Update error:', err);
      alert(`Error: ${err.response?.data || err.message}`);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-5xl bg-[#0A0F0D] border border-[rgba(182,255,0,0.12)] rounded-2xl shadow-[0_0_80px_rgba(182,255,0,0.08)] my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[rgba(182,255,0,0.08)]">
          <div>
            <h2 className="text-2xl font-bold text-[#f9fdf9] font-['Space_Grotesk'] tracking-tight">
              Update Problem
            </h2>
            <p className="text-[#a7aca9] text-sm font-light mt-1">
              Editing: <span className="text-[#b5fe00]">{problem.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[rgba(182,255,0,0.2)] flex items-center justify-center text-[#a7aca9] hover:text-[#f9fdf9] hover:border-[#b5fe00]/40 transition-all"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form */}
        <div className="px-8 py-8 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit, (errs) => {
            console.error('Zod validation errors:', errs);
          })} className="space-y-8">

            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-[#b5fe00] text-2xl">info</span>
                <h3 className="text-lg font-bold text-[#f9fdf9] tracking-tight">Basic Information</h3>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#a7aca9] mb-2">Problem Title</label>
                <input
                  {...register('title')}
                  className="w-full bg-[#1a2e00]/20 border border-[#444946] rounded-lg px-4 py-3 text-[#f9fdf9] focus:border-[#b5fe00] focus:outline-none"
                  placeholder="Two Sum"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#a7aca9] mb-2">Description</label>
                <textarea
                  {...register('description')}
                  rows={6}
                  className="w-full bg-[#1a2e00]/20 border border-[#444946] rounded-lg px-4 py-3 text-[#f9fdf9] focus:border-[#b5fe00] focus:outline-none resize-none"
                  placeholder="Given an array of integers..."
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-semibold text-[#a7aca9] mb-2">Difficulty</label>
                <select
                  {...register('difficulty')}
                  className="w-full bg-[#1a2e00]/20 border border-[#444946] rounded-lg px-4 py-3 text-[#f9fdf9] focus:border-[#b5fe00] focus:outline-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                {errors.difficulty && <p className="text-red-400 text-xs mt-1">{errors.difficulty.message}</p>}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-[#a7aca9] mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {watchTags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#b5fe00]/10 border border-[#b5fe00]/30 rounded-full text-sm text-[#b5fe00]">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag(); } }}
                    className="flex-1 bg-[#1a2e00]/20 border border-[#444946] rounded-lg px-4 py-2 text-[#f9fdf9] focus:border-[#b5fe00] focus:outline-none"
                    placeholder="Add custom tag..."
                  />
                  <button type="button" onClick={addCustomTag} className="px-6 py-2 bg-[#b5fe00] text-[#1a2e00] rounded-lg font-bold hover:scale-105 transition-transform">
                    Add
                  </button>
                </div>
                {errors.tags && <p className="text-red-400 text-xs mt-1">{errors.tags.message}</p>}
              </div>
            </div>

            {/* Visible Test Cases */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-[#b5fe00] text-2xl">visibility</span>
                <h3 className="text-lg font-bold text-[#f9fdf9] tracking-tight">Visible Test Cases</h3>
              </div>
              {visibleFields.map((field, idx) => (
                <div key={field.id} className="p-4 bg-[#1a2e00]/10 border border-[#444946] rounded-lg space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#a7aca9]">Test Case {idx + 1}</span>
                    {visibleFields.length > 1 && (
                      <button type="button" onClick={() => removeVisible(idx)} className="text-red-400 hover:text-red-300 text-sm">
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    {...register(`visibleTestCases.${idx}.input`)}
                    placeholder="Input"
                    className="w-full bg-[#0A0F0D] border border-[#444946] rounded px-3 py-2 text-[#f9fdf9] text-sm focus:border-[#b5fe00] focus:outline-none"
                  />
                  <input
                    {...register(`visibleTestCases.${idx}.output`)}
                    placeholder="Expected Output"
                    className="w-full bg-[#0A0F0D] border border-[#444946] rounded px-3 py-2 text-[#f9fdf9] text-sm focus:border-[#b5fe00] focus:outline-none"
                  />
                  <input
                    {...register(`visibleTestCases.${idx}.explanation`)}
                    placeholder="Explanation (optional)"
                    className="w-full bg-[#0A0F0D] border border-[#444946] rounded px-3 py-2 text-[#f9fdf9] text-sm focus:border-[#b5fe00] focus:outline-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                className="w-full py-3 border border-dashed border-[#b5fe00]/30 rounded-lg text-[#b5fe00] hover:bg-[#b5fe00]/5 transition-colors"
              >
                + Add Visible Test Case
              </button>
            </div>

            {/* Hidden Test Cases */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-[#b5fe00] text-2xl">visibility_off</span>
                <h3 className="text-lg font-bold text-[#f9fdf9] tracking-tight">Hidden Test Cases</h3>
              </div>
              {hiddenFields.map((field, idx) => (
                <div key={field.id} className="p-4 bg-[#1a2e00]/10 border border-[#444946] rounded-lg space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#a7aca9]">Hidden Test {idx + 1}</span>
                    <button type="button" onClick={() => removeHidden(idx)} className="text-red-400 hover:text-red-300 text-sm">
                      Remove
                    </button>
                  </div>
                  <input
                    {...register(`hiddenTestCases.${idx}.input`)}
                    placeholder="Input"
                    className="w-full bg-[#0A0F0D] border border-[#444946] rounded px-3 py-2 text-[#f9fdf9] text-sm focus:border-[#b5fe00] focus:outline-none"
                  />
                  <input
                    {...register(`hiddenTestCases.${idx}.output`)}
                    placeholder="Expected Output"
                    className="w-full bg-[#0A0F0D] border border-[#444946] rounded px-3 py-2 text-[#f9fdf9] text-sm focus:border-[#b5fe00] focus:outline-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendHidden({ input: '', output: '' })}
                className="w-full py-3 border border-dashed border-[#b5fe00]/30 rounded-lg text-[#b5fe00] hover:bg-[#b5fe00]/5 transition-colors"
              >
                + Add Hidden Test Case
              </button>
            </div>

            {/* Language Selection & Code Editor */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-[#b5fe00] text-2xl">code</span>
                <h3 className="text-lg font-bold text-[#f9fdf9] tracking-tight">Code Templates</h3>
              </div>

              {/* ✅ FIX: Warning banner so users know placeholder code won't be submitted */}
              <div className="flex items-start gap-3 px-4 py-3 bg-yellow-400/5 border border-yellow-400/20 rounded-lg">
                <span className="material-symbols-outlined text-yellow-400 text-lg mt-0.5">warning</span>
                <p className="text-yellow-400/80 text-xs leading-relaxed">
                  Only languages with <strong>real code written</strong> will be submitted to Judge0 for validation.
                  Default placeholder comments (e.g. <code>// C++ solution</code>) are automatically excluded.
                  If you check a language, make sure you've written actual code for it.
                </p>
              </div>

              {/* Language Toggles */}
              <div className="flex gap-3">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.value}
                    type="button"
                    onClick={() => toggleLang(lang.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      selectedLangs.includes(lang.value)
                        ? 'border-[#b5fe00] bg-[#b5fe00]/10 text-[#b5fe00]'
                        : 'border-[#444946] text-[#a7aca9] hover:border-[#b5fe00]/30'
                    }`}
                  >
                    <span>{lang.icon}</span>
                    <span className="font-semibold">{lang.label}</span>
                  </button>
                ))}
              </div>

              {/* Code Editor Dropdown */}
              <div className="space-y-4">
                <select
                  value={selectedCodeLang}
                  onChange={(e) => setSelectedCodeLang(e.target.value)}
                  className="w-full bg-[#1a2e00]/20 border border-[#444946] rounded-lg px-4 py-3 text-[#f9fdf9] focus:border-[#b5fe00] focus:outline-none"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>

                {/* Start Code Editor */}
                <div>
                  <label className="block text-sm font-semibold text-[#a7aca9] mb-2">
                    Starter Code ({languageOptions.find(l => l.value === selectedCodeLang)?.label})
                  </label>
                  <textarea
                    {...register(`startCode.${languageOptions.findIndex(l => l.value === selectedCodeLang)}.initialCode`)}
                    rows={8}
                    className="w-full bg-[#0A0F0D] border border-[#444946] rounded-lg px-4 py-3 text-[#f9fdf9] font-mono text-sm focus:border-[#b5fe00] focus:outline-none resize-none"
                    placeholder={`// ${languageOptions.find(l => l.value === selectedCodeLang)?.label} starter code`}
                  />
                  {errors.startCode?.[languageOptions.findIndex(l => l.value === selectedCodeLang)]?.initialCode && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.startCode[languageOptions.findIndex(l => l.value === selectedCodeLang)].initialCode.message}
                    </p>
                  )}
                </div>

                {/* Reference Solution Editor */}
                <div>
                  <label className="block text-sm font-semibold text-[#a7aca9] mb-2">
                    Reference Solution ({languageOptions.find(l => l.value === selectedCodeLang)?.label})
                  </label>
                  <textarea
                    {...register(`referenceSolution.${languageOptions.findIndex(l => l.value === selectedCodeLang)}.completeCode`)}
                    rows={12}
                    className="w-full bg-[#0A0F0D] border border-[#444946] rounded-lg px-4 py-3 text-[#f9fdf9] font-mono text-sm focus:border-[#b5fe00] focus:outline-none resize-none"
                    placeholder={`// ${languageOptions.find(l => l.value === selectedCodeLang)?.label} complete solution`}
                  />
                  {errors.referenceSolution?.[languageOptions.findIndex(l => l.value === selectedCodeLang)]?.completeCode && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.referenceSolution[languageOptions.findIndex(l => l.value === selectedCodeLang)].completeCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(182,255,0,0.08)]">
                <p className="text-[10px] text-[#a7aca9]/40 text-center">
                  💡 Only checked languages with real code written will be submitted. Use dropdown to edit each one.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-4 pt-2 pb-4">
              <button type="button" onClick={onClose}
                className="px-8 py-3.5 rounded-full border border-[#444946] text-[#a7aca9] font-medium hover:border-[#b5fe00]/30 hover:text-[#f9fdf9] transition-all">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting || selectedLangs.length === 0}
                className="bg-[#b5fe00] text-[#1a2e00] px-10 py-3.5 rounded-full font-bold text-base uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(182,255,0,0.2)] hover:shadow-[0_0_40px_rgba(182,255,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group">
                {isSubmitting ? (
                  <><span className="animate-spin">⏳</span>Updating...</>
                ) : (
                  <>Save Changes<span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">save</span></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Problem Update Page ──────────────────────────────────────────────────────
function ProblemUpdate() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProblem, setEditingProblem] = useState(null);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/problem/getAllProblem');
      setProblems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFullProblem = async (id) => {
    try {
      const res = await axiosClient.get(`/problem/getProblem/${id}`);
      setEditingProblem(res.data);
    } catch (err) {
      alert('Failed to load problem: ' + (err.response?.data || err.message));
    }
  };

  useEffect(() => { fetchProblems(); }, []);

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#f9fdf9] mb-2 tracking-tight font-['Space_Grotesk']">
          Problem Update
        </h1>
        <p className="text-[#a7aca9] text-base font-light">
          Select a problem to edit and update its details.
        </p>
      </div>

      <div className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-xl border border-[rgba(182,255,0,0.08)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[rgba(182,255,0,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#f9fdf9] font-['Space_Grotesk'] uppercase tracking-widest">
              Problem Selection Registry
            </h2>
            <span className="text-xs text-[#a7aca9]/60 font-mono">
              Step 1: Identify Target Problem
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[60px_1fr_120px_120px_160px_140px] gap-4 px-6 py-3 border-b border-[rgba(182,255,0,0.05)]">
          {['ID', 'PROBLEM IDENTITY', 'DIFFICULTY', 'TAGS', 'VIDEO STATUS', 'ACTION'].map(h => (
            <span key={h} className="text-[10px] font-bold text-[#a7aca9]/60 uppercase tracking-widest">{h}</span>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-[#a7aca9]">
              <span className="animate-spin material-symbols-outlined text-[#b5fe00]">refresh</span>
              <span className="text-sm">Loading problems...</span>
            </div>
          </div>
        ) : problems.length === 0 ? (
          <div className="py-16 text-center text-[#a7aca9]/40 text-sm">No problems found.</div>
        ) : (
          <div className="divide-y divide-[rgba(182,255,0,0.04)]">
            {problems.map((p) => (
              <div
                key={p._id}
                className="grid grid-cols-[60px_1fr_120px_120px_160px_140px] gap-4 px-6 py-4 items-center hover:bg-[rgba(182,255,0,0.02)] transition-colors group"
              >
                <span className="text-xs font-mono text-[#a7aca9]/50 truncate">
                  #{p._id.slice(-6)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#f9fdf9] group-hover:text-[#b5fe00] transition-colors">
                    {p.title}
                  </p>
                  <p className="text-xs text-[#a7aca9]/50 capitalize mt-0.5">{p.difficulty}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider w-fit ${difficultyColor(p.difficulty)}`}>
                  {p.difficulty}
                </span>
                <div className="flex flex-wrap gap-1">
                  {(Array.isArray(p.tags) ? p.tags : [p.tags]).slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#444946]/40 text-[#a7aca9] border border-[#444946]/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#b5fe00]/40 bg-[#b5fe00]/10 text-[#b5fe00]">
                    <span className="material-symbols-outlined text-sm">smart_display</span>
                    Watch Video
                  </span>
                </div>
                <button
                  onClick={() => fetchFullProblem(p._id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#444946] text-[#f9fdf9] text-xs font-bold uppercase tracking-wider hover:border-[#b5fe00]/50 hover:text-[#b5fe00] hover:bg-[#b5fe00]/5 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingProblem && (
        <EditModal
          problem={editingProblem}
          onClose={() => setEditingProblem(null)}
          onUpdated={fetchProblems}
        />
      )}

      <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/2 bg-[#b5fe00]/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-[#68fcbf]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        textarea, input, select { transition: all 0.2s ease; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #444946; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default ProblemUpdate;