const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = "3042f708e15a5218961307430856ea4c";
// const generateScrapperUrl(api_key) = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScrapperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scrapper API!");
});

//Get Product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.in/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//get product reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.in/product-reviews/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//get offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.in/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//get search
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.in/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
