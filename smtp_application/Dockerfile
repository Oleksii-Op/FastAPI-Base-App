ARG PYTHON_VERSION=3.12.7

FROM python:${PYTHON_VERSION}-slim

LABEL description="FastAPI SMTP Server"

ENV POETRY_VERSION=1.8.3

ENV POETRY_CACHE_DIR=/app/.cache

RUN apt-get update -y \
    && pip install poetry==${POETRY_VERSION}

WORKDIR /app/

COPY . .

RUN poetry config virtualenvs.in-project true \
    && poetry install --only main \
    && useradd --shell /bin/bash smtp \
    && chown -R smtp:smtp /app

USER smtp

EXPOSE 8000

CMD ["poetry", "run", "python", "main.py"]