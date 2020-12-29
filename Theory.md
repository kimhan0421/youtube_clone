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
    mongoURI: "",
  };
  ```

  => 입력

  > Database Access ) <br>

  => add new Database user -> usename과 password입력 후 -> add user

  _server - config - dev.js_
  => <usename>과 <password>입력
