const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { movie1, movie2 } = req.body;

  const movie1Data = await scrapeMovie(
    `https://www.rottentomatoes.com/m/${movie1}`
  );
  const movie2Data = await scrapeMovie(
    `https://www.rottentomatoes.com/m/${movie2}`
  );

  res.json({ movie1Data, movie2Data });
});

async function scrapeMovie(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url);

  const data = await page.evaluate(() => {
    const scriptElements = Array.from(document.getElementsByTagName('script'));
    const targetScript = scriptElements.find(
      (script) => script.type === 'application/ld+json'
    );

    if (!targetScript) {
      return null;
    }

    const rawData = targetScript.textContent;
    const jsonData = JSON.parse(rawData);

    if (
      jsonData &&
      jsonData.aggregateRating &&
      jsonData.director &&
      jsonData.director[0]
    ) {
      return {
        title: jsonData.name,
        director: jsonData.director[0].name,
        genre: jsonData.genre.join(', '),
        url: jsonData.url,
        tomatometer: jsonData.aggregateRating.ratingValue,
        image: jsonData.image,
      };
    } else {
      return null;
    }
  });

  await browser.close();
  return data;
}

app.listen(5000, () => console.log('Server is running on port 5000'));
