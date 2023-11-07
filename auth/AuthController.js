const dbClient = require("../storage/db");
const { createToken } = require("./jstTokenGenerator");

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    if (!username) {
      res.status(400).json({ error: "username not found" });
    }
    if (!password) {
      res.status(400).json({ error: "password not found" });
    }

    // Database connection
    const collection = await dbClient.db.collection("Users");
    const User = await collection.findOne({ username: username });
    if (User) {
      const accessToken = createToken(User);
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });
      {
        res.status(400).json({ message: "User logged in" });
      }
    }
    if (!User) {
      const newUser = {
        username,
        password,
        points: 0
      };
      await collection.insertOne(newUser);
      res.status(200).json({ message: `${username} created successfully` });
    }
  }
}

module.exports = AuthController;
