import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";

// passport 에게 strategy (login 하는 방법) 를 쓰라고 말할 것
// 다양한 종류의 strategy 가 있지만(github, facebook 로그인) passport-local-mongoose 가 제공하는 strategy 사용(username,password 사용)
passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: "http://localhost:4000/auth/github/callback",
    },
    // function 을 여기에 적으면 지저분하니까 userController 에 저장
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
