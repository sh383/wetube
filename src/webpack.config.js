//server 와는 연결시키지 않는다. 100% client 코드
//node.js 에는 파일 경로를 absolute 로 만들어 주는 방법이 있다. path
const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

//package.json 에서 build:assets 추가한 이후 아래 줄 추가
const MODE = process.env.WEBPACK_ENV;
//__dirname 은 현재 프로젝트 디렉토리 이름. 전역변수
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    // webpack 에게 .scss 파일을 만날 때마다 어떤 loader를 실행시켜라
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        //webpack 은 config 파일의 아래에서 위로 실행함
        //scss 혹은 sass 를 css 로 변형 시키는 과정
        use: ExtractCSS.extract([
          {
            loader: "css-loader",
          },
          //단순 번역만 하는게 아니라 호환성을 부여 postcss.org
          {
            loader: "postcss-loader",
            options: {
              //plugin 은 function 이 됨
              plugins() {
                // 99.5% 가 사용하는 브라우저 모두에 적용
                return [autoprefixer({ overrideBrowserslist: "cover 99.5%" })];
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
