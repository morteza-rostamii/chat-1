
import mongoose from "mongoose";
import { MONGO_URL } from "./config";

const cached:{
  connection?: typeof mongoose;
  promise?: Promise<typeof mongoose>
} = {};

async function connectMongo() {
  
  if (!MONGO_URL) {
    throw new Error('Please define the MONGO_URI environment variable inside .env file.');
  }

  try {
    // if: no connection
    if (!cached.promise) {
      const options = {
        bufferCommands: false,
      };
  
      // connect to mongoose
      cached.promise = mongoose.connect(MONGO_URL, options);
    }

    // await the promise to get the connection
    cached.connection = await cached.promise;
  }
  catch(e:any) {
    // if: error connecting remove the fact that a connection happened before.
    cached.promise = undefined;
    throw e;
  }

  // return mongoose connection
  return cached.connection;
}

export default connectMongo;