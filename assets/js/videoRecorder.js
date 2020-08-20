const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
  try {
    // 유저의 응답을 기다리기 위해 await
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
  } catch (error) {
    recordBtn.innerHTML = "😭 Can't record";
    recordBtn.removeEventListener("click", startRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
  init();
}
