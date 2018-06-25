import requests
import config as api_config

def get_api(api):
     try:
          details = requests.get(api_config.url + api, headers = api_config.headers)
          return details.json()

     except Exception as e:
          print (e)
          response = {
              'status' : 'failed',
              'message' : 'server did not respond or an error was encountered.'
          }
          return response

def reset_api(api):
     try:

          details = requests.post(api_config.url + api, headers = api_config.reset_headers)
          return details.json()

     except Exception as e:
          print (e)
          response = {
              'status' : 'failed',
              'message' : 'server did not respond or an error was encountered.'
          }
          return response

