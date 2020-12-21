import requests
from secrets import API_SECRET_KEY

key = API_SECRET_KEY

resp = requests.get('https://www.mapquestapi.com/geocoding/v1/address', params={'key':key, "location": "Denver, CO"})