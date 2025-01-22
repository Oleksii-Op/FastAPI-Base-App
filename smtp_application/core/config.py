from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel, EmailStr, IPvAnyAddress
from dotenv import load_dotenv

load_dotenv()


class RunConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8050


class SMTPConfig(BaseModel):
    host: str = "smtp.gmail.com"
    port: int = 587  # TLS


class Credentials(BaseModel):
    email: EmailStr
    password: str


class AllowedAddresses(BaseModel):
    ip_address: IPvAnyAddress


class SiteDomain(BaseModel):
    domain_url: str
    forgot_password_page_url: str


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env.template", ".env"),
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="GOOGLE__",
        env_file_encoding="utf-8",
    )
    run: RunConfig = RunConfig()
    smtp: SMTPConfig = SMTPConfig()
    credentials: Credentials
    backend_allowed: AllowedAddresses
    domain: SiteDomain


settings = Settings()  # type: ignore
