from src.Buys.repo.BuyRepository import registet_buy, get_buys

def get_buys_service():
    res_buys = get_buys()

    if res_buys == None:
        return []
    
    return res_buys

def register_buy_new_product_service(buy):
    pass

def register_buy_existent_product_service(buy):
    registet_buy(buy)
    pass