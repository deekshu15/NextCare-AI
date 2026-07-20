import requests

from app.ai.prompts import SYSTEM_PROMPT
from app.ai.response_parser import parse_ai_response

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma3:4b"


def generate_response(
    symptoms: str,
    urgency: str,
    specialist: str
):

    prompt = f"""
{SYSTEM_PROMPT}

Patient Symptoms:
{symptoms}

Urgency:
{urgency}

Recommended Specialist:
{specialist}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        }
    )

    return parse_ai_response(
        response.json()["response"]
    )


def chat_response(
    context: str,
    question: str
):

    prompt = f"""
Assessment Context:

{context}

User Question:

{question}

Answer in simple language.
Never diagnose.
Keep the answer under 150 words.
"""

    response = requests.post(

        OLLAMA_URL,

        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        }

    )

    return response.json()["response"]