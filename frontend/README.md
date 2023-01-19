# VideoConference

frontend 사전 설정
버전
node -v v18.12.1

사용
react 프레임워크
react-router-dom 라우터
recoil 상태관리매니저
react-responsive 반응형웹
styled-component style
dart-sass 스타일 scss
mui 다지인 라이브러리

<!-- 아래 설정은 최소 구성 시에 적용하는 방법 -->
<!-- git clone일 경우, npm i 만 진행 하면 된다. -->

# 설치된 메인 라이브러리

```bash
$ npm i react-router-dom@6
# `import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom’` 가져다 쓰면 됨

$ npm i styled-components
# 공통 테마 설정 → theme 폴더에 있음.

$ npm install recoil
# `import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil'` 가져다 쓰면 됨

$ npm install react-responsive
# https://velog.io/@pyo-sh/React-Responsive

$ npm i dart-sass
# https://smartstudio.tech/node-sass-to-dart-sass/

$ npm install @mui/material @mui/styled-engine-sc styled-components
# 스타일드컴포넌트 쓸 때 설치법

$ npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
# mui가 제공하는 이미지와 아이콘을 가져다 쓰기 위해 설치하자!

$ npm install react-daum-postcode
# 다음에서 제공하는 주소 검색 api
```

# 프로젝트 세팅

## eslint & prettier

기본적으로 아래 룰이 적용된다.
; semi는 필수로 적는다.
' 따움표는 단수만 적는다.
탭 너비는 2칸으로 고정한다.

-> airbnb code style이 적용되었다. 하단 참조.

```bash

$ npx eslint --init
  # 아래 설정으로 진행한다.
  # - You can also run this command directly using 'npm init @eslint/config'.
  # Need to install the following packages:
  # @eslint/create-config@0.4.2
  # Ok to proceed? (y) y
  # √ How would you like to use ESLint? · style

  # √ What type of modules does your project use? · esm
  # √ Which framework does your project use? · react
  # √ Does your project use TypeScript? · No
  # √ Where does your code run? · node
  # √ How would you like to define a style for your project? · guide
  # √ Which style guide do you want to follow? · standard
  # √ What format do you want your config file to be in? · JSON
  # Checking peerDependencies of eslint-config-standard@latest
  # Local ESLint installation not found.
  # The config that you've selected requires the following dependencies:

  # eslint-plugin-react@latest eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0
  # √ Would you like to install them now? · Yes
  # √ Which package manager do you want to use? · npm
  # Installing eslint-plugin-react@latest, eslint-config-standard@latest, eslint@^8.0.1, eslint-plugin-import@^2.25.2, eslint-plugin-n@^15.0.0, eslint-plugin-promise@^6.0.0

```

설정이 완료되면 .eslintrc.json 파일이 생성된다.

```bash

$ npm -D prettier

# eslint와 prettier 충돌방지 모듈
# eslint와 prettier을 함께 사용하면 충돌일 발생한다. 그럼에도 써야하기 때문에 설치
$ npm install eslint-plugin-prettier eslint-config-prettier --save-dev

```

```json

// 위의 파일들을 설치 후 package.json으로 이동해 아래 설정을 추가한다.
"scripts": {
    //...
    "//lint": "해당 파일에 lint가 적용된다.",
    "lint": "eslint --ext .js,.jsx,.ts,.tsx --fix src/",
    "//fix": "해당 파일을 prettier가 수정한다.",
    "fix": "prettier --write src/**/*.{js,jsx,ts,tsx,css,scss,md}",
}

```

## Husky & lint-staged

```bash

# .git과 package.json이 같은 폴더에 존재 할 경우,
$ npx mrm@2 lint-staged
# 이걸 하면 .husky 폴더도 생기고 package.json에 코드들도 자동으로 추가된다.
# npx mrm@2 lint-staged husky와 lint-staged를 호환하기 위한 설정을 자동으로 가져옴(다른 누군가가 올려둔 설정을 복사해온다.)

# 단, .git과 node-module의 위치가 다른 폴더 구조일 경우, husky의 path를 pre-commit에서 경로 수정 해주어야 한다.
# 해당 프로젝트의 경우 .git이 상위에 존재하고 하위에 package.json이 존재한다.
# 그럴 경우 다음처럼 각각 설치해서 직접 설정한다.
$ npm i -D husky lint-staged

```

husky 설치 후에 `package.json`에서 prepare scripts, lint-staged 내용 추가

```json
// package.json
  "scripts": {
      // ...
      "//prepare": "해당 프로젝트는 .git이 상위 폴더에 존재 하기 때문에, prepare가 .git이 있는 폴더까지 도달했다가 하위로 내려와 인스톨 되어야 한다.",
      "prepare": "cd ../ && husky install ./[Folder Name]/.husky",
  },
  // ...
  // 하단에 추가
  "//lint-staged": "lint-staged가 사용할 lint 규칙을 명시해줘야 한다. prettier와 eslint를 가지고 lint한다.",
  "lint-staged": {
    "//**/*{js,ts}": "모든 경로 모든 js, ts 파일에 대해 린트를 실행한다.",
    "**/*.{js,ts}": [
      "prettier . --write",
      "eslint --ext .js,.jsx,.ts,.tsx --fix src/"
    ],
    "*.{js,css,scss}": "prettier --write"
  }

```

그 후에 `npm i`하면 .husky 폴더가 생성됨
.husky 폴더에서 pre-commit 파일 생성하고 아래와 같이 입력.

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
cd ./[Folder Name] && npx lint-staged
```

설정이 완료되면,

```bash
$ npm run prepare
# 그냥 npm i 해도됨
```

이제 git commit 해서 테스트 해보면 된다.

## AirBnb code style 적용하기(eslint)

```bash
# react에서 적용하기 위해서 아래 코드를 사용한다.
npm install -D eslint-config-airbnb

# 에어비엔비가 가진 의존성 파일을 확인하고 설치 안된것은 설치한다.
npm info "eslint-config-airbnb@latest" peerDependencies
# 아래 파일들이 뜸
{
  eslint: '^7.32.0 || ^8.2.0',
  'eslint-plugin-import': '^2.25.3',
  'eslint-plugin-jsx-a11y': '^6.5.1',
  'eslint-plugin-react': '^7.28.0',
  'eslint-plugin-react-hooks': '^4.3.0'
}
```

.eslintrc.json에서 airbnb를 추가한다.

```json
"extends": [
    //...
    "airbnb",
    "airbnb/hooks"
  ]
```

airbnb code style(한국어): https://github.com/tipjs/javascript-style-guide

## 주소 검색 api(다음)

/\*\*

- [Title] Daum 우편번호 검색
- [Description] 리액트 컴포넌트로 만든 Daum 우편번호 검색 서비스
- [Usage]
- @props onComplete {Function} : 우편번호 검색 시 선택한 정보 받아올 콜백함수
- @props onSearch {Function} : 주소를 검색할 경우 실행되는 콜백함수
- @props onClose {Function} : 검색 결과선택 후 우편번호 검색이 닫힐때 실행되는 콜백함수
- @props onResize {Function} : 검색결과로 우편번호 화면 크기가 변경될때 실행되는 콜백함수
- @props className {String} : 우편번호 검색창을 감싸는 최상위 엘리먼트 ClassName
- @props style : 우편번호 검색창 최상위 엘리먼트 스타일
- @default {width:100%,height:400px}
- @props scriptUrl {String} : Daum 우편번호 스크립트 주소
- @default "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
- @props defaultQuery {String} : 우편번호 검색창에 기본으로 입력할 검색어
- @default undefined
- @props autoClose {Boolean} : 우편번호 검색 완료시, 자동닫힘 여부
- @default true
- @props errorMessage {React element} : 로드되지 않을때 보이는 에러 메시지
- @default "<p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>"
  \*/

https://cocoon1787.tistory.com/856
https://prod.velog.io/@endmoseung/%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%8B%A4%EC%9D%8C-%EC%A3%BC%EC%86%8C-API-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
