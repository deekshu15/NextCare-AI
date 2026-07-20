import uuid

from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


class Assessment(Base):

    __tablename__ = "assessments"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    symptoms = Column(Text, nullable=False)

    duration = Column(String(100))

    pain_level = Column(Integer)

    medical_history = Column(Text)

    urgency_level = Column(String(50))

    recommended_specialist = Column(String(100))

    ai_summary = Column(Text)

    next_steps = Column(Text)

    warning_signs = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="assessments"
    )

    chats = relationship(
        "ChatHistory",
        back_populates="assessment",
        cascade="all, delete-orphan"
    )