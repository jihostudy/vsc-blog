## 구현 목표
본 프로젝트는, Visual Studio Code 형태의 블로그 오픈소스를 제작하는 것에 있다. <br/>
사용자는 Firebase를 통해 쉽게 서버를 구축하고, 블로그를 원하는 만큼 수정할 수 있다.

## 구현 기능
- Firebase를 활용한 백엔드 구축
  Post, Folder, Comment 관리
- 사용자 정보 저장 및 Verify


## 사용 방법
1. git clone
   프로젝트를 로컬 폴더에 다운로드 받습니다.
2. npm install
   해당 프로젝트에 필요한 라이브러리 및 Dependency를 전부 설치하는 명령어입니다.
3. Firebase 연동
   해당 경로의 문헌을 참고하여 Firebase 계정을 생성해주세요. <br/>
  [[](https://vivid-chamomile-2f5.notion.site/vsc-blog-2936ba044b4f4aee871dea753bc1c7ef?pvs=4)](https://vivid-chamomile-2f5.notion.site/vsc-blog-2936ba044b4f4aee871dea753bc1c7ef?pvs=4) <br/>
    이제 Firebase를 사용할 준비가 완료되었습니다. <br/>
    발급받은 Key의 외부유출에 주의해주세요.<br/>
   
4.  유저 정보 입력
    1. public > Info > UserInfo.ts 코드에 본인의 정보를 입력해주세요. <br/>
    2. .env.local에 다음과 같이 본인확인에 사용할 비밀번호를 입력해주세요. <br/>
       ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/c7acbec0-f26c-4abb-bae9-0b5b1c3f3456) <br/>

## 로컬에서 빌드 및 실행하기
```bash
$ docker build -t [Docker Image 이름:태그] . --build-arg ENV_MODE:.local
$ docker run -d -p 3000:3000 [실행할 Docker Image 이름]

```

## 실행 예시
첨부 에정

## Reference
[https://nextjs.org/](https://github.com/vercel/next.js) <br/>
[https://mui.com/material-ui/material-icons/](https://mui.com/material-ui/material-icons/)<br/>


## Todo List
기능 <br/>
[ ] 글 수정 <br/>
[ ] Resize Terminal & PostList <br/>

UI <br/>
[ ] White Mode <br/>
[ ] Comment with Icons <br/>





  
