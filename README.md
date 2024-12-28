# Base-app FastAPI Application (Backend Auth)


## This project includes:
* Python [FastAPI](https://fastapi.tiangolo.com/) - simple backend for registration/auth purposes using [FastAPI-Users](https://fastapi-users.github.io/fastapi-users/latest/).
* [PostgreSQL](https://www.postgresql.org/) - as the main database.
* [Redis](https://redis.io/) - database for managing access tokens.
* [PGAdmin4](https://www.pgadmin.org/) - as the management tool for Postgres.
* [Nginx](https://nginx.org/) - as the reverse proxy with SSL.
* [Prometheus](https://prometheus.io/) - as the backend metric's/host metric's collector.
* Prometheus Node Exporter - for hardware and OS metrics exposed by *NIX kernels.
* [Grafana](https://grafana.com/) - visualization of Prometheus' metrics and Clickhouse logs.
* [CAdvisor](https://github.com/google/cadvisor) - analyzes and exposes resource usage and performance data from running containers.
* [Vector](https://vector.dev/) - is a lightweight and ultra-fast tool for building observability pipelines.
* [Clickhouse](https://clickhouse.com/) - column-oriented database management system for logs storing.
* [Optional] [BetterStack](https://betterstack.com/community/guides/logging/docker-logs/) - Remote log storage (uses Vector)
* [Docker](https://www.docker.com/) - containerization of services.

### Interactive API Documentation
![/images/apis.png](/images/apis.png)
### Access Token Response
![images/access_token](/images/access_token.png)
### FastAPI Endpoints Metrics
![images/endpoints_metrics.png](images/endpoints_metrics.png)
### Prometheus Host Metrics
![images/host_metrics.png](/images/host_metrics.png)
### CAdvisor Containers Metrics
![images/cadvisor_metrics.png](images/cadvisor_metrics.png)
### Containers logs from Clickhouse in Grafana
![images/clickhouse_logs.png](images/clickhouse_logs.png)
### Containers logs in [BetterStack](https://betterstack.com/community/guides/logging/docker-logs/) Telemetry
![images/better_stack.png](images/better_stack.png)


## About the project


## Fast Deploy:
> [!NOTE]
> Note that SMTP Google credentials are not required.
> All the passwords and keys are fake and were made with a script.
```shell
python3 -c 'import secrets; print(secrets.token_hex())'
```
#### 1. Run `init_project.sh` script to set up some credentials before start up
#### 2. Once Postgres password and SMTP Server credentials have been set - execute
```shell
docker compose up -d --build
```
#### Docker compose file uses some delay to start Clickhouse FIRST
#### The first run will build Python FastAPI container and SMTP Server and start all containers.
#### Use command below to verify that all services are running and healthy.
```bash
docker compose ps
```
#### 4. Enter 
* https://localhost/index in your web browser or https://localhost/docs to access Backend via Nginx. (Your browser will complain about self-signed certificate, but it's okay.)
* https://localhost:3000/ to access Grafana (username: admin , password: pass@123)
* http://localhost:8020/ to access PGAdmin4 (email: admin@example.com , password: test_admin)

#### You may use `index_page_loader.sh` to simulate some requests to https://localhost/index
#### Metrics in Grafafa FastAPI Dashboard will grow
## Docker networks topology (Deprecated)
![topology.png](topology.png)
