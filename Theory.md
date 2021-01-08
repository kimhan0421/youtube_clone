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
  => usename과 password입력

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

=> npm run dev<br>
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

=> component={Auth(LandingPage, null)} ) null경우 아무나 진입 가능<br>
=> true일 경우 로그인 한 사람만 진입 가능<br>
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

=> 로그인 하면 else로 return<br>
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

<p align="center">
<strong>prettier적용</strong><br>
</p>

- 설치

```
npm i prettier eslint-config-prettier eslint-plugin-prettier -D

```

- client 적용

```
yarn prettier --write src/**
```

<p align="center">
<strong>3. Multer로 서버에 비디오 저장하기</strong><br>
</p>

0. OnDrop func만들기

_VideoUploadPage.js_

```javascript
const onDrop = (file) => {
  let formData = new FormData();
  const config = {
    header: { 'content-type': multipart / form - data },
  };
  formData.append('file', files[0]);

  Axios.post('/api/video/uploadfiles', formData, config).then((res) => {
    if (res.data.success) {
    } else {
      alert('비디오 업로드를 실패했습니다.');
    }
  });
};
```

=> multiple={false} ) 한번에 파일 하나만 올릴 것<br>
=> maxSize={100000} ) 사이즈 지정<br>
=> file 파라미터 ) 파일의 정보들을 파라미터로 받아옴

_폴더)server - routes - video.js파일 생성_

```javascript
router.post('/uploadfiles', (req, res) => {
  //비디오를 서버에 저장
});
```

=> url입력 + 콜백(file보냄\_req)

_index.js_

```javascript
app.use('/api/video', require('./routes/video'));
```

=> video라우트로 온다(video.js)

1. 노드서버에 파일을 저장하기 위해 Dependency먼저 다운
   => 비디오를 서버에 저장한다.

   ```
   npm install multer --save
   ```

_server ) video.js_

```javascript
const multer = require('multer');
```

=> multer설치 후 불러옴

2. 비디오 파일을 서버로 보내기

3. 받은 비디오 파일을 서버에서 저장

4. 파일 저장 경로를 클라이언트로 전달

```javascript
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single('file');
```

=> client에서 파일을 보내면, storage를 먼저타고,<br>
때문에 multer에 storage에 넣고 / 파일은 single로<br>
=> destination ) 파일을 받아오면 어디에 저장할 지 지정<br>
=> 최상단에 upload폴더 생성<br>
=> filename ) 파일 저장시 어떤 이름으로 저장할지<br>
=> fileFilter ) 파일 형식 ex. mp4만 받겠다

```javascript
router.post('/uploadfiles', (req, res) => {
  //비디오를 서버에 저장
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.fileName,
    });
  });
});
```

=> 파일을 저장

<p align="center">
<strong>4. ffmpeg로 비디오 썸네일 생성</strong><br>
</p>

1. <strong>썸네일 생성을 위한 Dependency다운</strong>

> 맥의 경우

```
brew install ffmpeg

```

- 설치

```
npm install fluent-ffmpeg --save
```

_VideoUploadPage.js_

```
axios.post('/api/video/thumbnail', variable)
```

2. <strong>서버에 저장된 비디오를 이용한 썸네일 생성</strong>
3. <strong>생성된 썸네일을 서버에 저장</strong>
4. <strong>썸네일 이미지 파일 경로 정보를 클라이언트에 보내기</strong>

- 설명)
  axios.post('/api/video/uploadfiles', formData, config) 에<br>
  server에서 data를 성공적으로 받아오면<br>
  axios.post('/api/video/thumbnail', variable)를 하도록 추가<br>

=> variable변수 ) server에서 data를 성공적으로 받아오면, url과 fileName을 받아옴

_server ) routes ) video.js_

```
var ffmpeg = require("fluent-ffmpeg")
```

=> 다운받은 ffmpeg를 가져옴

```javascript
ffmpeg(req.body.filePath)
  .on('filenames', function (filenames) {
    console.log('Will generate ' + filenames.join(', '));
    thumbsFilePath = 'uploads/thumbnails/' + filenames[0];
  })
  .on('end', function () {
    console.log('Screenshots taken');
    return res.json({
      success: true,
      thumbsFilePath: thumbsFilePath,
      fileDuration: fileDuration,
    });
  })
  .screenshots({
    // Will take screens at 20%, 40%, 60% and 80% of the video
    count: 3,
    folder: 'uploads/thumbnails',
    size: '320x240',
    // %b input basename ( filename w/o extension )
    filename: 'thumbnail-%b.png',
  });
```

=> client에서 받아온 파일 저장 경로<br>
=> 파일 이름 새로 생성<br>
=> end ) 비디오 생성하고 뭘 할건지<br>
=> error) 에러 나면 어떻게 할건지<br>
=> 옵션- 스크린샷) 3개의 썸네일 , uploads폴더 안에 thumbnails폴더안에 생성(thumbnails폴더 생성), 사이즈 지정, 파일이름 지정

```javascript
let thumbsFilePath = '';
let fileDuration = '';

//비디오 정보
ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
  console.dir(metadata);
  console.log(metadata.format.duration);

  fileDuration = metadata.format.duration;
});
```

let thumbsFilePath = "";<br>
let fileDuration = "";<br>
=> 변수 미리 지정<br>
=> ffprobe는 ffmpeg다운 받을 때 같이 다운<br>
=> fileDuration ) 비디오의 러닝타임 가져옴

5. <strong>썸네일 이미지를 화면에 표시</strong>

_VideoUploadPage.js_

```javascript
const [FilePath, setFilePath] = useState('');
const [Duration, setDuration] = useState('');
const [Thumbnail, setThumbnail] = useState('');
```

=> 비디오 정보를 state에 저장

```javascript
axios.post('/api/video/thumbnail', variable).then((response) => {
  if (response.data.success) {
    setDuration(response.data.fileDuration);
    setThumbnail(response.data.thumbsFilePath);
  } else {
    alert('썸네일 생성에 실패했습니다.');
  }
});
```

=> server에서 data를 받아오는 것이 성공하면<br>
setDuration과 setThumbnail 정보 업데이트

```javascript
{
  Thumbnail !== '' && (
    <div>
      <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
    </div>
  );
}
```

=> 썸네일 path ) 5000 prot를 사용하고 있으니 지정해줘야 함<br>
=> Thumbnail sate) 빈 string이기 때문에 초기값은 그림이 안뜬다<br>
따라서, 썸네일이 있을경우에만 썸네일이 보이도록!

<p align="center">
<strong>5. 비디오 업로드 하기</strong><br>
</p>

- RDBMS vs MongoDB 의 Database
  => tables = collections
  => rows = documents
  => columns = fields

1. 비디오 Collection 만들기

- fields
  => writer, title, description, privacy, filePath, category, views, duration, thumbnail

_server - models - file)Video.js 생성_

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video };
```

=> videoSchema의 writer )
ID로 지정해주면,
다른 Schema의 모든 정보들을 불러올 수 있음
ref로 user를 지정해주면, 불러올 model이 userSchema인 것을 알 수 있음
=> { timestamps: true } )
만든날과 업데이트 한 날을 표시할 수 있다.

2. onSubmit Function 만들기

_VideoUploadPage.js_

```javascript

<Form onSubmit={onSubmit}></Form>
<Button type='primary' size='large' onClick={onSubmit}>
  Submit
</Button>
```

=> onSubmit 추가

```javascript
const onSubmit = (e) => {
  e.preventDefault();
  const variables = {
    writer: user.userData._id,
    title: VideoTitle,
    description: Description,
    privacy: Private,
    filePath: FilePath,
    category: Category,
    duration: Duration,
    thumbnail: Thumbnail,
  };
  axios.post('/api/video/uploadVideo', variables).then((response) => {
    if (response.data.success) {
      alert('video Uploaded Successfully');
      props.history.push('/');
    } else {
      alert('비디오 업로드에 실패 했습니다.');
    }
  });
};
```

=> onSubmit 함수 추가
=> 리덕스 스토어에서 가져옴

> 가져오기 ) 리덕스 훅을 사용

```javascript
import { useSelector } from 'react-redux';

function VideoUploadPage() {
  const user = useSelector((state) => state.user);
}
```

3. 요청할 데이터들을 서버로 보낸다

- axios.post('/api/video/uploadVideo', variables)
  => url만들기

_server - routes - video.js_

```javascript
router.post('/uploadvdieo', (req, res) => {
  //비디오 정보들을 저장한다.
  new Video(req.body);
});
```

=> req.body) 모든 정보들을 담음

> 모든 정보들) client에서 정의했던 정보들

```javascript
const variables = {
  writer: user.userData._id,
  title: VideoTitle,
  description: Description,
  privacy: Private,
  filePath: FilePath,
  category: Category,
  duration: Duration,
  thumbnail: Thumbnail,
};
```

4. 보낸 데이터들을 MongoDB에 저장한다.

```
video.save()
```

=> MongoDB에 저장

```javascript
router.post('/uploadvdieo', (req, res) => {
  //비디오 정보들을 저장한다.
  const video = new Video(req.body);
  video.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});
```

_VideoUploadPage.js_

```javascript
setTimeout(() => {}, 3000);
```

=> 3초뒤 페이지 이동
