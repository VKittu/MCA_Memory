// lib/firestore.ts
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  onSnapshot,
  Timestamp,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  increment,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Memories ────────────────────────────────────────────────────────────────

export const addMemory = async (data: {
  userId: string;
  userName: string;
  userPhoto: string;
  caption: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  tags?: string[];
}) => {
  return await addDoc(collection(db, "memories"), {
    ...data,
    likes: [],
    comments: [],
    pinned: false,
    approved: true,
    createdAt: serverTimestamp(),
  });
};

export const getMemories = async (lastDoc?: QueryDocumentSnapshot<DocumentData>) => {
  let q = query(
    collection(db, "memories"),
    where("approved", "==", true),
    orderBy("pinned", "desc"),
    orderBy("createdAt", "desc"),
    limit(12)
  );
  if (lastDoc) q = query(q, startAfter(lastDoc));
  return await getDocs(q);
};

export const toggleLike = async (memoryId: string, userId: string, liked: boolean) => {
  const ref = doc(db, "memories", memoryId);
  await updateDoc(ref, {
    likes: liked ? arrayRemove(userId) : arrayUnion(userId),
  });
};

export const addComment = async (
  memoryId: string,
  comment: { id: string; userId: string; userName: string; userPhoto: string; text: string }
) => {
  const ref = doc(db, "memories", memoryId);
  await updateDoc(ref, {
    comments: arrayUnion({ ...comment, createdAt: new Date().toISOString() }),
  });
};

export const deleteMemory = async (id: string) => {
  await deleteDoc(doc(db, "memories", id));
};

export const pinMemory = async (id: string, pinned: boolean) => {
  await updateDoc(doc(db, "memories", id), { pinned });
};

// ─── Gallery ─────────────────────────────────────────────────────────────────

export const addGalleryItem = async (data: {
  userId: string;
  url: string;
  thumbnail?: string;
  caption: string;
  album: string;
  mediaType: "image" | "video";
}) => {
  return await addDoc(collection(db, "gallery"), {
    ...data,
    downloads: 0,
    createdAt: serverTimestamp(),
  });
};

export const getGalleryItems = async (album?: string) => {
  let q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
  if (album) q = query(q, where("album", "==", album));
  return await getDocs(q);
};

export const incrementDownloads = async (id: string) => {
  await updateDoc(doc(db, "gallery", id), { downloads: increment(1) });
};

// ─── Confessions ─────────────────────────────────────────────────────────────

export const addConfession = async (data: { anonymousName: string; content: string }) => {
  return await addDoc(collection(db, "confessions"), {
    ...data,
    likes: 0,
    approved: true,
    createdAt: serverTimestamp(),
  });
};

export const getConfessions = async () => {
  return await getDocs(
    query(collection(db, "confessions"), where("approved", "==", true), orderBy("createdAt", "desc"))
  );
};

export const likeConfession = async (id: string) => {
  await updateDoc(doc(db, "confessions", id), { likes: increment(1) });
};

// ─── Guestbook ───────────────────────────────────────────────────────────────

export const addGuestbookEntry = async (data: {
  authorName: string;
  role: string;
  message: string;
  photoUrl?: string;
}) => {
  return await addDoc(collection(db, "guestbook"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getGuestbookEntries = async () => {
  return await getDocs(query(collection(db, "guestbook"), orderBy("createdAt", "desc")));
};

// ─── Future Messages ─────────────────────────────────────────────────────────

export const addFutureMessage = async (data: {
  userId: string;
  userName: string;
  message: string;
  unlockDate: Date;
}) => {
  return await addDoc(collection(db, "futureMessages"), {
    ...data,
    locked: true,
    unlockDate: Timestamp.fromDate(data.unlockDate),
    createdAt: serverTimestamp(),
  });
};

export const getFutureMessages = async (userId: string) => {
  return await getDocs(
    query(collection(db, "futureMessages"), where("userId", "==", userId), orderBy("createdAt", "desc"))
  );
};

// ─── Users / Yearbook ────────────────────────────────────────────────────────

export const upsertUser = async (
  uid: string,
  data: Partial<{
    email: string;
    displayName: string;
    photoURL: string;
    role: string;
    bio: string;
    nickname: string;
    futureDream: string;
    favoriteMemory: string;
    farewellMessage: string;
    instagram: string;
    linkedin: string;
  }>
) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, data);
  } else {
    await updateDoc(ref, { ...data, role: "user", createdAt: serverTimestamp() }).catch(() =>
      addDoc(collection(db, "users"), { uid, ...data, role: "user", createdAt: serverTimestamp() })
    );
  }
};

export const getUsers = async () => {
  return await getDocs(collection(db, "users"));
};

export const getUserById = async (uid: string) => {
  return await getDoc(doc(db, "users", uid));
};

// ─── Admin ───────────────────────────────────────────────────────────────────

export const approveMemory = async (id: string) => {
  await updateDoc(doc(db, "memories", id), { approved: true });
};

export const getPendingMemories = async () => {
  return await getDocs(
    query(collection(db, "memories"), where("approved", "==", false), orderBy("createdAt", "desc"))
  );
};

export const deleteConfession = async (id: string) => {
  await deleteDoc(doc(db, "confessions", id));
};

export const deleteGuestbookEntry = async (id: string) => {
  await deleteDoc(doc(db, "guestbook", id));
};
