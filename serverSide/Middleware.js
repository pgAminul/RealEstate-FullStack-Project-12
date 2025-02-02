const { MongoClient } = require("mongodb");

// MongoDB URI এবং ক্লায়েন্ট সেটআপ
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);

// Middleware ফাংশন
async function checkRole(requiredRole) {
  return async (req, res, next) => {
    const email = req.body.email;

    if (!email) {
      return res.status(400).send({ message: "Email is required!" });
    }

    try {
      // MongoDB ডাটাবেসে কানেক্ট করা
      const RealEstate = client.db("RealEstate");
      const users = RealEstate.collection("users");

      // ডাটাবেস থেকে ব্যবহারকারীর তথ্য বের করা
      const user = await users.findOne({ email });

      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      // রোল চেক করা
      if (user.role !== requiredRole) {
        return res
          .status(403)
          .send({ message: `Access denied! ${requiredRole} role required.` });
      }

      // রোল মিললে পরবর্তী middleware বা রাউটে যাওয়া
      next();
    } catch (error) {
      console.error("Error in role check middleware:", error);
      res.status(500).send({ message: "Internal server error!" });
    }
  };
}

module.exports = checkRole;
