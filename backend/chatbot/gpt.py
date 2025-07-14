import os
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def gpt_call(query):
    
    # Set up your OpenAI client
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Follow the user's prompt instructions."},
            {"role": "user", "content": query}
        ],
        max_tokens=1000,
        temperature=0.7,
    )

    return response.choices[0].message.content