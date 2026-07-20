from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.security import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.auth import (
    RegisterSchema,
    LoginSchema,
    TokenSchema
)
from app.schemas.user import UserResponse
from app.core.security import (
    get_current_user,
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: RegisterSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists."
        )

    new_user = User(

        full_name=user.full_name,

        email=user.email,

        password_hash=hash_password(
            user.password
        ),

        age=user.age,

        gender=user.gender

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


@router.post(
    "/login",
    response_model=TokenSchema
)
def login(
    credentials: LoginSchema,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == credentials.email
    ).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if not verify_password(
        credentials.password,
        user.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

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

@router.get("/me")
def me(
    current_user = Depends(get_current_user)
):

    return current_user
    