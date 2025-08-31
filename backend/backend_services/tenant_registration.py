import uuid
import bcrypt
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from Database_operations.init_db import get_db
from models import TenantRegistration

router = APIRouter()

@router.post("/api/tenant/register")
def register_tenant(data: TenantRegistration, db=Depends(get_db)):
    existing = db.execute("SELECT email FROM users WHERE email = ?", (data.admin_email,)).fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    tenant_id = str(uuid.uuid4())
    user_id = str(uuid.uuid4())
    password_hash = bcrypt.hashpw(data.admin_password.encode(), bcrypt.gensalt()).decode()
    now = datetime.utcnow()
    role = "admin"

    db.execute(
        "INSERT INTO tenants (tenant_id, company_name, created_at) VALUES (?, ?, ?)",
        (tenant_id, data.company_name, now)
    )
    db.execute(
        """INSERT INTO users (user_id, tenant_id, first_name, last_name, email, phone, role, password_hash, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (user_id, tenant_id, data.admin_first_name, data.admin_last_name,
         data.admin_email, data.admin_phone, role, password_hash, now)
    )

    return {"success": True, "message": "Tenant registered successfully", "tenant_id": tenant_id}
