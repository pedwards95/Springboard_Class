from forex_python.converter import CurrencyRates, CurrencyCodes

def validate(to,frm,amount):
    to_answer = check_valid_currency_type(to)
    from_answer = check_valid_currency_type(frm)
    amount_answer = check_valid_amount(amount)

    return{"To":to_answer, "From":from_answer, "Amount":amount_answer}

def check_valid_currency_type(currency):
    if not isinstance(currency,str):
        return [False,"Not a string."]
    if currency.isnumeric():
        return [False,"Not a string."]
    if not len(currency) == 3:
        return [False,"Invalid Length."]

    currency = currency.upper()
    c = CurrencyRates()
    try:
        c.get_rates(currency)
        return [True,"Valid Currency."]
    except:
        return [False,"Invalid Currency."]

def check_valid_amount(amount):
    if not (isinstance(amount,int) or isinstance(amount,float) or amount.isnumeric()):
        return [False,"Not a number."]
    if float(amount) < 0:
        return [False,"Negative amount."]
    return [True,"Valid Amount."]

def convert(to,frm,amount):
    c = CurrencyRates()
    cc = CurrencyCodes()
    try:
        converted_num = c.convert(frm.upper(),to.upper(),float(amount))
        symbol = cc.get_symbol(to.upper())
        return f"{symbol}{round(converted_num,2)}"
    except:
        return "Something went wrong."