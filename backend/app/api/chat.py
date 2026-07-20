from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.chat import ChatHistory
from app.models.assessment import Assessment
from app.models.user import User

from app.schemas.chat import (
    ChatRequest,
    ChatResponse
)

from app.core.security import get_current_user

from app.ai.ollama import chat_response

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


@router.post(
    "/ask",
    response_model=ChatResponse
)
def ask_ai(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    assessment = (

        db.query(Assessment)

        .filter(
            Assessment.id == request.assessment_id,
            Assessment.user_id == current_user.id
        )

        .first()

    )

    if not assessment:

        raise HTTPException(
            status_code=404,
            detail="Assessment not found."
        )

    context = f"""

Symptoms:
{assessment.symptoms}

Duration:
{assessment.duration}

Pain Level:
{assessment.pain_level}

Medical History:
{assessment.medical_history}

Urgency:
{assessment.urgency_level}

Specialist:
{assessment.recommended_specialist}

Summary:
{assessment.ai_summary}

Next Steps:
{assessment.next_steps}

Warning Signs:
{assessment.warning_signs}

"""

    answer = chat_response(
        context=context,
        question=request.question
    )

    chat = ChatHistory(

        assessment_id=assessment.id,

        user_question=request.question,

        ai_response=answer

    )

    db.add(chat)

    db.commit()

    db.refresh(chat)

    return chat


@router.get(
    "/history/{assessment_id}",
    response_model=list[ChatResponse]
)
def chat_history(

    assessment_id: str,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    assessment = (

        db.query(Assessment)

        .filter(
            Assessment.id == assessment_id,
            Assessment.user_id == current_user.id
        )

        .first()

    )

    if not assessment:

        raise HTTPException(
            status_code=404,
            detail="Assessment not found."
        )

    return (

        db.query(ChatHistory)

        .filter(
            ChatHistory.assessment_id == assessment.id
        )

        .order_by(
            ChatHistory.created_at.asc()
        )

        .all()

    )