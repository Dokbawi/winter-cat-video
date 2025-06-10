# Winter Cat Video API

Discord 봇과 영상 처리 백엔드 서비스 간의 중간 API 서버입니다. NestJS 기반으로 구축되어 RabbitMQ를 통한 비동기 영상 처리와 MongoDB를 통한 통계 데이터 관리를 제공합니다.

## 🏗️ 아키텍처

```
Discord Bot → Winter Cat Video API → Codex Media (영상 처리)
                     ↓
                 MongoDB
```

## 🚀 주요 기능

- **영상 처리 요청**: Discord 봇으로부터 영상 처리 요청을 받아 백엔드 서비스로 전달
- **RabbitMQ 메시징**: 비동기 영상 처리를 위한 메시지 큐 관리
- **Discord OAuth 인증**: Discord 서버 멤버십 기반 접근 제어
- **통계 데이터 API**: 서버별 영상 처리 통계 및 분석 데이터 제공
- **MongoDB**: 영상 처리 이력 및 데이터 관리

## 🛠️ 기술 스택

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Message Queue**: RabbitMQ
- **Authentication**: Discord OAuth2
- **Deployment**: Docker + Google Cloud Build
- **Language**: TypeScript

## ⚙️ 환경 설정

### 환경 변수

```bash
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/winter-cat-video

RABBITMQ_URL=amqp://localhost:5672
RABBITMQ_QUEUE=video_processing

```

## 🔐 인증 및 보안

### Discord OAuth 가드

`DiscordServerGuard`를 통해 다음을 검증합니다:

- Discord OAuth2 액세스 토큰 유효성
- 사용자의 특정 Discord 서버 멤버십
- 요청된 서버 ID에 대한 접근 권한

## 🔄 데이터 플로우

1. **요청 수신**: Discord 봇이 `/video` 엔드포인트로 영상 처리 요청
2. **메시지 발행**: RabbitMQ를 통해 `video.processing` 이벤트 발행
3. **백엔드 처리**: Codex Media 서비스에서 영상 처리 수행
4. **결과 저장**: 처리 결과를 MongoDB에 저장
5. **통계 제공**: `/video/:serverId` 엔드포인트를 통해 통계 데이터 제공

## 🔗 관련 프로젝트

- [Discord Bot](https://github.com/Dokbawi/discord-bot) - Discord 봇 클라이언트
- [Codex Media](https://github.com/Dokbawi/codex-media) - 영상 처리 백엔드 서비스
- [Discord helm](https://github.com/Dokbawi/discord-video-helm) - 서비스 k8s 관리 helm chart
