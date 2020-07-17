import multer from "multer";
import routes from "./routes";

// 만약 /uploads/videos/  이런식으로 쓰면 프로젝트 폴더가 아니라 컴퓨터의 root 폴더를 기준으로 저장
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req,res,next) => {
    //siteName 은 임의의 이름
    res.locals.siteName = 'WeTube';
    
    //로컬로 등록해놔서 routes 를 아무데서나(global) 변수처럼 사용 가능. 사용자 정보를 저장하는 방법이 있음.
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    };
    next();
};
// single 은 한 파일만 올리도록
export const uploadVideo = multerVideo.single("videoFile");
// 이후에 router 에 uploadVideo 를 추가