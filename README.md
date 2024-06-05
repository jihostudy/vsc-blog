## 0. 실행 예시
![image](https://github.com/jihostudy/vsc-blog/assets/110150963/1de38df6-2f17-48ee-ad3a-eaa001f40e65)

## 1. 구현 목표
VSCode와 유사한 인터페이스를 통해 친숙한 환경에서 블로그를 생성하고 관리할 수 있도록 합니다. </br>
사용자가 자신만의 스타일로 블로그를 커스터마이즈할 수 있도록 다양한 설정 옵션을 제공합니다. </br>

## 2. 구현 기능
- 사용자 정보 저장 및 Verify
- 마크다운 형식의 포스트 작성 및 관리 기능.
- 폴더 관리 및 Tab 관리 
- Firebase를 활용한 백엔드 서버 구축
- 방문자들이 포스트에 댓글을 달 수 있는 기능.


## 3. 사용 방법
1. git clone <br/>
   프로젝트를 로컬 폴더에 다운로드 받습니다. <br />
   ```bash
   git clone https://github.com/jihostudy/vsc-blog.git .
   ```
2. npm install <br/>
   해당 프로젝트에 필요한 라이브러리 및 Dependency를 전부 설치하는 명령어입니다. <br />
   ```bash
   cd vsc-blog
   npm install
   ```
3. Firebase 연동 <br/>
   해당 경로의 문헌을 참고하여 Firebase 계정을 생성해주세요. <br/>
   [Firebase 계정 생성 Notion](https://vivid-chamomile-2f5.notion.site/vsc-blog-2936ba044b4f4aee871dea753bc1c7ef?pvs=4) <br/>
   이제 Firebase를 사용할 준비가 완료되었습니다. <br/>
   발급받은 Key의 외부유출에 주의해주세요.<br/>
   
4.  유저 정보 입력
    1. public > Info > UserInfo.ts 에 본인의 정보를 입력해주세요. <br/>
       ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/d96b51ca-5a20-438d-a22b-352fec93fbec) <br/>

    2. .env.local에 다음과 같이 본인확인에 사용할 비밀번호를 입력해주세요. <br/>
       ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/c7acbec0-f26c-4abb-bae9-0b5b1c3f3456) <br/>

## 4. 로컬에서 빌드 및 실행하기
```bash
(Root 경로에서 실행)
$ docker build -t [Docker Image 이름:태그] . --build-arg ENV_MODE:.local
$ docker run -d -p 3000:3000 [실행할 Docker Image 이름]

```

## 5. Tech
### 5.1. Tech Stack
- Next.js (Typescript)
- Tailwind CSS
- Firebase
- Zustand
- Material UI / Next UI / react-icons

### 5.2. Project Structure
```
vsc-blog/
├── app
│   ├── (routes)
│   │   ├── newPost
│   │   └── posts
│   │       ├── [id]
│   ├── components
│   │   ├── UI
│   │   ├── common
│   │   ├── main
│   │   └── posts
│   └── styles
├── lib
│   ├── context
│   ├── firebase
│   ├── functions
│   ├── providers
│   └── templates
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── Info
│   └── icons
├── Dockerfile
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 6. Contribute
### 6.1 How to Contribute
1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Make Changes on created feature branch
4. Commit your changes: `git commit -m 'Add some feature'` 
   (Recommend to use gitmoji for commits)
5. Push to the branch: `git push origin feature/my-new-feature`
6. Submit a pull request merging into the `main` branch.

### 6.2 :wave: Contributors
<a href="https://github.com/jihostudy/vsc-blog/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jihostudy/vsc-blog" />
</a>

## 7. Todo List
**Functions <br/>**
[1] 글 수정 <br/>
[2] 크기 조정 기능: Terminal & PostList Resizable <br/>
[3] 검색 기능: 블로그 내의 포스트를 쉽게 검색할 수 있는 기능 <br/>
[4] 카테고리 및 태그 관리: 포스트를 카테고리 및 태그로 분류하여 관리할 수 있는 기능 <br/>
[5] 소셜 미디어 공유: 포스트를 다양한 소셜 미디어에 쉽게 공유할 수 있는 기능 <br/>
[6] 구독 기능: 방문자들이 블로그를 구독하고 새 포스트에 대한 알림을 받을 수 있는 기능 <br/>

**UI/UX <br/>**
[1] 테마 기능: 원하는 테마로 변경 가능 (White mode) <br/>
[2] 댓글 꾸미기: 댓글마다 Icon 선택 가능 <br/>
[3] 반응형 디자인 <br/>

## Reference
[Next.js](https://github.com/vercel/next.js) <br/>
[Material UI](https://mui.com/material-ui/material-icons/)<br/>
[Next UI](https://nextui.org/) <br/>
[Firebase](https://firebase.google.com/?_gl=1*1r8nsd9*_up*MQ..*_ga*MjQ4MTY1NTM1LjE3MTc1NzUxMjM.*_ga_CW55HF8NVT*MTcxNzU3NTEyMy4xLjAuMTcxNzU3NTEzNS4wLjAuMA..&hl=ko)



  
