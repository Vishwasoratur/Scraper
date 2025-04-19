# Stage 1: Scraper
FROM node:18-slim as scraper

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt-get update && apt-get install -y \
  chromium chromium-driver fonts-liberation libappindicator3-1 libasound2 \
  libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 \
  libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
  xdg-utils wget ca-certificates --no-install-recommends \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY scrape.js package.json ./
RUN npm install
CMD ["npm", "start"]

# Run scraper during build
ARG SCRAPE_URL
RUN SCRAPE_URL=$SCRAPE_URL npm start

# Stage 2: Server
FROM python:3.10-slim

WORKDIR /app
COPY --from=scraper /app/scraped_data.json .
COPY server.py requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["python", "server.py"]

