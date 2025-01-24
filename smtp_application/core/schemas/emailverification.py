from pydantic import BaseModel, EmailStr


class EmailUsernameModel(BaseModel):
    email: EmailStr
    username: str


class ResetPassModel(EmailUsernameModel):
    token: str