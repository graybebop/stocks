# Admin Monorepo

Laravel 11 API + Nuxt 3 관리자 대시보드 프로젝트

## 📁 프로젝트 구조

```
admin-monorepo/
├── backend/                          # Laravel 11 API 서버
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/
│   │   │           ├── AuthController.php        # 로그인/로그아웃/내 정보
│   │   │           ├── DashboardController.php   # 대시보드 통계
│   │   │           └── UserController.php        # 사용자 CRUD
│   │   └── Models/
│   │       └── User.php
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php
│   ├── .env.example
│   └── composer.json
│
└── frontend/                         # Nuxt 3 관리자 대시보드
    ├── assets/css/
    ├── components/
    ├── composables/
    │   └── useApi.ts                 # API 호출 유틸
    ├── layouts/
    │   └── default.vue              # 사이드바 + 헤더 레이아웃
    ├── middleware/
    │   └── auth.global.ts           # 전역 인증 미들웨어
    ├── pages/
    │   ├── index.vue                # → /dashboard 리다이렉트
    │   ├── auth/login.vue           # 로그인 페이지
    │   ├── dashboard/index.vue      # 대시보드
    │   └── users/index.vue          # 사용자 목록
    ├── stores/
    │   └── auth.ts                  # Pinia 인증 스토어
    ├── app.vue
    ├── nuxt.config.ts
    ├── tailwind.config.ts
    └── package.json
```

## 🚀 실행 방법

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
# → http://localhost:8000
```

### Frontend (Nuxt 3)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# → http://localhost:3000
```

## 🔑 API 엔드포인트

| 메서드 | URL                     | 설명             | 인증 |
|--------|-------------------------|------------------|------|
| POST   | /api/auth/login         | 로그인           | ❌   |
| POST   | /api/auth/logout        | 로그아웃         | ✅   |
| GET    | /api/me                 | 내 정보          | ✅   |
| GET    | /api/dashboard/stats    | 대시보드 통계    | ✅   |
| GET    | /api/users              | 사용자 목록      | ✅   |
| POST   | /api/users              | 사용자 생성      | ✅   |
| GET    | /api/users/{id}         | 사용자 상세      | ✅   |
| PUT    | /api/users/{id}         | 사용자 수정      | ✅   |
| DELETE | /api/users/{id}         | 사용자 삭제      | ✅   |

## 🛠 기술 스택

| 구분       | 기술                                    |
|------------|----------------------------------------|
| Backend    | PHP 8.2, Laravel 11, Sanctum (토큰 인증) |
| Frontend   | Nuxt 3, Vue 3, Pinia, Tailwind CSS    |
| 인증 방식  | Laravel Sanctum (Bearer Token)        |
