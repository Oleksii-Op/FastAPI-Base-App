from pydantic import EmailStr, BaseModel


class EmailVerify(BaseModel):
    email: EmailStr
    token: str
    username: str
