import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

// passportLocalMongoose 는 configuration object 가 필요
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.Model("User", UserSchema);

export default model;
