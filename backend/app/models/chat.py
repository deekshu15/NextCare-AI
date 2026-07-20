import uuid

from sqlalchemy import Column, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


class ChatHistory(Base):

    __tablename__ = "chat_history"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    assessment_id = Column(
        UUID(as_uuid=True),
        ForeignKey("assessments.id"),
        nullable=False
    )

    user_question = Column(Text)

    ai_response = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    assessment = relationship(
        "Assessment",
        back_populates="chats"
    )