from pydantic import BaseModel, EmailStr

class TenantRegistration(BaseModel):
    company_name: str
    admin_first_name: str
    admin_last_name: str
    admin_email: EmailStr
    admin_phone: str
    admin_password: str
