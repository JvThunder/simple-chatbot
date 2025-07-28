import { useState, useEffect, useRef } from "react";
import api from "./axios.js";
import ChatComponent from "./ChatComponent.jsx";

function Chatbot() {
    const [testBackendMessage, setTestBackendMessage] = useState("");
    const [query, setQuery] = useState("");
    const [botResponse, setBotResponse] = useState([]);
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
                setBotResponse(response.data.message)
                setQuery("")
            }
        } catch (err) {
            console.error("Error calling the backend:", err);
        }
    }

    const createChatSession = async () => {

        try {
            if (chatSessionId === "") {
                const response = await api.createChatSession();
                if (response.data && response.data.chat_session_id) {
                    setChatSessionId(response.data.chat_session_id);
                    console.log("Chat session created:", response.data.chat_session_id);
                }
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
            createChatSession();
        }

        return () => {
            effectRan.current = true;
        }
    }, [])

    return (
        <div>
            This is a Chatbot!
            <div style={{ margin: '20px' }}>
                {botResponse.map((msg, index) => (
                    <ChatComponent key={index} msg={msg} />
                ))}
            </div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={() => callGPT()}>Send</button>
        </div>
    );
}

export default Chatbot;
