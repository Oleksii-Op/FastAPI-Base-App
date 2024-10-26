from pydantic import BaseModel, EmailStr


class EmailVerify(BaseModel):
    email: EmailStr
    token: str
    username: str
