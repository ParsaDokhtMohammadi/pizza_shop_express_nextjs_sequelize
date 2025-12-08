# syntax=docker/dockerfile:1

FROM node:24

WORKDIR /app

# Copy only package files first
COPY package.json pnpm-lock.yaml* ./

# Install all deps (dev + prod)
RUN npm install -g pnpm && pnpm install

# Copy rest of the source
COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
