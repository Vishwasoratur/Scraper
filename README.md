
# Scraper
This project demonstrates a multi-stage Docker build using Node.js with Puppeteer for web scraping and Python Flask for hosting the scraped content as JSON.

# DevOps Scraper Project

This project demonstrates a multi-stage Docker build using **Node.js with Puppeteer** for web scraping and **Python Flask** for hosting the scraped content as JSON.

## 🚀 How to Build the Docker Image

Use the following command to build the Docker image and specify the URL to scrape using `--build-arg`:

docker build --build-arg SCRAPE_URL=https://www.docker.com -t devops-scraper .

After the image is built, run the container and expose port 5000:

docker run -p 5000:5000 devops-scraper

Once the container is running, open your browser and navigate to:

http://localhost:5000

You will see the scraped data in JSON format.
