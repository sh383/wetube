import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(morgan('dev'));

//미들웨어, 파일로 따로 분리
//맨 위에 놓음으로써 아래 코드들이 미들웨어, local 에 접근할 수 있도록
app.use(localsMiddleware);

//가입, 검색, 홈 등등
app.use(routes.home, globalRouter);
// 누군가 user 에 접속하면 userRouter 를 사용하겠다는 의미
app.use(routes.users,userRouter);
app.use(routes.videos, videoRouter);



//Es6 모듈
export default app;
