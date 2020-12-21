# pip install requests
import requests

resp1 = requests.get("https://itunes.apple.com/search?term=jack+johnson&limit=5")
resp2 = requests.get("https://itunes.apple.com/search", params={'term': 'Jack Johnson', 'limit': 5})

data = resp1.json()

for result in data['results']:
    print(result['trackName'], result['collectionName'])

# resp3 = requests.post(url, data, json)
resp3 = requests.post('myurl.com',data={'username':'me','tweet':'hi'}) #url encoded
resp4 = requests.post('myurl.com',json={'username':'me','tweet':'hi'}) #json data

data = {
    'username':'chickens',
    'tweets': [
        'hello!','goodbye!', 'bock bock!', {
            'id': 1, 'text': 'my first tweet!'
        }
    ]
}

resp5 = requests.post('myurl.com',json=data) #json data
