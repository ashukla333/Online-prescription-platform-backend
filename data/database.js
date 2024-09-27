import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "WebBlog",
    })
    .then(() => {
      console.log("db connected broh");
    })
    .catch((e) => {
      console.log(e, "shiit yr nhi connect hua ");
    });
};
