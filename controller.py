from flask import Flask, make_response, jsonify, render_template
import requests

from Api import config as api_config
from Api import api

from mcstatus import MinecraftServer

def create_app():
     app = Flask(__name__, template_folder='templates')
     return app
app = create_app()

@app.route("/ram")
def ram():
    return make_response(jsonify(api.get_api('os/getram')), 200)

@app.route("/cpu")
def cpu():
    return make_response(jsonify(api.get_api('os/getcpu')), 200)

@app.route("/hdd")
def hdd():
    return make_response(jsonify(api.get_api('os/gethdd')),200)

@app.route("/players")
def players():
    return make_response(jsonify(api.get_api('mc/players')),200)

@app.route("/console")
def console():
    return make_response(jsonify(api.get_api('mc/readconsole')),200)

#@app.route('/restart/<resetkey>')
#def restart(resetkey):
    #return 'reset key: %d' % resetkey
    #return make_response(jsonify(api.post_api('mc/restartserver')),200)

@app.route('/restart/<reset>')
def show_user_profile(reset):
    # show the user profile for that user
    if reset == api_config.RESET_SECRET:
	  #return make_response(jsonify({ 'status' : 'success'}),200)
          return make_response(jsonify(api.reset_api('mc/restartserver')),200)
    response = {
          'status' : 'failure',
          'message' : 'incorrect secret key provided.'
    }
    return make_response(jsonify(response),200)

@app.route("/status")
def status():
     try:
          #query the server to check status

          server = MinecraftServer.lookup("minecraft.carena.ca")
          server_status = server.status()
          response = {
                'status' : 'Online',
                'players_online': server_status.players.online,
                'response_latency': server_status.latency
          }
          return make_response(jsonify(response),200)

     except Exception as e:
          print (e)

          response  = {
                 'status' : 'Offline',
                 'message' : 'The server is offline or another error occured'
          }
          return make_response(jsonify(response), 500)

@app.route('/mods')
def mods():
     return render_template(
          'sevtech_modlist.html'
     )


@app.route('/')
def index():
     return render_template(
          'index.html'
     )


if __name__ == "__main__":
    app.run(host='0.0.0.0')


