import { useState, useEffect } from "react";
import api from "./axios.js";

function Chatbot() {
    const [testBackendMessage, setTestBackendMessage] = useState("");
    const [query, setQuery] = useState("");
    const [botResponse, setBotResponse] = useState("");

    const callBackend = async () => {
        try {
            const response = await api.testReceive();
            if (response.data && response.data.message) {
                setTestBackendMessage(response.data.message)
            }
        } catch (err) {
            console.error("Error calling the backend:", err);
        }
    }

    const callGPT = async () => {
        try {
            const response = await api.getGPTResponse(query);
            if (response.data && response.data.message) {
                setBotResponse(response.data.message)
            }
        } catch (err) {
            console.error("Error calling the backend:", err);
        }
    }

    useEffect(() => {
        console.log("UseEffect Called");
        callBackend();
    }, [])

    return (
        <div>
            This is a Chatbot!
            <div>
                {testBackendMessage}
            </div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={() => callGPT()}>Send</button>
            <div>
                {botResponse}
            </div>
        </div>
    );
}

export default Chatbot;
