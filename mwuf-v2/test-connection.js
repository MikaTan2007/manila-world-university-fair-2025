const { MongoClient } = require("mongodb");
require("dotenv").config();

async function testConnection() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI not found in environment variables");
    return;
  }

  console.log("Testing connection to:", uri.substring(0, 20) + "...");

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB");

    const db = client.db("manila-world-university-fair-2025");
    const collections = await db.listCollections().toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.error("Error code:", error.code);
  } finally {
    await client.close();
  }
}

testConnection();
