require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const firebaseAdminAccount = require("./firebaseAdmin.json");
const e = require("express");
admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminAccount),
  databaseURL: process.env.REALTIME_DATABASE_URL_FIREBASE,
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://real-estate-platform-70c5d.web.app",
      "https://real-estate-platform-70c5d.firebaseapp.com",
    ],
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = process.env.DATABASE_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10d",
  });
  res.send({ token });
});
//middle-wear
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "forbidden access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const RealEstate = client.db("RealEstate");
    const users = RealEstate.collection("users");
    const AddedProperty = RealEstate.collection("property");
    const WishList = RealEstate.collection("WishList");
    const OfferedPrice = RealEstate.collection("OfferedPrice");
    const paymentCollection = RealEstate.collection("paymentCollection");
    const Review = RealEstate.collection("review");

    // use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await users.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    const verifyAgent = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await users.findOne(query);
      const isAdmin = user?.role === "agent";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    app.get("/", (req, res) => {
      res.send("hello");
    });

    // checek user  role

    app.get("/getRole/:email", async (req, res) => {
      const email = req.params.email;
      const result = await users.find({ email: email }).toArray();
      res.send(result);
    });

    // Admin Route
    app.get("/alldata", async (req, res) => {
      const data = await AddedProperty.find().toArray();
      res.send(data);
    });

    app.get("/allUsers", verifyToken, verifyAdmin, async (req, res) => {
      const allUesrs = await users.find().toArray();
      res.send(allUesrs);
    });

    app.post("/update-status", verifyToken, verifyAdmin, async (req, res) => {
      const { action, email } = req.body;

      if (!email || !action) {
        return res.status(400).json({ error: "Email and action are required" });
      }

      try {
        const user = await users.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Perform action based on the `action` parameter
        switch (action) {
          case "makeAdmin":
            // Make user admin
            await users.updateOne({ email }, { $set: { role: "admin" } });
            break;

          case "markFraud":
            // Mark user as fraud
            await users.updateOne({ email }, { $set: { role: "fraud" } });
            // Delete all properties associated with the fraud user
            await AddedProperty.deleteMany({ agentEmail: email }); // Assuming properties have `agentEmail` field
            break;

          case "makeAgent":
            // Make user agent
            await users.updateOne({ email }, { $set: { role: "agent" } });
            break;

          case "removeAdmin":
            // Remove admin role
            await users.updateOne({ email }, { $set: { role: "user" } });
            break;

          default:
            return res.status(400).json({ error: "Invalid action" });
        }

        res.status(200).json({ message: "Action completed successfully!" });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.post("/deleteUser", async (req, res) => {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const uid = userRecord.uid;

        const deleteUser = await users.deleteOne({ email: email });

        await admin.auth().deleteUser(uid);

        const userRef = admin.firestore().collection("users").doc(uid);
        await userRef.delete();

        if (deleteUser.deletedCount > 0) {
          return res.status(200).json({
            message: `User with email ${email} deleted successfully from both Firebase and database.`,
          });
        } else {
          return res.status(404).json({
            error: `User with email ${email} not found in the database.`,
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user." });
      }
    });

    app.patch("/verify/:id", verifyToken, verifyAdmin, async (req, res) => {
      const verify = req.params.id;

      await AddedProperty.updateOne(
        { _id: new ObjectId(verify) },
        { $set: { verificationStatus: "Verify" } }
      );

      res.send({ message: "Offer rejected." });
    });

    app.get("/reviewAdmin", verifyToken, verifyAdmin, async (req, res) => {
      const reviews = await Review.find().toArray();
      res.send(reviews);
    });

    app.delete(
      "/reviewDeleteByAdmin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const deleteReviews = { _id: new ObjectId(id) };
        const deletedReview = await Review.deleteOne(deleteReviews);
        res.send(deletedReview);
      }
    );

    app.patch(
      "/reject-verify/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const verify = req.params.id;

        await AddedProperty.updateOne(
          { _id: new ObjectId(verify) },
          { $set: { verificationStatus: "rejected" } }
        );

        res.send({ message: "Offer rejected." });
      }
    );

    app.patch(
      "/adverties-poperty/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;

        try {
          const updateId = { _id: new ObjectId(id) };
          const data = {
            $set: { advertisement: "yes" },
          };

          const result = await AddedProperty.updateOne(updateId, data);

          res
            .status(200)
            .json({ message: "Query updated successfully", result });
        } catch (error) {
          res.status(500).json({ error: "Internal server error" });
        }
      }
    );

    app.get("/addPropertyByAdmin", async (req, res) => {
      const findProperty = await AddedProperty.find({
        advertisement: "yes",
      }).toArray();
      res.send(findProperty);
    });
    // Agent Route
    app.post("/add-property", verifyToken, verifyAgent, async (req, res) => {
      const body = req.body;
      const response = await AddedProperty.insertOne(body);
      res.send(response);
    });

    app.get("/property", async (req, res) => {
      const propertyData = await AddedProperty.find({
        verificationStatus: "Verify",
      }).toArray();
      res.send(propertyData);
    });

    app.get("/property-detail/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const findData = { _id: new ObjectId(id) };
      const data = await AddedProperty.findOne(findData);
      res.send(data);
    });

    app.get(
      "/my-added-data/:email",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const email = req.params.email;
        const response = await AddedProperty.find({
          agentEmail: email,
        }).toArray();
        res.send(response);
      }
    );

    app.get(
      "/PaymentHistory/:email",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const email = req.params.email;
        const findHistory = await paymentCollection
          .find({ agentEmail: email })
          .toArray();
        res.send(findHistory);
      }
    );

    app.get("/adverties", verifyToken, verifyAdmin, async (req, res) => {
      const data = await AddedProperty.find({
        verificationStatus: "Verify",
      }).toArray();
      res.send(data);
    });

    app.patch(
      "/Update-poperty/:id",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const id = req.params.id;
        const body = req.body;

        try {
          const updateId = { _id: new ObjectId(id) };
          const data = {
            $set: body,
          };

          const result = await AddedProperty.updateOne(updateId, data);

          res
            .status(200)
            .json({ message: "Query updated successfully", result });
        } catch (error) {
          res.status(500).json({ error: "Internal server error" });
        }
      }
    );

    app.delete(
      "/property-delete/:id",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const id = req.params.id;
        const DltProperty = { _id: new ObjectId(id) };
        const result = await AddedProperty.deleteOne(DltProperty);
        res.send(result);
      }
    );

    app.get(
      "/my-sold-property/:email",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const email = req.params.email;
        const data = await paymentCollection
          .find({ agentEmail: email })
          .toArray();
        res.send(data);
      }
    );

    app.get(
      "/requested-property/:email",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const email = req.params.email;
        const result = await OfferedPrice.find({ agentEmail: email }).toArray();
        res.send(result);
      }
    );

    app.patch(
      "/offer-accepted/:id",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const id = req.params.id;
        await OfferedPrice.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: "accepted" } }
        );

        const offer = await OfferedPrice.findOne({ _id: new ObjectId(id) });

        const result = await OfferedPrice.updateMany(
          {
            previousId: offer.previousId,
            _id: { $ne: new ObjectId(id) },
          },
          { $set: { status: "rejected" } }
        );

        res.send(result);
      }
    );

    app.patch(
      "/offers-reject/:id",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const offerId = req.params.id;

        await OfferedPrice.updateOne(
          { _id: new ObjectId(offerId) },
          { $set: { status: "rejected" } }
        );

        res.send({ message: "Offer rejected." });
      }
    );
    app.get("/homeReview", async (req, res) => {
      const reviewData = await Review.find().toArray();
      res.send(reviewData);
    });

    app.get("/offerd-price-payment", async (req, res) => {
      const data = await OfferedPrice.find().toArray();
      res.send(data);
    });

    app.post("/added-to-my-wishList", async (req, res) => {
      const data = req.body;
      const response = await WishList.insertOne(data);
      res.send(response);
    });
    app.delete("/my-wishList-delete/:id", verifyToken, async (req, res) => {
      console.log("Deleting ID:", req.params.id); // এখানে ID চেক করুন
      const id = req.params.id;
      try {
        const findDeleteOne = { _id: new ObjectId(id) };
        const deleteWishList = await WishList.deleteOne(findDeleteOne);
        res.send(deleteWishList);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error deleting wishlist item", error });
      }
    });

    app.get("/my-wishList/:email", async (req, res) => {
      const email = req.params.email;
      try {
        const response = await WishList.find({
          AddWishListBy: email,
        }).toArray();
        res.status(200).send(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    app.get("/OfferPrice/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const findData = { _id: new ObjectId(id) };
      const data = await WishList.findOne(findData);
      res.send(data);
    });

    app.post("/offeredPrice", verifyToken, async (req, res) => {
      const body = req.body;
      const data = await OfferedPrice.insertOne(body);
      res.send(data);
    });

    app.post("/review", verifyToken, async (req, res) => {
      const body = req.body;
      const data = await Review.insertOne(body);
      res.send(data);
    });

    app.get("/reviews/:id", async (req, res) => {
      const previousDataId = req.params.id;

      try {
        const data = await Review.find({
          previosId: previousDataId,
        }).toArray();
        res.send(data);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the data.");
      }
    });
    app.get("/myReviews/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const reivews = await Review.find({ reviewerEmail: email }).toArray();
      res.send(reivews);
    });
    app.get("/my-bought/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const data = await OfferedPrice.find({ buyerEmail: email }).toArray();
      res.send(data);
    });

    const { ObjectId } = require("mongodb");

    app.delete("/deleteMyReview/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const dltReview = await Review.deleteOne({ _id: new ObjectId(id) });
        res.send(dltReview);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to delete review" });
      }
    });

    // new registered user pass to database
    app.post("/users", async (req, res) => {
      const body = req.body;
      const email = { email: body.email };
      const existingUser = await users.findOne(email);
      if (existingUser) {
        return res.send({
          message: "User Already Existing in Database",
          insertedId: null,
        });
      }
      const newUser = await users.insertOne(body);
      res.send(newUser);
    });

    // payment
    app.post("/create-payment-intent", async (req, res) => {
      try {
        const { offerAmount } = req.body;

        // Validation for camp fees
        if (
          !offerAmount ||
          typeof offerAmount !== "number" ||
          offerAmount <= 0
        ) {
          return res.status(400).send({ message: "Invalid camp fees" });
        }

        const amount = parseInt(offerAmount * 100);

        // Create Payment Intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret, // Send client secret for the front-end to handle payment
        });
      } catch (error) {
        console.error("Error creating payment intent:", error.message);
        res.status(500).send({
          message: "Failed to create payment intent",
          error: error.message,
        });
      }
    });

    ////

    app.get("/payments", async (req, res) => {
      const result = await paymentCollection.find().toArray();
      res.send(result);
    });

    // Get Payments by Email
    app.get("/payments/:email", verifyToken, async (req, res) => {
      try {
        const query = { email: req.params.email };

        // Validate that the email in the token matches the request email
        if (req.params.email !== req.decoded.email) {
          return res.status(403).send({ message: "Forbidden access" });
        }

        const result = await paymentCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching payments:", error.message);
        res.status(500).send({
          message: "Failed to fetch payments",
          error: error.message,
        });
      }
    });

    app.post("/payments", async (req, res) => {
      try {
        const payment = req.body;

        const result = await paymentCollection.insertOne(payment);

        const prevId = payment.prevId;

        if (!prevId) {
          return res.status(400).send({ error: "Previous ID is required" });
        }
        const PreviousDataId = { _id: new ObjectId(prevId) };

        const updatedStatus = {
          $set: {
            status: "bought",
          },
        };

        const participantUpdate = await OfferedPrice.updateOne(
          PreviousDataId,
          updatedStatus
        );

        res.send({ paymentResult: result, participantUpdate });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ error: "An error occurred during the payment process." });
      }
    });

    app.delete("/payments/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await paymentCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

module.exports = app;
