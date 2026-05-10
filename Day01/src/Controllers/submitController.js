const Problem = require('../Models/problem');
const Submission = require('../Models/submissionModel');
const { getLanguageByid, submitBatch, submitToken } = require('../Utils/problemUtil');

// ✅ Centralized language normalizer — fixes the 422 error for ALL languages
const normalizeLanguage = (language) => {
    const map = {
        'cpp': 'c++',
        'c++': 'c++',
        'C++': 'c++',
        'CPP': 'c++',
        'java': 'java',
        'Java': 'java',
        'JAVA': 'java',
        'javascript': 'javascript',
        'JavaScript': 'javascript',
        'JS': 'javascript',
        'js': 'javascript',
        'python': 'python',
        'Python': 'python',
        'PYTHON': 'python',
    };
    return map[language] || language.toLowerCase();
};

const userSubmission = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        let { code, language } = req.body;

        if (!userId || !problemId || !code || !language) {
            return res.status(400).send("MISSING PARAMETERS");
        }

        // ✅ Normalize language using central function
        language = normalizeLanguage(language);

        const problem = await Problem.findById(problemId);

        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status: 'Pending',
            testCaseTotal: problem.hiddenTestCases.length
        });

        const languageId = getLanguageByid(language);

        if (!languageId) {
            return res.status(400).send(`Unsupported language: ${language}`);
        }

        const submission = problem.hiddenTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

        const submitResult = await submitBatch(submission);
        const resultToken = submitResult.map((result) => result.token);
        const testResult = await submitToken(resultToken);

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = 'Accepted';
        let errormessage = '';

        for (const test of testResult) {
            if (test.status_id === 3) {
                testCasesPassed++;
                runtime = runtime + parseFloat(test.time || 0);
                memory = Math.max(memory, test.memory || 0);
            } else {
                if (test.status_id === 4) {
                    status = 'Runtime Error';
                    errormessage = test.stderr || '';
                } else if (test.status_id === 5) {
                    status = 'Time Limit Exceeded';
                    errormessage = test.stderr || '';
                } else if (test.status_id === 6) {
                    status = 'Compilation Error';
                    errormessage = test.compile_output || test.stderr || '';
                } else {
                    status = 'Wrong Answer';
                    errormessage = test.stderr || '';
                }
            }
        }

        submittedResult.status = status;
        submittedResult.testcasesPassed = testCasesPassed;
        submittedResult.runtime = runtime;
        submittedResult.memory = memory;
        submittedResult.errorMessage = errormessage;

        await submittedResult.save();

        if (status === 'Accepted' && !req.result.problemSolved.includes(problemId)) {
            req.result.problemSolved.push(problemId);
            await req.result.save();
        }

        res.status(200).json({
            accepted: status === 'Accepted',
            totalTestCases: submittedResult.testCaseTotal,
            passedTestCases: testCasesPassed,
            runtime,
            memory,
            status,
            errorMessage: errormessage,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR SUBMISSION");
    }
};

const runCode = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        let { code, language } = req.body;

        if (!userId || !problemId || !code || !language) {
            return res.status(400).send("MISSING PARAMETERS");
        }

        // ✅ FIXED: Was missing normalization — this was the direct cause of the 422 error
        language = normalizeLanguage(language);

        const problem = await Problem.findById(problemId);
        const languageId = getLanguageByid(language);

        if (!languageId) {
            return res.status(400).send(`Unsupported language: ${language}`);
        }

        const submission = problem.visibleTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

        const submitResult = await submitBatch(submission);
        const resultToken = submitResult.map((result) => result.token);
        const testResult = await submitToken(resultToken);

        res.status(200).json({
            success: testResult.every(t => t.status_id === 3),
            runtime: testResult.reduce((a, t) => a + parseFloat(t.time || 0), 0).toFixed(3),
            memory: Math.max(...testResult.map(t => t.memory || 0)),
            testCases: testResult.map(t => ({
                status_id: t.status_id,
                status: t.status?.description,
                time: t.time,
                memory: t.memory,
                stdout: t.stdout,
                stderr: t.stderr,
                compile_output: t.compile_output,
            }))
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR SUBMISSION");
    }
};

module.exports = { userSubmission, runCode };