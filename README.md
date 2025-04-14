# 🌟 BUZZLE(버즐)
<img width="700" alt="" src="https://github.com/user-attachments/assets/b0d8758d-ff33-44db-943d-19fe79bba459" />


## 📌 프로젝트 소개

- **프로젝트 개요**:  
요즘 사람들은 기초적인 지식을 바탕으로 한 게임을 선호하는 경향이 있습니다. <br>
술자리 게임이나 MT에서 즐기는 간단한 퀴즈, 인스타그램 릴스에서 자주 보이는 ‘문제 빨리 맞히기’ 게임 등, 일상 속 다양한 상황에서 지식 기반 게임이 인기를 끌고 있습니다. <br>
저희는 이러한 흐름에 맞춰, 사람들에게 재미있는 퀴즈를 제공하며 자연스럽게 지식을 넓힐 수 있도록 돕고자 합니다.


- **주요 기능**:
  - 📝 **싱글 퀴즈 풀기**:  
    퀴즈 선택 시 설정한 값(상/중/하)에 따라 AI로 생성된 퀴즈를 실제로 풀며 학습하는 공간입니다.
  - 🆚 **1:1 대결**:  
    읽은 작품과 관련된 퀴즈를 풀어보며, 내용을 복습하고 이해도를 높일 수 있습니다.
  - 📚 **마이페이지**:  
    점수, 승·패 전적, 프로필 사진, 닉네임, 랭킹 등이 시각화된 형태로 제공됩니다.
---

## 🚀 기술 스택
| 구분                   | 기술                                                                 |
|------------------------|----------------------------------------------------------------------|
| **Frontend**           | React JS, Vite                                                      |
| **State Management**   | Zustand                                                             |
| **Networking & API**   | HTTP, Axios, SockJS, STOMP, EventSource (event-source-polyfill)     |
| **UI & Styling**       | Tailwind CSS, framer-motion, LottieFiles, lucide-react, tailwind-merge |
| **Routing**            | React Router DOM                                                   |
| **Type Checking**      | TypeScript                                                         |
| **Linting**            | ESLint, eslint-plugin-react-hooks, eslint-plugin-react-refresh     |
| **Build Tool**         | Vite, TypeScript Compiler (tsc)                                    |
| **PWA**                | vite-plugin-pwa                                                    |
| **Authentication**     | Kakao SDK                                                          |
| **Deployment**         | Netlify                                                            |

<br>

| 구분                   | 기술                                                               |
|------------------------|--------------------------------------------------------------------|
| **Backend**            | Java 17, Spring Boot 3.31                                           |
| **Web Framework**      | Spring MVC (REST API), Spring WebFlux (Reactive, SSE)              |
| **Realtime Messaging** | WebSocket (Spring WebSocket), Server-Sent Events (SSE)             |
| **AI 연동**             | OpenAI GPT API  |
| **ORM & Database**     | Spring Data JPA, Hibernate, MySQL                    |
| **Authentication**     | JWT, OAuth2 Client                                |
| **API 문서화**          | Springdoc OpenAPI (Swagger UI)                                     |
| **빌드 도구**            | Gradle                        |
| **환경 설정**            | Spring Profiles, application.yml / application.properties          |
| **로깅**                |  SLF4J                     |
| **배포 및 실행**         |  Spring Boot Jar, AWS EC2          |
<div>
  <!-- Java -->
<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white" />

<!-- Spring Boot -->
<img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=Spring%20Boot&logoColor=white" />

<!-- Spring Data JPA -->
<img src="https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=Spring&logoColor=white" />

<!-- NGINX -->
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />

<!-- Swagger -->
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black" />

<!-- QueryDSL -->
<img src="https://img.shields.io/badge/QueryDSL-4485F4?style=for-the-badge&logo=Google&logoColor=white" />

<!-- AWS RDS -->
<img src="https://img.shields.io/badge/AWS%20RDS-527FFF?style=for-the-badge&logo=Amazon%20RDS&logoColor=white" />

<!-- AWS S3 -->
<img src="https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white" />

<!-- SSE (Server-Sent Events) -->
<img src="https://img.shields.io/badge/SSE(Server--Sent%20Events)-800080?style=for-the-badge&logo=Signal&logoColor=white" />

<!-- MySQL -->
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white" />

  <img src="https://img.shields.io/badge/WebSocket-C93CD7?style=for-the-badge&logo=Socket&logoColor=white">

</div>
---

## 🔗 API 연동

### ✅ API 연동 특징
- HTTP 통신 (http 패키지 활용)
- JWT 기반 사용자 인증 & SharedPreferences 토큰 관리
- SSE + Queue를 이용한 매칭, websocket을 이용한 1대1 대전

---

## 🛠️ 주요 기능

### 📖 로그인, 로그아웃, 마이페이지
| 항목 | 내용 |
|------|------|
| **기능** |  OIDC, JWT 기반 로그인 / 로그아웃을 구현. 그리고 마이페이지로 사용자 본인의 활동 이력을 한눈에 확인할 수 있게 합니다. |
| **스크린샷** | <img src="https://github.com/user-attachments/assets/b742883e-db57-4819-9745-93b6aea4d5e5" width="200px"> |

### 📝 싱글 퀴즈 풀기
| 항목 | 내용 |
|------|------|
| **기능** | 사용자가 AI로 생성된 퀴즈를 실제로 풀며 학습하는 공간입니다. |
| **스크린샷** | <img src="https://github.com/user-attachments/assets/cd461a06-25c7-4e23-a2d9-8f243727be05" width="200px"> |

### 🆚 1:1 대결 
| 항목 | 내용 |
|------|------|
| **기능** | 사용자 두 명이 동시에 동일한 퀴즈 문제를 풀면서 실시간으로 경쟁할 수 있습니다. |
| **스크린샷** | <img src="https://github.com/user-attachments/assets/a5fe8d17-e5a0-42c3-9308-045e0698f9cc" width="200px"> |

### 🥇 랭킹 페이지
| 항목 | 내용 |
|------|------|
| **기능** | 사용자 간 학습 활동 결과를 점수화하여 순위를 제공합니다. |
| **스크린샷** | <img src="https://github.com/user-attachments/assets/0ae474d8-203f-4fd8-ab8d-d8573fa2b43e" width="200px"> |
---


## 📢 팀원 소개

| 이름 | 역할 | 담당 기능 | GitHub |
|------|------|-----------|--------|
| <div align="center"><img src="https://github.com/kdc9050.png" width="80"/><br>김동찬</div> | 프론트엔드 개발 | UI 설계 및 로그인, 상태 관리 및 API 연동, 마이페이지, 랭킹페이지, 라우터 설계, 멀티 플레이 기능 구현 | [@kdc9050](https://github.com/kdc9050) |
| <div align="center"><img src="https://github.com/Zvckaya.png" width="80"/><br>허남규</div> | 프론트엔드 개발 | UI 설계 및 대결 기능, 싱글 플레이 기능 구현, 라우터 설계, sse설정, 멀티 플레이 기능 구현 | [@Zvckaya](https://github.com/Zvckaya) |
| <div align="center"><img src="https://github.com/inhooo00.png" width="80"/><br>최인호</div> | 백엔드 개발 | API 설계, 인증 처리, DB 구축 및 서버 운영 등 | [@inhooo00](https://github.com/inhooo00) |


