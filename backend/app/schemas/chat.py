from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class ChatRequest(BaseModel):
    assessment_id: UUID
    question: str


class ChatResponse(BaseModel):
    id: UUID
    assessment_id: UUID
    user_question: str
    ai_response: str
    created_at: datetime

    class Config:
        from_attributes = True