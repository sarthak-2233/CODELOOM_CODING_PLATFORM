const Problem = require('../Models/problem');
const { getLanguageByid, submitBatch, submitToken } = require('../Utils/problemUtil');
const User = require('../Models/userModel');
const Submission = require('../Models/submissionModel');
const solutionVideo = require('../Models/solutionVideo');

// ─── Helper: run reference solution through Judge0 ────────────────────────────
const validateReferenceSolution = async (referenceSolution, visibleTestCases) => {
  for (const { language, completeCode } of referenceSolution) {
    const languageId = getLanguageByid(language);

    const submission = visibleTestCases.map((testcase) => ({
      source_code: completeCode,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output
    }));

    const submitResult = await submitBatch(submission);
    const resultToken = submitResult.map((result) => result.token);
    const testResult = await submitToken(resultToken);

    for (const test of testResult) {
      if (test.status_id !== 3) {
        return false; // failed
      }
    }
  }
  return true; // all passed
};

// CREATE PROBLEM CONTROLLER
const createProblem = async (req, res) => {
  const {
    title, description, difficulty, tags,
    visibleTestCases, referenceSolution,
    hiddenTestCases, startCode, problemCreator
  } = req.body;

  try {
    const passed = await validateReferenceSolution(referenceSolution, visibleTestCases);
    if (!passed) {
      return res.status(400).send("ERROR OCCURED IN REFERENCE SOLUTION");
    }

    await Problem.create({
      ...req.body,
      problemCreator: req.body.problemCreator
    });

    res.status(201).send("PROBLEM CREATED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

// DELETE PROBLEM CONTROLLER
const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("PROBLEM ID MISSING");
    }
    const deleted = await Problem.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send("PROBLEM NOT FOUND");
    }
    res.status(200).send("PROBLEM DELETED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR DELETE");
  }
};

// UPDATE PROBLEM CONTROLLER
const updateProblem = async (req, res) => {
  const { id } = req.params;
  const {
    title, description, difficulty, tags,
    visibleTestCases, referenceSolution,
    hiddenTestCases, startCode
  } = req.body;

  try {
    if (!id) return res.status(400).send("PROBLEM ID MISSING");

    const existingProblem = await Problem.findById(id);
    if (!existingProblem) return res.status(404).send("PROBLEM NOT FOUND");

    const passed = await validateReferenceSolution(referenceSolution, visibleTestCases);
    if (!passed) return res.status(400).send("ERROR OCCURED IN REFERENCE SOLUTION");

    // ✅ FIX 1: schema expects tags as a single String, join array
    const tagsForDb = Array.isArray(tags) ? tags.join(',') : tags;

    // ✅ FIX 2: schema has typo "initalCode" not "initialCode", remap it
    const startCodeForDb = startCode.map(s => ({
      language: s.language,
      initalCode: s.initialCode   // remap correct spelling → schema typo
    }));

    await Problem.findByIdAndUpdate(
      id,
      {
        title,
        description,
        difficulty,
        tags: tagsForDb,
        visibleTestCases,
        referenceSolution,
        hiddenTestCases,
        startCode: startCodeForDb,
        problemCreator: existingProblem.problemCreator
      },
      { runValidators: true, new: true }
    );

    res.status(200).send("PROBLEM UPDATED SUCCESSFULLY");
  } catch (error) {
    console.log("UPDATE ERROR DETAILS:", error.message);
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR Update");
  }
};
// FETCH SINGLE PROBLEM CONTROLLER
const getProblem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("Id Not Found");
    }

    const problem = await Problem.findById(id).select(
      'title description difficulty tags visibleTestCases hiddenTestCases referenceSolution startCode problemCreator'
    );

    if (!problem) {
      return res.status(404).send("PROBLEM NOT FOUND");
    }

    // Attach video info if exists
    const videos = await solutionVideo.find({ problemId: id });
    if (videos && videos.length > 0) {
      problem.secureUrl = videos[0]?.secureUrl;
      problem.cloudinaryPublicId = videos[0]?.cloudinaryPublicId;
      problem.thumbnailUrl = videos[0]?.thumbnailUrl;
      problem.duration = videos[0]?.duration;
    }

    res.status(200).send(problem);
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

// FETCH ALL PROBLEMS CONTROLLER
const getAllProblem = async (req, res) => {
  try {
    const allProblems = await Problem.find({}).select('title description difficulty tags');
    if (!allProblems) {
      return res.status(404).send("PROBLEMS NOT FOUND");
    }
    res.status(200).send(allProblems);
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR FETCH ALL");
  }
};

// FETCH SOLVED PROBLEMS CONTROLLER
const solvedProblem = async (req, res) => {
  try {
    const userId = req.result._id;
    const user = await User.findById(userId).populate({
      path: 'problemSolved',
      select: '_id title description difficulty tags'
    });
    res.status(200).send(user.problemSolved);
  } catch (error) {
    res.status(500).send("INTERNAL SERVER ERROR FETCH SOLVED PROBLEMS");
  }
};

// FETCH SUBMISSIONS FOR A PROBLEM CONTROLLER
const submittedProblems = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemid = req.params.pid;

    const submissions = await Submission.find({ userId: userId, problemId: problemid });

    if (submissions.length === 0) {
      return res.status(404).send("NO SUBMISSIONS FOUND FOR THIS PROBLEM");
    }

    res.status(200).send(submissions);
  } catch (error) {
    res.status(500).send("INTERNAL SERVER ERROR FETCH SUBMITTED PROBLEMS");
  }
};

module.exports = {
  createProblem,
  deleteProblem,
  updateProblem,
  getProblem,
  getAllProblem,
  solvedProblem,
  submittedProblems
};