import multer from "multer";
import routes from "./routes";

// 만약 /uploads/videos/  이런식으로 쓰면 프로젝트 폴더가 아니라 컴퓨터의 root 폴더를 기준으로 저장
const multerVideo = multer({ dest: "uploads/videos/" });

// localsMiddleware 의 기능이 뭔지 헷갈림 (2020/08/06 #6.4 Sessions on Express)
export const localsMiddleware = (req, res, next) => {
  //siteName 은 임의의 이름
  res.locals.siteName = "WeTube";

  //로컬로 등록해놔서 routes 를 아무데서나(global) 변수처럼 사용 가능. 사용자 정보를 저장하는 방법이 있음.
  res.locals.routes = routes;
  res.locals.user = req.user || null; // user 가 존재하거나 존재하지 않으면 비어있는 object를 반환. req.user 는 이 어플 어디에나 있음. 쿠키를 사용하기 때문. 쿠키는 express 로 보내짐
  console.log(req.user);
  next();
};
// single 은 한 파일만 올리도록
export const uploadVideo = multerVideo.single("videoFile");
// 이후에 router 에 uploadVideo 를 추가
