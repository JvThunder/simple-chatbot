import { useState, useEffect, useRef } from "react";
import api from "./axios.js";
import ChatComponent from "./ChatComponent.jsx";

function Chatbot() {
    const [testBackendMessage, setTestBackendMessage] = useState("");
    const [query, setQuery] = useState("");
    const [MessageHistory, setMessageHistory] = useState([]);
    const [chatSessionId, setChatSessionId] = useState("");
    const effectRan = useRef(false);

    const callBackend = async () => {
        try {
            const response = await api.testReceive();
            if (response.data && response.data.message) {
                setTestBackendMessage(response.data.message)
                console.log("Test backend message:", response.data.message);
            }
        } catch (err) {
            console.error("Error calling the backend:", err);
        }
    }

    const callGPT = async () => {
        try {
            const response = await api.getGPTResponse(query, chatSessionId);
            if (response.data && response.data.message) {
                setMessageHistory(response.data.message)
                setQuery("")
            }
        } catch (err) {
            console.error("Error calling the backend:", err);
        }
    }

    const getChatSession = async () => {
        try {
            const url = new URL(window.location.href);
            // http://localhost:3000/?chat_session_id=123 => chatSessionId = 123
            const tempChatSessionId = url.searchParams.get("chat_session_id");
            console.log("Chat session id:", tempChatSessionId);
            if (tempChatSessionId !== null) {
                console.log("Getting chat session");
                setChatSessionId(tempChatSessionId.toString());
                const response = await api.getChatSession(tempChatSessionId);
                if (response.data && response.data.message_history) {
                    setMessageHistory(response.data.message_history)
                }
            }
            else if (chatSessionId === "") {
                console.log("Creating chat session");
                const response = await api.createChatSession();
                if (response.data && response.data.chat_session_id) {
                    setChatSessionId(response.data.chat_session_id);
                    console.log("Chat session created:", response.data.chat_session_id);
                }
                window.history.pushState({}, "", `/?chat_session_id=${response.data.chat_session_id}`);
            }
        }
        catch (err) {
            console.error("Error creating chat session:", err);
        }
    }

    useEffect(() => {
        if (effectRan.current === false) {
            console.log("UseEffect Called");
            callBackend();
            getChatSession();
        }

        return () => {
            effectRan.current = true;
        }
    }, [])

    return (
        <div>
            This is a Chatbot!
            <div style={{ margin: '20px' }}>
                {MessageHistory.map((msg, index) => (
                    <ChatComponent key={index} msg={msg} />
                ))}
            </div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={() => callGPT()}>Send</button>
            <p>Chat session id: {chatSessionId}</p>
        </div>
    );
}

export default Chatbot;
