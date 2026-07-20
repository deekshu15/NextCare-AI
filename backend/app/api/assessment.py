from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.assessment import Assessment
from app.models.user import User
from app.schemas.assessment import (
    AssessmentRequest,
    AssessmentResponse
)
from app.core.security import get_current_user
from app.ai.rules import analyze_symptoms
from app.ai.ollama import generate_response

router = APIRouter(
    prefix="/assessment",
    tags=["Assessment"]
)


@router.post(
    "/analyze",
    response_model=AssessmentResponse
)
def analyze_assessment(
    request: AssessmentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    rule_result = analyze_symptoms(
        request.symptoms
    )

    ai_result = generate_response(

        symptoms=request.symptoms,

        urgency=rule_result["urgency"],

        specialist=rule_result["specialist"]

    )

    assessment = Assessment(

        user_id=current_user.id,

        symptoms=request.symptoms,

        duration=request.duration,

        pain_level=request.pain_level,

        medical_history=request.medical_history,

        urgency_level=rule_result["urgency"],

        recommended_specialist=rule_result["specialist"],

        ai_summary=ai_result["summary"],

        next_steps=ai_result["next_steps"],

        warning_signs=ai_result["warning_signs"]

    )

    db.add(assessment)

    db.commit()

    db.refresh(assessment)

    return assessment


@router.get(
    "/history",
    response_model=list[AssessmentResponse]
)
def assessment_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return (

        db.query(Assessment)

        .filter(
            Assessment.user_id == current_user.id
        )

        .order_by(
            Assessment.created_at.desc()
        )

        .all()

    )


@router.get(
    "/{assessment_id}",
    response_model=AssessmentResponse
)
def get_assessment(

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

    return assessment