def get_api(api):
     url = "https://api.creeper.host/"

     API_SECRET_KEY = '6c61a4e27f0cdc5bdd4400368ed249750d6eea088087e525f645d6dcd3be62fc085fe08c567c09861387298d5eeb34dc65be6adb795de41a99d19e0079a82ee6'
     API_KEY = "s5b09e66f529be@AjaxOne.playat.ch"
     headers = {'Content-type': 'application/json', 'key' : API_KEY, 'secret': API_SECRET_KEY }

     try:

          details = requests.get(url+api, headers = headers)
          return details.json()

     except Exception as e:
          print (e)
          response = {
              'status' : 'failed',
              'message' : 'server did not respond or an error was encountered.'
          }
          return response


