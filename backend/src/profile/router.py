from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from src.database import get_db

router = APIRouter()


@router.get("")
def read_users(session: AsyncSession = Depends(get_db)):
    pass
