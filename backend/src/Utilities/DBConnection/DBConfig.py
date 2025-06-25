from dotenv import load_dotenv
from os import getenv

load_dotenv()

def get_db_config():
    """
    Retrieves the database configuration from environment variables.

    Returns:
        dict: A dictionary containing the database configuration.
    """
    return {
        'host': getenv('DB_HOST'),
        'user': getenv('DB_USER'),
        'password': getenv('DB_PASSWORD'),
        'database': getenv('DB_NAME')
    }

CONNECTION_STRING = "mysql+pymysql://{user}:{password}@{host}/{database}".format(
    user=getenv('DB_USER'),
    password=getenv('DB_PASSWORD'),
    host=getenv('DB_HOST'),
    database=getenv('DB_DATABASE')
)