from pydantic import BaseModel, EmailStr

class TenantRegistration(BaseModel):
    company_name: str
    admin_first_name: str
    admin_last_name: str
    admin_email: str
    admin_phone: str
    admin_password: str
    # Add these new fields
    company_size: str | None = None  # Optional
    industry: str | None = None
    website: str | None = None
    job_title: str | None = None
    subscribe_newsletter: bool = False


class LoginRequest(BaseModel):
    email: EmailStr
    password: str