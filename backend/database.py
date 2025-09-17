import aiosqlite
import os
from sqlalchemy import create_engine, Column, String, Boolean, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from datetime import datetime
from pathlib import Path

Base = declarative_base()

class Contact(Base):
    __tablename__ = 'contacts'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    ip_hash = Column(String(64), nullable=False)
    user_agent = Column(Text, nullable=True)
    consent = Column(Boolean, nullable=False, default=False)

# Database setup
DB_PATH = Path(__file__).parent / "portfolio.db"
DATABASE_URL = f"sqlite:///{DB_PATH}"

# Initialize database
def init_db():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)

# Async database operations
async def create_contact(contact_data: dict) -> str:
    """Create a new contact entry"""
    contact_id = str(uuid.uuid4())
    
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            INSERT INTO contacts (id, name, email, message, created_at, ip_hash, user_agent, consent)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            contact_id,
            contact_data['name'],
            contact_data['email'],
            contact_data['message'],
            datetime.utcnow().isoformat(),
            contact_data['ip_hash'],
            contact_data.get('user_agent', ''),
            contact_data['consent']
        ))
        await db.commit()
    
    return contact_id

async def get_contacts(limit: int = 100) -> list:
    """Get recent contact entries for admin panel"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT id, name, email, message, created_at, user_agent, consent
            FROM contacts 
            ORDER BY created_at DESC 
            LIMIT ?
        """, (limit,)) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]

# Initialize database on import
init_db()