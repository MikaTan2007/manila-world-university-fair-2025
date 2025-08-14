const { MongoClient } = require("mongodb");
require("dotenv").config();

async function createSessionIndexes() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("manila-world-university-fair-2025");

    // Create indexes for the sessions collection
    await db.collection("sessions").createIndex({ email: 1 });
    await db
      .collection("sessions")
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    await db.collection("sessions").createIndex({ userType: 1 });

    console.log("✅ Session indexes created successfully");
  } catch (error) {
    console.error("❌ Error creating indexes:", error);
  } finally {
    await client.close();
  }
}

createSessionIndexes();
