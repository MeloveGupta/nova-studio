import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: false,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  global._mongoClientPromise = client.connect();
}

const clientPromise = global._mongoClientPromise;

export default clientPromise;