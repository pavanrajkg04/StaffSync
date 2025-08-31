import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from models import LoginRequest  # import your pydantic schema
from Database_operations.init_db import get_db

router = APIRouter()

@router.post("/api/login")
def login(data: LoginRequest, db=Depends(get_db)):
    row = db.execute(
        "SELECT user_id, tenant_id, first_name, last_name, email, password_hash FROM users WHERE email = ?",
        (data.email,)
    ).fetchone()

    if not row:
        raise HTTPException(status_code=401, detail="Email or password is incorrect")

    user_id, tenant_id, first_name, last_name, email, password_hash = row
    # password_hash must be str, encode as needed
    if isinstance(password_hash, str):
        password_hash = password_hash.encode()

    if not bcrypt.checkpw(data.password.encode(), password_hash):
        raise HTTPException(status_code=401, detail="Email or password is incorrect")

    # For demo, just return user basic profile (you may want JWT in production)
    return {
        "success": True,
        "user": {
            "user_id": user_id,
            "tenant_id": tenant_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email
        }
    }
