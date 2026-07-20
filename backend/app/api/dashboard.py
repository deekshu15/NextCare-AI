from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.models.assessment import Assessment
from app.core.security import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    assessments = (

        db.query(Assessment)

        .filter(
            Assessment.user_id == current_user.id
        )

        .all()

    )

    total = len(assessments)

    high = len([
        a for a in assessments
        if a.urgency_level == "High"
    ])

    medium = len([
        a for a in assessments
        if a.urgency_level == "Medium"
    ])

    low = len([
        a for a in assessments
        if a.urgency_level == "Low"
    ])

    recent = (

        db.query(Assessment)

        .filter(
            Assessment.user_id == current_user.id
        )

        .order_by(
            Assessment.created_at.desc()
        )

        .limit(5)

        .all()

    )

    return {

        "total_assessments": total,

        "high_priority": high,

        "medium_priority": medium,

        "low_priority": low,

        "recent_assessments": [

            {
                "id": str(item.id),
                "symptoms": item.symptoms,
                "urgency": item.urgency_level,
                "specialist": item.recommended_specialist,
                "date": item.created_at
            }

            for item in recent

        ]

    }