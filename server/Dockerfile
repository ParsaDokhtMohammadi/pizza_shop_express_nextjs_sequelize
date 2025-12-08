# Use specific Node version
ARG NODE_VERSION=24.11.1
FROM node:${NODE_VERSION}

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy only dependency files first
COPY package.json pnpm-lock.yaml* ./

# Install deps using cache
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install

# Now copy the rest of the source
COPY . .

EXPOSE 4000

CMD ["pnpm", "run", "dev"]
