import mongoose, { connect } from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", false);
  return connect(url);
};

export default connectDB;
