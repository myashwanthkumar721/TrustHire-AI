from backend.database.connection import engine
from backend.database.models import Base


def init_db():
    Base.metadata.create_all(bind=engine)
    print("DATABASE TABLES CREATED")


if __name__ == "__main__":
    init_db()
