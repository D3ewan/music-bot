
FROM node:18.12


WORKDIR /app

# Install FFmpeg using apt-get
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir commands

COPY package*.json /app

RUN npm install

COPY commands /app/commands
COPY . .


CMD ["npm", "start"]

