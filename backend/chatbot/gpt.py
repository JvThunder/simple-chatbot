import os
import openai
from dotenv import load_dotenv
import uuid

# Load environment variables from .env file
load_dotenv()

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
chat_sessions_dict = {}
SYSTEM_PROMPT = """
You are a helpful assistant that can answer questions and help with tasks. Follow the user's prompt instructions.
"""

def get_chat_session_id():
    print("Creating chat session")
    chat_session_id = str(uuid.uuid4())
    chat_sessions_dict[chat_session_id] = {
        "message_history": [
            {"role": "system", "content": SYSTEM_PROMPT}
        ],
    }
    return chat_session_id

def gpt_call(query, chat_session_id, context=None):
    if chat_session_id not in chat_sessions_dict:
        return {"error": "Chat session not found"}

    # Append only the user query (without additional context) to the persistent chat history
    chat_sessions_dict[chat_session_id]["message_history"].append(
        {"role": "user", "content": query}
    )

    # Build the messages list that will be sent to the model
    messages_for_call = chat_sessions_dict[chat_session_id]["message_history"].copy()

    # If extra context (e.g. file content) is provided, include it for this single call
    if context:
        messages_for_call.append({"role": "user", "content": f"Additional context from user:\n{context}"})

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages_for_call,
        max_tokens=1000,
        temperature=0.7,
    )

    model_response = response.choices[0].message.content
    chat_sessions_dict[chat_session_id]["message_history"].append(
        {"role": "assistant", "content": model_response}
    )

    return chat_sessions_dict[chat_session_id]["message_history"][1:]

def get_chat_session_message_history(chat_session_id):
    if chat_session_id not in chat_sessions_dict:
        return {"error": "Chat session not found"}
    return chat_sessions_dict[chat_session_id]["message_history"][1:]