# 아티스트 공연 홍보/펀딩 서비스  **🔗 sinc** 
![badge](https://img.shields.io/badge/Part-Back--end-brightgreen) ![lang](https://img.shields.io/badge/Language-TypeScript-blue) ![nest.js](https://img.shields.io/badge/Tech--stack-Nest.js-red) ![Node.js](https://img.shields.io/badge/Tech--stack-Node.js-green) ![AWS](https://img.shields.io/badge/Tech--stack-AWS-orange) ![Docker](https://img.shields.io/badge/Tech--stack-Docker-skyblue) ![Firebase](https://img.shields.io/badge/Tech--stack-Firebase-blue) ![GraphQL](https://img.shields.io/badge/Tech--stack-GraphQL-purple) ![MySQL](https://img.shields.io/badge/Tech--stack-MySQL-blue) ![Prisma](https://img.shields.io/badge/Tech--stack-Prisma-white) ![realease](https://img.shields.io/badge/release-v1.0.0-yellow)
<p align="center"><img src="https://github.com/Team-Jinx/Sinc-web/raw/main/README_IMG.png" alt="배너" width="100%" /></p>

<br />

#### 📱 스택 선정 이유
- TypeScript - 코드 작성 단계에서 타입을 체크함으로써 예상하지 못한 오류를 사전 차단할 수 있다는 장점이 있다.
- NestJS - TypeScript를 완전히 지원하며 OOP, DI 등 다양한 디자인 패턴을 쉽게 구축할 수 있도록 도와주기때문에 사용하게 되었다.
- Docker - docker와 docker-compose를 이용해 서버가 꺼지지 않도록 프로세스를 유지하고, 항상 일관된 환경에서 서비스를 배포할 수 있도록 사용한다. 추후 서비스의 비대해짐에 따라 수평적 확장을 더욱 용이하게 하거나, 서비스를 기능단위로 운영하기 위해(Micro Service Architecture) 사용한다.
- Firebase - 공연 관련 알림을 지원하기 위해 사용한다.
- MySQL - 예약과 결제, 현물을 다루는 서비스이므로 정합성과 무결성을 지키기 용이한 RDBMS중 오픈소스인 MySQL을 사용하게 되었다.
- AWS - 유연한 스케일 아웃을 위한 클라우드 컴퓨팅을 선택했고 그 중, 1년간 프리티어로 사용할 수 있는 이점이 있기에 AWS를 선택했다.
- 
<br/>

### 🖥 sinc의 주요 기능 소개

### 로그인 화면
사용자가 로그인을 하는 화면
- 카카오 Login Oauth2 api를 통한 사용자 로그인 화면(추후 구현 예정)

### 메인 화면
현재 인기있는 아티스트들과 공연, 숏폼 영상에 대한 정보를 한 눈에 볼 수 있는 화면
- 카테고리 인덱싱으로 빠른 응답 기대
- S3에서 이미지 로드

### 숏폼 영상 화면
숏폼 영상을 시청할 수 있는 화면
공감 버튼을 통해 아티스트/공연을 응원하거나, 공연 상세 페이지 버튼을 통해 공연에 대한 상세정보 얻기 가능하다.
- S3에 저장되어 있는 video URL 제공
- 화면을 넘길 때 커서기반 페이지네이션 적용

### 공연 상세정보 화면
공연의 상세 정보를 확인할 수 있는 화면
하단 버튼을 통해 펀딩 화면으로 넘어갈 수 있다.
- Join으로 공연, 아티스트 정보 등 다양한 정보 조회

### 펀딩 화면
공연을 후원하고, 예매할 수 있는 화면
- 토스 페이먼츠 api을 이용해 결제 후 영수증 검증

### 마이페이지 화면(추후 구현 예정)
개인정보를 확인할 수 있는 화면
개인정보, 응원 내역, 펀딩 내역 등의 정보를 확인할 수 있다.
예매한 공연의 시간이 1시간 이내로 예정되어 있을 경우, 하단 모달을 통해 유저에게 알림을 전달하고, 티켓을 확인할 수 있다.

<br />



### 📄 주요 라이브러리
- 빠른 개발에 초점을 맞춰 라이브러리 선정
- 꼭 필요한 라이브러리만 설치해 라이브러리 의존성을 최소화한다.
- 라이브러리 간 호환성을 판단해 선정한다.
- 레퍼런스가 많고, 충분히 신뢰성을 확보한 라이브러리를 사용한다.

### ORM
Prisma - 본 프로젝트에서 사용할 GraphQL과 궁합이 잘 맞고, 해커톤 특성 상 빠르게 개발을 요하는 환경에서 생산성을 높혀줄 수 있는 라이브러리이다.

### 권한관리
PassportJS - 권한에 따른 API를 구분하게 하고, Strategy(전략)을 통해 인증을 상세히 설정 할 수 있다.
JWT - JWT를 이용한 토큰 발급으로 위변조를 예방한다.

### 쿼리 언어 
GraphQL - 웹 클라이언트가 데이터를 서버로부터 효율적으로 가져올 수 있도록 하고, 단일 엔드포인트를 통해 개발 속도의 용이성을 가질 수 있다.

### HTTP 통신
Axios - NestJS에서 기본적으로 지원하고, JSON데이터를 자동변환해주는 장점과 에러처리 시 유용하기에 사용한다.

### 테스트 도구
Jest - Javascript/Typescript용 단위 테스트 라이브러리이다. NestJS에서 기본적으로 지원하고, 테스트시 다양한 기능이 있어 사용한다.
SuperTest - Javascript/Typescript용 통합테스트 라이브러리이다. 서비스 플로우를 고려해 실사용시 오류가 없는지 API 단계에서 테스트를 할 수 있다.

### 클라우드 서비스
aws-sdk - AWS의 S3 서비스와 RDS서비스를 이용하기 위해 사용된다.개인정보, 응원 내역, 펀딩 내역 등의 정보를 확인할 수 있다.
firebase-admin: Firebase Cloud Messaging을 이용한 푸시알림 기능을 넣기 위해 사용된다.

### 문자 포메팅, 정적 분석 도구
Prettier, ESLint - 런타임 환경에서 개발 진행 시, 예기치 못한 오류를 줄이기 위해 사용되고, 코드의 가독성을 높히기 위해 사용한다.

<br/>


       
<br/>

### 📂 시스템 아키텍처

<img width="896" alt="image" src="https://user-images.githubusercontent.com/46023074/143730244-5abf6758-0d11-4dca-9fde-f354c571b79c.png">

- docker를 이용한 독립적인 프로세스 수행
- GraphQL을 이용해 최소한의 데이터만 전송
- 인스턴스 내 Nginx를 둠으로써 내부 포트 숨기고, 핸들링을 더 쉽게 할 수 있게 함
- ELB를 이용해 추후 서비스가 커졌을 때 Auto Scaling이 가능하도록 설정
- EC2와 RDS를 같은 VPC에 위치해 SSH를 통해서만 RDS에 접속 가능하도록 보안 강화

<br />

### 📂 DB 구성도

![image](https://user-images.githubusercontent.com/46023074/143730429-0c1b6e11-11c4-4777-9b43-ae361341dad6.png)

<br />

### ⛏ **개발 환경**
- OS: Ubuntu 18.04 LTS
- NPM version: 6.14.16
- NodeJS version: 14.18.1
- MySQL version: 8.0.26
