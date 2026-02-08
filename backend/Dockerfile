FROM python:3.13-slim

# Evita prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Dependencias del sistema (solo lo necesario)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiamos requirements primero para cache
COPY requirements.txt .

# Pip actualizado + dependencias
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del proyecto
COPY . .

# Puerto típico FastAPI
EXPOSE 8000

# Uvicorn con reload (dev)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]