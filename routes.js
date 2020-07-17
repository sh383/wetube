//url 정리
//Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
//express 는 :id 가 변한다는 것을 알아 차림 
const USERS= '/users';
const USER_DETAIL= '/:id';
const EDIT_PROFILE= '/edit-profile';
const CHANGE_PASSWORD= '/change-password';

//Videos

const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
//컨트롤러에서 어떤 data를 가졌다는 것을 표현하고 싶다면 ':이름' console.log(req.params) 하면 이름을 logging 
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';


const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    
    // 함수화 시키자 웹이 :id 를 인식할 수 있도록
    // userRouter 도 수정해서 함수를 실제로 실행해야 한다
    userDetail: (id) => {
        if (id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if(id){
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: EDIT_VIDEO,
    deleteVideo: DELETE_VIDEO
};

export default routes;