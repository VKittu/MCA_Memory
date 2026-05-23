# 🎓 MCA Batch 2026 — SGSITS Indore | Farewell Memory World

> A cinematic, premium digital memory platform for MCA Batch 2026 of Shri G.S. Institute of Technology & Science, Indore.

**Live College:** [www.sgsits.ac.in](https://www.sgsits.ac.in)

---

## ✨ Features

- 🏠 **Cinematic Homepage** — Hero slideshow, particle background, animated stats
- 📸 **Memory Feed** — Masonry grid, likes, comments, image preview modal
- 🖼️ **Gallery** — Albums, lightbox, download, fullscreen mode
- 📤 **Upload System** — Drag & drop, Firebase Storage, progress animation
- 📚 **Digital Yearbook** — Student profile cards with farewell messages
- 🗓️ **Farewell Timeline** — Animated journey from 2022–2026
- 🤫 **Confession Wall** — Anonymous posts with neon glow cards
- 🎬 **Video Memories** — Premium video cards with category filters
- 📖 **Guestbook** — Teacher & student messages
- 🔮 **Time Capsule** — Lock messages until a future date with countdown
- 🛡️ **Admin Dashboard** — Manage memories, confessions, users
- 🔐 **Auth** — Google + Email authentication via Firebase
- 📱 **Fully Responsive** — Mobile-first, premium on all devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion + GSAP |
| Smooth Scroll | @studio-freight/lenis |
| Backend | Firebase (Auth + Firestore + Storage) |
| Deployment | Vercel |

---

## 🚀 Setup & Installation

### Step 1 — Clone or Download

```bash
# Clone the repo
git clone https://github.com/yourusername/mca-farewell-2026.git
cd mca-farewell-2026

# Install dependencies
npm install
```

---

### Step 2 — Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → Name it `mca-farewell-2026`
3. Enable **Google Analytics** (optional)

#### Enable Firebase Services:

**Authentication:**
- Go to **Authentication → Get Started**
- Enable **Google** provider
- Enable **Email/Password** provider

**Firestore Database:**
- Go to **Firestore Database → Create database**
- Choose **"Start in test mode"** (change rules later)
- Select region: `asia-south1` (Mumbai) for India

**Storage:**
- Go to **Storage → Get Started**
- Choose **"Start in test mode"**

#### Get Firebase Config:
- Go to **Project Settings (⚙️) → General → Your Apps**
- Click **"Add App" → Web App (</>)**
- Copy the config object

---

### Step 3 — Environment Variables

```bash
# Copy the example env file
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mca-farewell-2026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mca-farewell-2026
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mca-farewell-2026.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

### Step 4 — Firebase Security Rules

**Firestore Rules** — Go to Firestore → Rules, paste contents of `firestore.rules`

**Storage Rules** — Go to Storage → Rules, paste contents of `storage.rules`

---

### Step 5 — Make Yourself Admin

After signing in for the first time:

1. Go to **Firestore Database → users → your_uid**
2. Edit the document → Change `role` from `"user"` to `"admin"`
3. You now have access to `/admin` dashboard

---

### Step 6 — Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B — Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **"New Project"**
3. Import your GitHub repo
4. Add all `.env.local` variables under **"Environment Variables"**
5. Click **Deploy**

### Enable Firebase for Production Domain

1. Firebase Console → **Authentication → Settings → Authorized domains**
2. Add your Vercel domain: `mca-farewell-2026.vercel.app`

---

## 📁 Project Structure

```
mca-farewell/
├── app/
│   ├── page.tsx                    ← Home Page
│   ├── layout.tsx                  ← Root Layout
│   ├── globals.css                 ← Global Styles
│   ├── memories/page.tsx           ← Memory Feed
│   ├── gallery/page.tsx            ← Photo Gallery
│   ├── upload/page.tsx             ← Upload System
│   ├── yearbook/page.tsx           ← Digital Yearbook
│   ├── timeline/page.tsx           ← Farewell Timeline
│   ├── confessions/page.tsx        ← Confession Wall
│   ├── videos/page.tsx             ← Video Memories
│   ├── guestbook/page.tsx          ← Guestbook
│   ├── capsule/page.tsx            ← Time Capsule
│   ├── about/page.tsx              ← About Batch
│   ├── contact/page.tsx            ← Contact
│   ├── admin/page.tsx              ← Admin Dashboard
│   └── auth/
│       ├── login/page.tsx          ← Login
│       └── register/page.tsx       ← Register
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AuthProvider.tsx
│   ├── animations/
│   │   ├── SmoothScrollProvider.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── RevealOnScroll.tsx
│   │   └── LoadingScreen.tsx
│
├── lib/
│   ├── firebase.ts                 ← Firebase init
│   ├── firestore.ts                ← Database helpers
│   ├── storage.ts                  ← Storage helpers
│   ├── demoData.ts                 ← Demo content
│   └── utils.ts                    ← Utility functions
│
├── hooks/
│   └── useAuth.ts                  ← Auth hook
│
├── types/
│   └── index.ts                    ← TypeScript types
│
├── firestore.rules                 ← Security rules
├── storage.rules                   ← Storage rules
├── .env.local.example              ← Env template
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Gold | `#C9A84C` | Primary accent, CTAs |
| Gold Light | `#E8CC7A` | Hover states |
| Navy Deep | `#060912` | Background |
| Navy Mid | `#0A0E1A` | Cards, sections |
| Purple Deep | `#1A0A2E` | Accent sections |
| Purple Glow | `#8B5CF6` | Secondary accent |

---

## 🔧 Customization

### Add More Students

Edit `lib/demoData.ts` → `demoStudents` array

### Change Batch Name / College

Search and replace `MCA Batch 2026` and `SGSITS Indore` across all files

### Add More Albums

Edit `lib/utils.ts` → `ALBUMS` array

### Change Hero Slides

Edit `app/page.tsx` → `heroSlides` array

---

## 📝 Firestore Collections

| Collection | Purpose |
|------------|---------|
| `users` | Student profiles |
| `memories` | Memory feed posts |
| `gallery` | Photo/video gallery |
| `confessions` | Anonymous confessions |
| `guestbook` | Teacher & student wishes |
| `futureMessages` | Time capsule messages |

---

## 💛 Credits

Built with ❤️ by **MCA Batch 2026, SGSITS Indore**

**Shri G.S. Institute of Technology & Science**
23, Park Road, Indore, MP – 452003
[www.sgsits.ac.in](https://www.sgsits.ac.in)

---

*"From first benches to farewell tears — MCA Batch 2026 lives forever here."*
