import routes from "../routes";

//element 를 받는 통로일 뿐 element 자체가 아님
import Video from "../models/Video";
import Comment from "../models/Comment";

import { Error } from "mongoose";

export const home = async (req, res) => {
  //await 는 error 가 나도 어쨌든 그 줄이 끝나면 다음 줄을 실행하기 때문에, 에러를 잡기 위해 try, catch
  try {
    //async 가 없으면 어떤 실행이 끝나기 전에 아래 줄의 res.render 를 실행
    //await 다음 과정이 끝나기 전까지 기다려라
    const videos = await Video.find({}).sort({ _id: -1 }); // 최근에 올린 영상이 맨 위에 있도록 위아래 순서를 바꿈
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    // title:searchingBy 하면 완전히 같은  단어를 검색
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }); // 어떤 단어를 포함하는 걸 모두 검색
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    //const {body, file} 을 아래서 console.log(body,file); 로 출력하면 안에 path 값이 있음
    file: { location }, // aws s3 는 path 대신 location
  } = req;

  // To Do: Upload and save video
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
  //id 를 console log // console.log(req.params),  주소값의 :name 라고 되어 있는 부분을 가져올 수 있음 ex) req.params.id
  const {
    params: { id }, // id 는 video 의 id
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments"); //populate 는 objectID 타입에만 쓸 수 있다.
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

//get 은 뭔가를 채워 넣는 작업. post 는 update & redirect
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    // 강의에선 !== 였는데
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    // update 하면 끝이라 변수에 저장하지 않고 바로 await 로 시작
    // title 은 video model 의 videoSchema 의 요소와 같은 이름을 사용하여 title: title 로 인식함
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    // 강의에선 !== 였는데
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register video view. 이 url 은 database 를 변경하기 위한 것

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
