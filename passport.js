import passport from "passport";
import User from "./models/User";

// passport 에게 strategy (login 하는 방법) 를 쓰라고 말할 것
// 다양한 종류의 strategy 가 있지만(github, facebook 로그인) passport-local-mongoose 가 제공하는 strategy 사용(username,password 사용)
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);
