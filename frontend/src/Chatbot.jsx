import { useState, useEffect } from "react";
import api from "./axios.js";

function Chatbot() {
    const [testBackendMessage, setTestBackendMessage] = useState("");

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

    useEffect(() => {
        console.log("UseEffect Called");
        callBackend();
        getGPTResponse(query);
    }, [])

    return (
        <div>
            This is a Chatbot!
            <div>
                {testBackendMessage}
            </div>
        </div>
    );
}

export default Chatbot;
