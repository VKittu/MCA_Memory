// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isAfter } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "MMMM d, yyyy");
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function isLocked(unlockDate: Date): boolean {
  return !isAfter(new Date(), unlockDate);
}

export function getTimeUntilUnlock(unlockDate: Date): string {
  if (!isLocked(unlockDate)) return "Unlocked";
  const diff = unlockDate.getTime() - Date.now();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const remDays = days % 365;
  if (years > 0) return `${years}y ${remDays}d remaining`;
  return `${days} days remaining`;
}

export function fileSizeLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ALBUMS = [
  { value: "farewell", label: "🎓 Farewell Night", color: "#C9A84C" },
  { value: "classroom", label: "📚 Classroom Memories", color: "#8B5CF6" },
  { value: "trip", label: "🏔️ Batch Trip", color: "#10B981" },
  { value: "fest", label: "🎉 College Fest", color: "#F59E0B" },
  { value: "canteen", label: "🍵 Canteen Chronicles", color: "#EF4444" },
  { value: "general", label: "📸 General Memories", color: "#3B82F6" },
];

export function getAlbumInfo(value: string) {
  return ALBUMS.find((a) => a.value === value) || ALBUMS[ALBUMS.length - 1];
}
