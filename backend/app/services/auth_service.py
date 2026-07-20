from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


class AuthService:

    @staticmethod
    def register(
        db: Session,
        user_data: RegisterRequest
    ):

        existing_user = db.query(User).filter(
            User.email == user_data.email
        ).first()

        if existing_user:
            raise ValueError("Email already registered.")

        new_user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            password_hash=hash_password(user_data.password),
            age=user_data.age,
            gender=user_data.gender
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    @staticmethod
    def login(
        db: Session,
        login_data: LoginRequest
    ):

        user = db.query(User).filter(
            User.email == login_data.email
        ).first()

        if not user:
            raise ValueError("Invalid email or password.")

        if not verify_password(
            login_data.password,
            user.password_hash
        ):
            raise ValueError("Invalid email or password.")

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }