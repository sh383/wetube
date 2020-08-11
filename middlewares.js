import multer from "multer";
import routes from "./routes";

// 만약 /uploads/videos/  이런식으로 쓰면 프로젝트 폴더가 아니라 컴퓨터의 root 폴더를 기준으로 저장
// 좋은 방법은 아님. 나중에 아마존에 업로드 하는 방법을 설명할 예정
const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatar/" });

// localsMiddleware 의 기능이 뭔지 헷갈림 (2020/08/06 #6.4 Sessions on Express)
export const localsMiddleware = (req, res, next) => {
  //siteName 은 임의의 이름
  res.locals.siteName = "WeTube";

  //로컬로 등록해놔서 routes 를 아무데서나(global) 변수처럼 사용 가능. 사용자 정보를 저장하는 방법이 있음.
  res.locals.routes = routes;
  //res.locals.user 였을 때는 user 가 middleware 에서 전달된 것인지, controller 에서 온 것인지 혼란스러웠음. loggedUser 로 이름 변경
  res.locals.loggedUser = req.user || null; // user 가 존재하거나 존재하지 않으면 비어있는 object를 반환. req.user 는 이 어플 어디에나 있음. 쿠키를 사용하기 때문. 쿠키는 express 로 보내짐
  next();
};
// 로그인 된 유저가 join 화면에 접속 못하도록
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
// single 은 한 파일만 올리도록
export const uploadVideo = multerVideo.single("videoFile");
// 이후에 router 에 uploadVideo 를 추가
export const uploadAvatar = multerAvatar.single("avatar");
