from typing import Dict


def analyze_symptoms(symptoms: str) -> Dict:

    symptoms = symptoms.lower()

    if "chest pain" in symptoms:
        return {
            "urgency": "High",
            "specialist": "Cardiologist",
            "emergency": True
        }

    elif "fever" in symptoms:
        return {
            "urgency": "Medium",
            "specialist": "General Physician",
            "emergency": False
        }

    elif "headache" in symptoms:
        return {
            "urgency": "Low",
            "specialist": "Neurologist",
            "emergency": False
        }

    elif "stomach pain" in symptoms:
        return {
            "urgency": "Medium",
            "specialist": "Gastroenterologist",
            "emergency": False
        }

    elif "skin rash" in symptoms:
        return {
            "urgency": "Low",
            "specialist": "Dermatologist",
            "emergency": False
        }

    return {
        "urgency": "Unknown",
        "specialist": "General Physician",
        "emergency": False
    }