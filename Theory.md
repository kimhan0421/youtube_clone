<h1 align="center">
<strong>YouTube Clone</strong><br>
</h1>

- 사용 언어 : React / Node.js

<p align="center">
<strong>1. 전체적 틀 만들고 MongoDB연결</strong><br>
</p>

- Boiler-plate
  => 개발의 template
  => youtube clone에 집중하기 위해
  => [다운](https://github.com/jaewonhimnae/boilerplate-mern-stack)
  => 구성
  _server_ ) Node
  _client_ ) React

```
node -v
```

=> 노드 버전 확인

```
npm install
```

=> dependencies 다운

_client_

```
npm install
```

_server - config - key.js_

개발환경이 (로컬) 혹은 deploy해서 (프로덕션) 모드로 할 수 있음<br>
=> 앱을 시작하면, 앱 자체에서 로컬인지 프로덕션인지 인식

> 프로덕션 ) *server - config - prod.js*에서 읽음<br>
> 로컬 ) *server - config - dev.js*에서 읽음

- MongoDB에 로그인
  => 로그인 후, create a starter Cluster<br>
  => aws ) Singapore<br>
  => Cluster Tier ) M0 Sandbox<br>
  => Cluster Name ) YouTubeClone<br>
  생성 후,<br>

  > Connect 클릭 후 모달 open됨<br>

  => connect your application 클릭<br>
  => Node.js / 3.0 or later<br>
  => 주소 copy후

  _server - config - dev.js_

  ```javascript
  module.exports = {
    mongoURI: '',
  };
  ```

  => 입력

  > Database Access ) <br>

  => add new Database user -> usename과 password입력 후 -> add user

  _server - config - dev.js_
  => <usename>과 <password>입력

<p align="center">
<strong>2. upload video Form</strong><br>
</p>

_package.json_

```json
"scripts": {
    "start": "node server/index.js",
    "backend": "nodemon server/index.js",
    "frontend": "npm run start --prefix client",
    "dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""
  },
```

=> npm run dev
=> dev ) concurrently 라이브러리를 이용해, backend의 서버가동 후 frontend의 client를 가동 할 수 있도록 함

1. _업로드 페이지 만들기_

_client) src - components - views_

=> page별로 폴더 만듦

- 폴더 ) VideoUploadPage - file) VideoUploadPage.js
  => Hook사용

> ES7 React/Redux/GraphQL/React-Native snippets \_ dsznajder 인스톨 후
> <strong>rfce</strong>=> 단축키 ) function component 기본 자동 생성

2. _라우터 만들기_

_App.js_

```javascript
<Route exact path="/" component={Auth(LandingPage, null)} />
<Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} /> //추가
```

=> component={Auth(LandingPage, null)} ) null경우 아무나 진입 가능
=> true일 경우 로그인 한 사람만 진입 가능
=> false일 경우 로그인 하면 진입 불가

3. _헤더 탭 만들기_

_RightMenu.js_

```javascript
if (user.userData && !user.userData.isAuth) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/login">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">Signup</a>
      </Menu.Item>
    </Menu>
  );
} else {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="upload">
        <a href="/video/upload">video</a> //추가
      </Menu.Item>
      <Menu.Item key="logout">
        <a onClick={logoutHandler}>Logout</a>
      </Menu.Item>
    </Menu>
  );
}
```

=> 로그인 하면 else로 return
=> 로그인 안하면 if문으로 return

4. _from 템플릿 만들기_

_VideoUploadPage.js_

css프레임 워크 사용 ) ANT DESIGN

5. _파일 올리는 템플릿 만들기_

- Drop-zone다운받기

=> client를 위한 것

> cd client

=> npm install react-dropzone --save

> save ) 다운받은 걸 표시해주기 위함

6. _onChange function만들기_

- option 선택

=> 하나씩 지정할 수 있지만 map함수 사용

```javascript
const PrivateOptions = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' }
]

const CategoryOption = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
]

<select onChange={handleChangePrivate}>
  {PrivateOptions.map((item, index) => (
      <option key={index} value={item.value}>{item.label}</option>
  ))}
</select>
<select onChange={handleChangesetCategory}>
  {CategoryOption.map((item, index) => (
      <option key={index} value={item.label}>{item.label}</option>
  ))}
</select>
```
