// types/index.ts

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "user" | "admin";
  batch: string;
  bio?: string;
  nickname?: string;
  futureDream?: string;
  favoriteMemory?: string;
  farewellMessage?: string;
  instagram?: string;
  linkedin?: string;
  createdAt: Date;
}

export interface Memory {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  caption: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  likes: string[];
  comments: Comment[];
  tags: string[];
  pinned: boolean;
  approved: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  createdAt: Date;
}

export interface GalleryItem {
  id: string;
  userId: string;
  url: string;
  thumbnail?: string;
  caption: string;
  album: "farewell" | "classroom" | "trip" | "fest" | "canteen" | "general";
  mediaType: "image" | "video";
  downloads: number;
  createdAt: Date;
}

export interface Confession {
  id: string;
  anonymousName: string;
  content: string;
  likes: number;
  approved: boolean;
  createdAt: Date;
}

export interface GuestbookEntry {
  id: string;
  authorName: string;
  role: "student" | "teacher" | "staff";
  message: string;
  photoUrl?: string;
  createdAt: Date;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  emoji: string;
}

export interface FutureMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  unlockDate: Date;
  locked: boolean;
  createdAt: Date;
}

export interface Student {
  id: string;
  name: string;
  nickname: string;
  photo: string;
  bio: string;
  futureDream: string;
  favoriteMemory: string;
  farewellMessage: string;
  instagram?: string;
  linkedin?: string;
  rollNumber: string;
}
