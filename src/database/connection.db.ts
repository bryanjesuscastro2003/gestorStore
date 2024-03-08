import mongoose from "mongoose";

// to connect to the db
export const connectMONGO = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/your-db-name");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

// to close the connection
export const closeMONGO = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error disconnecting from the database: ", error);
  }
};



