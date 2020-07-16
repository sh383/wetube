import routes from "../routes";

//element 를 받는 통로일 뿐 element 자체가 아님
import Video from "../models/Video"

export const home = async (req, res) => {
  //await 는 error 가 나도 어쨌든 그 줄이 끝나면 다음 줄을 실행하기 때문에, 에러를 잡기 위해 try, catch
  try {
    //async 가 없으면 어떤 실행이 끝나기 전에 아래 줄의 res.render 를 실행
    //await 다음 과정이 끝나기 전까지 기다려라
    const videos = await Video.find({});
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error){
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos : []});
  }
}

export const search = (req, res) => {
    const {
        query: { term : searchingBy}
    } = req;
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: {title, description},
    //const {body, file} 을 아래서 console.log(body,file); 로 출력하면 안에 path 값이 있음
    file: { path }
  } = req;
  
  // To Do: Upload and save video
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  })
  console.log(newVideo)
  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = (req, res) =>
res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
res.render("deleteVideo", { pageTitle: "Delete Video" });