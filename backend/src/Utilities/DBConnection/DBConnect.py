from pymysql import Connection
from sqlmodel import create_engine, SQLModel
from .DBConfig import CONNECTION_STRING

engine = create_engine(CONNECTION_STRING)

def start_connection() -> Connection:
    """
    Establishes a connection to the database.

    Returns:
        Connection: A connection object to interact with the database.
    """
    # Importing the connection here to avoid circular import issues
    from src.Utilities.DBConnection.DBConfig import get_db_config
    from pymysql import connect

    db_config = get_db_config()
    connection = connect(
        host=db_config['HOST'],
        user=db_config['USER'],
        password=db_config['PASSWORD'],
        database=db_config['DATABASE']
    )
    
    return connection

def open_connection():
    """
    Opens a connection to the database.
    """
    return 