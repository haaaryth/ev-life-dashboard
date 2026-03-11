# EVLife Dashboard — Full-Stack Next.js

## Architecture
- **Frontend**: Next.js 14 App Router (React 18)
- **Backend**: Next.js API Routes (REST endpoints)
- **Database**: Firebase Firestore
- **Auth**: Firebase Auth + JWT session cookies
- **Role-Based Access**: Admin vs Service Centre

## API Endpoints
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | All | Login with Firebase Auth |
| POST | /api/auth/logout | All | Clear session cookie |
| GET | /api/auth/me | All | Get current user |
| GET | /api/dashboard/stats | All | Dashboard statistics |
| GET | /api/bookings | All | List bookings (scoped by role) |
| POST | /api/bookings | All | Create booking |
| PATCH | /api/bookings/:id | All | Update booking status |
| DELETE | /api/bookings/:id | Admin | Delete booking |
| GET | /api/users | Admin | List all app users |
| POST | /api/users | Admin | Create user |
| PATCH | /api/users/:id | Admin | Update user |
| DELETE | /api/users/:id | Admin | Delete user |
| GET | /api/centres | All | List service centres |
| POST | /api/centres | Admin | Add centre |
| PATCH | /api/centres/:id | All | Update centre |
| DELETE | /api/centres/:id | Admin | Delete centre |
| GET | /api/stations | All | List charging stations |
| POST | /api/stations | Admin | Add station |
| PATCH | /api/stations/:id | Admin | Update station |
| DELETE | /api/stations/:id | Admin | Delete station |
| GET | /api/notifications | Admin | List notifications |
| POST | /api/notifications | Admin | Send notification |
| PATCH | /api/notifications | Admin | Mark read |
| DELETE | /api/notifications | Admin | Delete notification |

## Quick Start

### 1. Install
```bash
cd evlife-dashboard
npm install --legacy-peer-deps
```

### 2. Get Firebase Admin SDK Key
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key" → Download JSON
3. Open the JSON file and copy into .env.local:
   - `FIREBASE_CLIENT_EMAIL` = `client_email` field
   - `FIREBASE_PRIVATE_KEY` = `private_key` field (keep the quotes)

### 3. Run
```bash
npm run dev
```
Open http://localhost:3000

### 4. Login
- **Admin**: admin@evlife.my / Admin@123
- **Service Centre**: any email registered in Firebase Auth that matches a centre's adminEmail field

## Role-Based Access
- **Admin**: Full access to all modules
- **Service Centre**: Only sees their own bookings, can manage their profile
