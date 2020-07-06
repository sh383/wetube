//server 가 아닌 100% client 코드
//node.js 에서는 파일 경로를 absolute 로 만들어 주는 방법이 있다. path
const path = require('path');

//__dirname 은 현재 프로젝트 디렉토리 이름. 전역변수
const ENTRY_FILE = path.resolve(__dirname, "assets","js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ENTRY_FILE,
    output: {
        path:OUTPUT_DIR,
        filename:"[name].[format]"
    }
};

module.exports = config;