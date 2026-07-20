from pydantic import BaseModel, EmailStr, Field


class RegisterSchema(BaseModel):

    full_name: str = Field(..., min_length=3)

    email: EmailStr

    password: str = Field(..., min_length=6)

    age: int

    gender: str


class LoginSchema(BaseModel):

    email: EmailStr

    password: str


class TokenSchema(BaseModel):

    access_token: str

    token_type: str = "bearer"