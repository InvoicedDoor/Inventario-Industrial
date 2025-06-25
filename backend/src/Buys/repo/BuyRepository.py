from sqlmodel import Session, select
from src.Utilities.DBConnection.DBConnect import engine
from ..models.BuyModel import BuyModel

def get_buys():
    """
    Retrieves all buy orders from the database.

    Returns:
        List[BuyModel]: A list of all buy orders.
    """
    with Session(engine) as session:
        statement = select(BuyModel)
        results = session.exec(statement)
        buys = results.all()
        return buys
    
def get_buy_by_id(buy_id: int):
    """
    Retrieves a buy order by its ID.

    Args:
        buy_id (int): The ID of the buy order to retrieve.

    Returns:
        BuyModel: The buy order with the specified ID.
    """
    with Session(engine) as session:
        buy = session.get(BuyModel, buy_id)
        if not buy:
            raise ValueError("Buy order not found")
        return buy

def registet_buy(buy: BuyModel):
    """
    Registers a new buy order in the database.

    Args:
        buy (BuyModel): The buy order to be registered.

    Returns:
        buy
    """
    with Session(engine) as session:
        session.add(buy)
        session.commit()
        session.refresh(buy)
        return buy

def update_buy(buy: BuyModel, buy_id: int):
    """
    Updates an existing buy order in the database.

    Args:
        buy (BuyModel): The buy order to be updated.

    Returns:
        existing_buy
    """
    with Session(engine) as session:
        existing_buy = session.get(BuyModel, buy_id)
        if not existing_buy:
            raise ValueError("Buy order not found")
        
        buy_data = buy.model_dump(exclude_unset=True)
        for key, value in buy_data.items():
            setattr(existing_buy, key, value)

        session.add(existing_buy)
        session.commit()
        session.refresh(existing_buy)
        return existing_buy
    
def delete_buy(buy_id: int):
    """
    Deletes a buy order from the database.

    Args:
        buy_id (int): The ID of the buy order to delete.
    """
    with Session(engine) as session:
        buy = session.get(BuyModel, buy_id)
        if not buy:
            raise ValueError("Buy order not found")
        
        session.delete(buy)
        session.commit()