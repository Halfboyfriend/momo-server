require("dotenv").config();
const axios = require("axios");

class UserController {
  static async app(req, res) {
    return res.status(200).json({ succes: "Welcome to Momo APP" });
  }

  static async news(req, res) {
    const newsUrl = `https://newsapi.org/v2/everything?q=mtn&from=2023-10-07&sortBy=publishedAt&apiKey=${process.env.NEWS_API}`;
    try {
      const response = await axios.get(newsUrl);
      const responseData = response.data;
      for (let i = 0; i < responseData.articles.length; i++) {
        if (responseData.articles[i].urlToImage !== null) {
          return res.status(200).json(responseData.articles);
        }
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async ads(req, res) {
    return res.status(200).json({ succes: "Welcome to Momo APP News Page" });
  }
}

module.exports = UserController;
