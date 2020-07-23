import passport from "passport";
import User from "./models/User";
// passport 에게 strategy 를 쓰라고 말할 것
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);
