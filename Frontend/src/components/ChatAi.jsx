import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// Create axios instance
const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 30000,
    withCredentials: true,
});

// SVG Icons
const IconSend = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

const IconBot = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM7.5 14a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM21 19H3v2h18v-2z" />
    </svg>
);

const IconUser = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
);

const IconSparkle = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
        <path d="M12 1L9.5 8.5H2L8 13l-2.5 7.5L12 16l6.5 4.5L16 13l6-4.5h-7.5z" />
    </svg>
);

function ChatAi({ problem }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const { register, handleSubmit, reset, watch } = useForm();
    const messagesEndRef = useRef(null);
    const inputValue = watch("message", "");
    const lastProblemId = useRef(null);

    // THIS IS THE MAGIC FIX - It clears chat when problem changes!
    useEffect(() => {
        // Check if problem changed
        if (problem?.id && problem.id !== lastProblemId.current) {
            lastProblemId.current = problem.id;
            
            // Clear old messages and start fresh for new problem
            setMessages([{
                role: 'model',
                content: `Hi! I'm your AI coding assistant. 👋\n\nI see you're working on: **${problem.title}**\n\n${problem.description?.substring(0, 300)}...\n\nWhat would you like help with? I can give you hints, explain the solution, or review your code! 🚀`
            }]);
        } else if (problem?.id && messages.length === 0) {
            // First time loading
            setMessages([{
                role: 'model',
                content: `Hi! I'm your AI coding assistant. 👋\n\nI see you're working on: **${problem.title}**\n\n${problem.description?.substring(0, 300)}...\n\nWhat would you like help with? I can give you hints, explain the solution, or review your code! 🚀`
            }]);
        }
    }, [problem?.id, problem?.title, problem?.description]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const onSubmit = async (data) => {
        const userMsg = data.message.trim();
        if (!userMsg) return;

        const userMessage = { role: 'user', content: userMsg };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        reset();
        setIsTyping(true);

        try {
            // Convert messages to Gemini format
            const geminiMessages = updatedMessages.map(m => ({
                role: m.role,
                parts: [{ text: m.content }]
            }));

            const response = await axiosClient.post("/ai/chat", {
                messages: geminiMessages,
                title: problem?.title || "No title provided",
                description: problem?.description || "No description provided",
                testCases: problem?.testCases || [],
                startCode: problem?.startCode || "No starting code provided",
                problemId: problem?.id || null
            });

            const aiResponse = response.data.message || "I've processed your request.";
            setMessages(prev => [...prev, {
                role: 'model',
                content: aiResponse
            }]);

        } catch (error) {
            console.error("API Error:", error);

            let errorMessage = "Sorry, I encountered an error. Please try again.";

            if (error.code === 'ERR_NETWORK' || error.code === 'ERR_SOCKET_NOT_CONNECTED') {
                errorMessage = "Cannot connect to server. Please make sure the backend is running on port 8080.";
            } else if (error.response?.status === 401) {
                errorMessage = "Session expired. Please log in again.";
            } else if (error.response?.status === 500) {
                errorMessage = `Server error: ${error.response?.data?.message || "Please try again later."}`;
            }

            setMessages(prev => [...prev, {
                role: 'model',
                content: errorMessage
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            height: '100%', minHeight: 0,
            background: 'transparent',
            fontFamily: 'Inter, sans-serif',
        }}>
            {/* Messages area */}
            <div style={{
                flex: 1, overflowY: 'auto', padding: '12px 4px',
                display: 'flex', flexDirection: 'column', gap: 16,
            }}>
                {messages.map((msg, index) => {
                    const isModel = msg.role === 'model';
                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: isModel ? 'row' : 'row-reverse',
                                alignItems: 'flex-end',
                                gap: 10,
                            }}
                        >
                            {/* Avatar */}
                            <div style={{
                                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: isModel ? 'rgba(182,255,0,0.12)' : 'rgba(104,252,191,0.12)',
                                border: `1px solid ${isModel ? 'rgba(182,255,0,0.25)' : 'rgba(104,252,191,0.25)'}`,
                                color: isModel ? '#B6FE00' : '#68FCBF',
                            }}>
                                {isModel ? <IconBot /> : <IconUser />}
                            </div>

                            {/* Message bubble */}
                            <div style={{
                                maxWidth: '78%',
                                padding: '10px 14px',
                                borderRadius: isModel ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                                background: isModel ? 'rgba(21,27,24,0.8)' : 'rgba(182,255,0,0.08)',
                                border: isModel ? '1px solid rgba(182,255,0,0.1)' : '1px solid rgba(182,255,0,0.2)',
                                fontSize: 13,
                                lineHeight: 1.7,
                                color: isModel ? '#D4F0E0' : '#F9FDF9',
                                backdropFilter: 'blur(10px)',
                            }}>
                                {isModel && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                                        <IconSparkle />
                                        <span style={{ fontSize: 10, fontWeight: 700, color: '#B6FE00' }}>AI ASSISTANT</span>
                                    </div>
                                )}
                                <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.content}</span>
                            </div>
                        </div>
                    );
                })}

                {/* Typing indicator */}
                {isTyping && (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(182,255,0,0.12)', border: '1px solid rgba(182,255,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B6FE00', flexShrink: 0 }}>
                            <IconBot />
                        </div>
                        <div style={{ padding: '12px 16px', borderRadius: '4px 14px 14px 14px', background: 'rgba(21,27,24,0.8)', border: '1px solid rgba(182,255,0,0.1)', display: 'flex', gap: 5, alignItems: 'center' }}>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#B6FE00', display: 'inline-block', animation: 'bounce 1.2s ease-in-out 0s infinite' }} />
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#B6FE00', display: 'inline-block', animation: 'bounce 1.2s ease-in-out 0.2s infinite' }} />
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#B6FE00', display: 'inline-block', animation: 'bounce 1.2s ease-in-out 0.4s infinite' }} />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div style={{
                flexShrink: 0, paddingTop: 12,
                borderTop: '1px solid rgba(182,255,0,0.08)',
                marginTop: 4,
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{
                        display: 'flex', alignItems: 'flex-end', gap: 10,
                        background: 'rgba(21,27,24,0.7)',
                        border: '1px solid rgba(182,255,0,0.2)',
                        borderRadius: 14,
                        padding: '10px 12px',
                        backdropFilter: 'blur(12px)',
                    }}>
                        <textarea
                            placeholder="Ask about this problem..."
                            onKeyDown={handleKeyDown}
                            rows={1}
                            {...register("message", { required: true, minLength: 2 })}
                            style={{
                                flex: 1, background: 'none', border: 'none', outline: 'none',
                                color: '#F9FDF9', fontSize: 13, lineHeight: 1.6,
                                resize: 'none', fontFamily: 'Inter, sans-serif',
                                maxHeight: 100, overflowY: 'auto',
                            }}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!inputValue || inputValue.trim().length < 2 || isTyping}
                            style={{
                                width: 34, height: 34, borderRadius: 10,
                                border: 'none', cursor: inputValue?.trim().length >= 2 && !isTyping ? 'pointer' : 'not-allowed',
                                background: inputValue?.trim().length >= 2 && !isTyping ? '#B6FE00' : 'rgba(182,255,0,0.15)',
                                color: inputValue?.trim().length >= 2 && !isTyping ? '#415E00' : '#A7ACA9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <IconSend />
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
                    30% { transform: translateY(-6px); opacity: 1; }
                }
                textarea::placeholder { color: rgba(167,172,169,0.5); }
            `}</style>
        </div>
    );
}

export default ChatAi;