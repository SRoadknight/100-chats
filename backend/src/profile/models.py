# get uuid type pydantic
from pydantic import UUID4
from sqlmodel import Field, SQLModel


class ProfileBase(SQLModel):
    __tablename__ = "profiles"
    user_id: UUID4 = Field(default=None, primary_key=True)
    discord_handle: str
    avatar_url: str


class Profile(ProfileBase, table=True):
    pass


class ProfileCreate(ProfileBase):
    pass


class ProfileRead(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass
