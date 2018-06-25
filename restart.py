import requests

API_SECRET_KEY = "6c61a4e27f0cdc5bdd4400368ed249750d6eea088087e525f645d6dcd3be62fc085fe08c567c09861387298d5eeb34dc65be6adb795de41a99d19e0079a82ee6"
API_KEY = "s5b09e66f529be@AjaxOne.playat.ch"

headers = {'Content-type': 'application/json', 'key' : API_KEY, 'secret': API_SECRET_KEY }
url = "https://api.creeper.host/mc/restartserver"
#url = "https://api.creeper.host/os/listservices"
response = requests.post(url, headers= headers)

print response.json()['status']
