# Non-async engine
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import Session
from sqlmodel.ext.asyncio.session import AsyncSession

from src.config import settings

DATABASE_ASYNC_URL = str(settings.DATABASE_ASYNC_URL)
DATABASE_URL = str(settings.DATABASE_URL)

async_engine = create_async_engine(
    DATABASE_ASYNC_URL,
    pool_size=settings.DATABASE_POOL_SIZE,
    pool_recycle=settings.DATABASE_POOL_TTL,
    pool_pre_ping=settings.DATABASE_POOL_PRE_PING,
)


async def get_async_session():
    async with AsyncSession(async_engine) as session:
        yield session


engine = create_engine(
    DATABASE_URL,
    pool_size=settings.DATABASE_POOL_SIZE,
    pool_recycle=settings.DATABASE_POOL_TTL,
    pool_pre_ping=settings.DATABASE_POOL_PRE_PING,
)


def get_session():
    with Session(engine) as session:
        yield session
