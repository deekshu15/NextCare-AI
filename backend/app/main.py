from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.assessment import router as assessment_router
from app.api.chat import router as chat_router
from app.api.dashboard import router as dashboard_router
from app.api.auth import router as auth_router

app = FastAPI(
    title="NextCare AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(assessment_router)
app.include_router(chat_router)
app.include_router(dashboard_router)

@app.get("/")
def root():

    return {
        "success": True,
        "message": "NextCare AI API Running"
    }