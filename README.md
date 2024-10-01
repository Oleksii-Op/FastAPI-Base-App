# FastAPI Application (Backend Auth)

## This project includes:
* Python FastAPI - simple backend for registration/auth purposes.
* PostgreSQL - as the main database.
* PGAdmin4 - as the management tool for Postgres.
* Nginx - as the reverse proxy with SSL.
* Prometheus - as the backend metric's/host metric's collector.
* Grafana - visualization of Prometheus' metrics.
* Portainer - container management software.
* Docker - containerization of services.


## Fast Deploy:
#### Note that all the passwords and keys are fake and were made with a script.
```shell
python3 -c 'import secrets; print(secrets.token_hex())'
```
#### 1. Bind site.local to 127.0.0.1 in /etc/hosts (requires root privileges)
```
add "127.0.0.1 	  site.local" to /etc/hosts
```
#### 2. Start services
```shell
docker compose up -d --build
```
#### The first run will build Python FastAPI container.
#### After building, ```docker compose up -d``` is enough.
#### 3. Enter https://site.local/index in your web browser or https://site.local/docs. (Your browser will complain about self-signed certificate, but it's okay.)


