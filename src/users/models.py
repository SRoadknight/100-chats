from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    id: int = Field(primary_key=True)
    first_name: str
    last_name: str


class User(UserBase, table=True):
    pass


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    pass


class UserUpdate(UserBase):
    pass
