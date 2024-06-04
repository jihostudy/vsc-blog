## 구현 목표
본 프로젝트는, Visual Studio Code 형태의 블로그 오픈소스를 제작하는 것에 있다. <br/>
사용자는 Firebase를 통해 쉽게 서버를 구축하고, 블로그를 원하는 만큼 수정할 수 있다.

## 구현 기능
- Firebase를 활용한 백엔드 구축
  Post, Folder, Comment 관리
- 사용자 정보 저장 및 Verify


## 사용 방법
1. git clone
   - 프로젝트를 로컬 폴더에 다운로드 받습니다.
2. npm install
   - 해당 프로젝트에 필요한 라이브러리 및 Dependency를 전부 설치하는 명령어입니다.
3. Firebase 연동
   1. Firebase 계정을 생성합니다.
   2. Go to Console > 프로젝트 추가
      해당 블로그에 사용할 프로젝트를 추가합니다.<br/>
    ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/0b955f39-f67e-4a60-97ae-118707ff597e)<br/>
    ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/5696ef3d-69ff-45b8-9a83-bcd539915543)<br/>
    
   3. 프로젝트 정보를 입력합니다.<br />
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/a556b429-92e6-41f8-82e4-4cb51e2d1044)<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/ae6d7168-4550-4cd4-9172-ebd9328a3b47)<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/253b0027-71e6-4f49-bdbc-8f206681526c)<br/>
   
   4. Database 활성화 <br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/b6e2174b-12e7-4d63-a36f-a18d20c11ca3)<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/2f36d2d6-ab64-4f7d-b984-35bb18d6ea9c)<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/b3a3d78c-95a8-4fd1-b501-07d939d6d685)<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/8c63d82c-c6e6-490f-a66c-7687aea01a91)<br/>

   5. Database 권한 변경 <br />
      데이터베이스에 자유롭게 접근하기 위해, 권한을 변경해주세요.<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/d2d5e631-7d98-4098-a6bd-91663e024b3d)<br/>

   6. API Key발급 <br/>
      Web에서 Firebase를 사용하기 위해, WebKey를 발급받아주세요.<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/fc676e01-38f6-4a0e-9283-7a14afebc832)<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/5e8a6fc9-4950-46e8-abc8-4c3326d2e9f0)<br/>

      이후, 팝업 화면의 내용을 토대로 7번을 수행해주세요.<br/>
      ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/be4242ae-93f4-4cd1-aa72-e9b12fb96a89)<br/>
      * 해당 Key는 사용불가능한 예시입니다.<br/>
   7. .env.local 파일에 다음과 같이 입력합니다.<br/>
      ```bash
      #firebase
      NEXT_PUBLIC_API_KEY = AIzaSyBTaHrJqCNu3bvGXyuLNna7CZI302bsZBw
      NEXT_PUBLIC_AUTH_DOMAIN = enter-your-proj-name.firebaseapp.com
      NEXT_PUBLIC_PROJECT_ID = enter-your-proj-name
      NEXT_PUBLIC_STORAGE_BUCKET = enter-your-proj-name.appspot.com
      NEXT_PUBLIC_SENDER_ID = 724253861173
      NEXT_PUBLIC_APP_ID = 1:724253861173:web:fab110518d288a98d9187c
      NEXT_PUBLIC_MEASUREMENT_ID = G-21XXELQ9KF
      ```

    이제 Firebase를 사용할 준비가 완료되었습니다. <br/>
    발급받은 Key의 외부유출에 주의해주세요.<br/>
   
5.  유저 정보 입력
    1. public > Info > UserInfo.ts 코드에 본인의 정보를 입력해주세요.
    2. .env.local에 다음과 같이 본인확인에 사용할 비밀번호를 입력해주세요. <br/>
       ![image](https://github.com/jihostudy/vsc-blog/assets/110150963/c7acbec0-f26c-4abb-bae9-0b5b1c3f3456) <br/>

6. npm run build
   - 프로젝트를 빌드

7. npm start
   - 프로젝트를 실행
  

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





  
