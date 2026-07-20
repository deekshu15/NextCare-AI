from app.ai.ollama import generate_response

response = generate_response(

    symptoms="I have chest pain for 30 minutes.",

    urgency="High",

    specialist="Cardiologist"

)

print(response)