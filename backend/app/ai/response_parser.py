import json
import re


def parse_ai_response(response: str):

    try:
        match = re.search(r"\{.*\}", response, re.DOTALL)

        if not match:
            raise ValueError("No JSON found.")

        return json.loads(match.group())

    except Exception:

        return {
            "summary": "Unable to generate AI summary.",
            "next_steps": "",
            "warning_signs": "",
            "home_care": ""
        }