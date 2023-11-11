from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    email = Column(String, unique=True)
    email_verified = Column(DateTime)
    hashed_password = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    sessions = relationship('Session', back_populates='user')
    accounts = relationship('Account', back_populates='user')
    favorite_ids = Column(String, nullable=True)

class Account(Base):
    __tablename__ = 'accounts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    type = Column(String)
    provider = Column(String)
    provider_account_id = Column(String)
    refresh_token = Column(String, nullable=True)
    access_token = Column(String, nullable=True)
    expires_at = Column(Integer, nullable=True)
    token_type = Column(String, nullable=True)
    scope = Column(String, nullable=True)
    id_token = Column(String, nullable=True)
    session_state = Column(String, nullable=True)
    user = relationship('User', back_populates='accounts')

class Session(Base):
    __tablename__ = 'sessions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_token = Column(String, unique=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    expires = Column(DateTime)
    user = relationship('User', back_populates='sessions')

class VerificationToken(Base):
    __tablename__ = 'verification_tokens'

    id = Column(Integer, primary_key=True, autoincrement=True)
    identifier = Column(String)
    token = Column(String, unique=True)
    expires = Column(DateTime)

class Movie(Base):
    __tablename__ = 'movies'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String)
    description = Column(String)
    video_url = Column(String)
    thumbnail_url = Column(String)
    genre = Column(String)
    duration = Column(String)

# Crea una instancia de SQLAlchemy y una sesión
engine = create_engine('postgresql://postgres:2023@localhost/netflix')
Session = sessionmaker(bind=engine)

# Crea las tablas en la base de datos
Base.metadata.create_all(engine)