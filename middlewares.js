import routes from "./routes";

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
