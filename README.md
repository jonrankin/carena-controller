# Creeperhost Server Controller

A web application that uses the aries API to monitor the CPU, HDD, and RAM of a minecraft server running on creeperhost. Additionally allows a user to reset the server with the appropriate secret key used by users configured on the API.


## Installation

The application supports Ansible which will install all required services, code, and configurations to run on a fresh linux ubuntu system.

NGINX will run on port 80 proxying to the flask app on localhost port 5000.

**Note:** You will need to copy ssl keys to the server under /etc/nginx/ssl for this to work. The playbook will have issues starting the nginx server. The key files will need to be named:
* *Private Key:* privkey.pem
* *Public Key:* fullchain.pem

To install just enter these commands:
```
sudo apt install ansible
WORK IN PROGRESS
ansible-playbook cf-server.yml
```
