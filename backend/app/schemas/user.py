from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):

    id: UUID

    full_name: str

    email: EmailStr

    age: int

    gender: str

    class Config:

        from_attributes = True