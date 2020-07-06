//server 가 아닌 100% client 코드
//node.js 에서는 파일 경로를 absolute 로 만들어 주는 방법이 있다. path
const path = require('path');
const ExtractCSS = require("extract-text-webpack-plugin");

//package.json 에서 build:assets 추가한 이후 아래 줄 추가
const MODE = process.env.WEBPACK_ENV;
//__dirname 은 현재 프로젝트 디렉토리 이름. 전역변수
const ENTRY_FILE = path.resolve(__dirname, "assets","js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ENTRY_FILE,
    mode: MODE,
    // webpack 에게 .scss 파일을 만날 때마다 어떤 loader를 실행시켜라
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                //webpack 은 config 파일의 아래에서 위로 실행함
                use: ExtractCSS.extract([
                    {
                        loader: 'css-loader'
                    },
                    //호환성을 부여
                    {
                        loader:"postcss-loader"
                    },
                    {
                        loader: 'sass-loader'
                    }
                ])
            }
        ]

    },
    output: {
        path:OUTPUT_DIR,
        filename:"[name].[format]"
    }
};

module.exports = config;