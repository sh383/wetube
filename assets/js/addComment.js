import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment, // VideoController 의 postAddComment 에서 받는 값이 comment 임. comment 라는 이름으로 (입력된)comment 를 받음
    },
  });
  console.log(response);
};

const handleSubmit = (event) => {
  event.preventDefault(); // Reload 를 막아줌
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
