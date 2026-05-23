// app/upload/page.tsx
"use client";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, Video, X, CheckCircle, Loader2, Tag } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { useAuthContext } from "@/components/layout/AuthProvider";
import { uploadFile, validateFile } from "@/lib/storage";
import { addMemory, addGalleryItem } from "@/lib/firestore";
import { cn, ALBUMS } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

type UploadType = "memory" | "gallery";

export default function UploadPage() {
  const { user } = useAuthContext();
  const [uploadType, setUploadType] = useState<UploadType>("memory");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [album, setAlbum] = useState("general");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0];
    if (!f) return;
    try {
      validateFile(f, { maxSizeMB: 50 });
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
      setDone(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!user) { toast.error("Please sign in to upload"); return; }
    if (!file) { toast.error("Please select a file"); return; }
    if (!caption.trim()) { toast.error("Please add a caption"); return; }

    setUploading(true);
    setProgress(0);

    try {
      const folder = uploadType === "memory" ? "memories" : "gallery";
      const { url } = await uploadFile(file, folder, setProgress);
      const mediaType = file.type.startsWith("video/") ? "video" : "image";

      if (uploadType === "memory") {
        await addMemory({
          userId: user.uid,
          userName: user.displayName || "Anonymous",
          userPhoto: user.photoURL || "",
          caption,
          mediaUrl: url,
          mediaType,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        });
      } else {
        await addGalleryItem({
          userId: user.uid,
          url,
          caption,
          album,
          mediaType,
        });
      }

      setDone(true);
      setFile(null);
      setPreview(null);
      setCaption("");
      setTags("");
      toast.success("Memory uploaded successfully! 🎉");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">Please sign in to upload memories</p>
          <Link href="/auth/login" className="btn-gold">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <p className="text-gold text-xs tracking-widest uppercase mb-4">Share Your Story</p>
            <h1 className="section-title text-white mb-4">
              Upload a <span className="gold-text">Memory</span>
            </h1>
            <p className="text-white/50">
              Add your precious moment to our batch memory world. Each upload is a piece of us, forever.
            </p>
          </RevealOnScroll>

          {/* Upload type selector */}
          <RevealOnScroll delay={0.1}>
            <div className="flex rounded-xl overflow-hidden border border-white/10 mb-8">
              {(["memory", "gallery"] as UploadType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setUploadType(t)}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium capitalize transition-all duration-300",
                    uploadType === t ? "bg-gold text-navy-deep" : "text-white/50 hover:text-white"
                  )}
                >
                  {t === "memory" ? "📝 Memory Feed" : "🖼️ Gallery Album"}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Success state */}
          <AnimatePresence>
            {done && (
              <motion.div
                className="glass-card p-8 text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <CheckCircle size={48} className="text-gold mx-auto mb-4" />
                </motion.div>
                <h3 className="font-display text-2xl text-white mb-2">Memory Uploaded! 🎉</h3>
                <p className="text-white/50 mb-6">Your moment is now part of the MCA Batch 2026 memory world forever.</p>
                <div className="flex gap-3 justify-center">
                  <Link href="/memories" className="btn-gold text-sm">View Feed</Link>
                  <button onClick={() => setDone(false)} className="btn-ghost text-sm">Upload Another</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!done && (
            <RevealOnScroll delay={0.2}>
              <div className="glass-card p-6 space-y-6">
                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
                    isDragActive
                      ? "border-gold bg-gold/10"
                      : preview
                      ? "border-gold/40"
                      : "border-white/20 hover:border-gold/40 hover:bg-white/3"
                  )}
                >
                  <input {...getInputProps()} />

                  {preview ? (
                    <div className="relative">
                      {file?.type.startsWith("video/") ? (
                        <video src={preview} className="max-h-48 mx-auto rounded-xl" controls />
                      ) : (
                        <div className="relative max-h-48 overflow-hidden rounded-xl">
                          <img src={preview} alt="Preview" className="mx-auto object-cover rounded-xl w-full h-full" />
                        </div>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center gap-4 mb-4">
                        <ImageIcon size={32} className="text-white/20" />
                        <Video size={32} className="text-white/20" />
                      </div>
                      <p className="text-white/60 mb-2">
                        {isDragActive ? "Drop it here!" : "Drag & drop your photo or video"}
                      </p>
                      <p className="text-white/30 text-sm">or click to browse • Max 50MB</p>
                    </>
                  )}
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Caption *</label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Describe this memory — what happened, how you felt, why it matters..."
                    rows={4}
                    className="input-glass resize-none"
                  />
                </div>

                {/* Tags (memory only) */}
                {uploadType === "memory" && (
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      <Tag size={14} className="inline mr-1" /> Tags (comma separated)
                    </label>
                    <input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="farewell, batch, sgsits, memories..."
                      className="input-glass"
                    />
                  </div>
                )}

                {/* Album (gallery only) */}
                {uploadType === "gallery" && (
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Album</label>
                    <select
                      value={album}
                      onChange={(e) => setAlbum(e.target.value)}
                      className="input-glass"
                    >
                      {ALBUMS.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Upload progress */}
                {uploading && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/60 text-sm">Uploading to cloud...</span>
                      <span className="text-gold text-sm font-medium">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-gold rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={uploading || !file || !caption.trim()}
                  className={cn(
                    "w-full btn-gold flex items-center justify-center gap-3 py-4",
                    (uploading || !file || !caption.trim()) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} /> Upload Memory
                    </>
                  )}
                </button>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </div>
  );
}
