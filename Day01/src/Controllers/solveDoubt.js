const Groq = require("groq-sdk");

const solveDoubt = async (req, res) => {
    try {
        const { messages, title, description, testCases, startCode } = req.body;

        // Validate messages
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ message: "Messages are required" });
        }

        const client = new Groq({ apiKey: process.env.GROQ_KEY });

        // Convert messages to Groq format
        const formattedMessages = messages.map(m => ({
            role: m.role === 'model' ? 'assistant' : m.role,
            content: Array.isArray(m.parts)
                ? m.parts.map(p => p.text).join("")
                : m.content
        }));

        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
You are an expert DSA tutor. Help with this specific problem only.

## CURRENT PROBLEM (THIS IS THE ONLY PROBLEM YOU CAN HELP WITH):
TITLE: ${title}
DESCRIPTION: ${description}
EXAMPLES: ${JSON.stringify(testCases, null, 2)}
STARTING CODE: ${startCode}

## IMPORTANT RULES:
1. ONLY help with the problem shown above
2. When user asks for hints, give step-by-step hints for THIS problem
3. Always mention the problem name in your response
4. Break down hints into small steps
5. Never give hints for different problems

## HOW TO GIVE HINTS:
Step 1: Restate the problem to show you understand
Step 2: Ask guiding question
Step 3: Give first small hint
Step 4: Wait for user to try
Step 5: Give next hint if needed

## EXAMPLE HINT RESPONSE:
"Let me help you solve [PROBLEM NAME]!

First, let's understand what this problem wants: [restate in simple words]

Here's hint #1: Think about what data structure would be best. Do you need to store pairs of data? Maybe a hash map would work!

Try that and let me know what you think. I'll give you the next hint after you try! 🤗"

Always be encouraging and helpful to learners!
`
                },
                ...formattedMessages
            ],
            max_tokens: 1024,
            temperature: 0.7,
        });

        const reply = response.choices[0].message.content;
        res.status(201).json({ message: reply });

    } catch (err) {
        console.error("Groq Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = solveDoubt;