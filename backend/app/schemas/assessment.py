from uuid import UUID
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class AssessmentRequest(BaseModel):

    symptoms: str = Field(..., min_length=5)

    duration: str

    pain_level: int = Field(..., ge=1, le=10)

    medical_history: Optional[str] = None


class AssessmentResponse(BaseModel):

    id: UUID

    symptoms: str

    duration: str

    pain_level: int

    medical_history: Optional[str]

    urgency_level: Optional[str]

    recommended_specialist: Optional[str]

    ai_summary: Optional[str]

    next_steps: Optional[str]

    warning_signs: Optional[str]

    created_at: datetime

    class Config:
        from_attributes = True