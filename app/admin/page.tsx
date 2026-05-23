// app/admin/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Image, MessageSquare, Users, Trash2,
  Pin, CheckCircle, AlertCircle, TrendingUp, Eye, Loader2,
  Shield
} from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { useAuthContext } from "@/components/layout/AuthProvider";
import {
  getMemories, deleteMemory, pinMemory, approveMemory,
  getPendingMemories, getConfessions, deleteConfession,
  getUsers, getGuestbookEntries, deleteGuestbookEntry
} from "@/lib/firestore";
import { demoMemories, demoConfessions, demoStudents } from "@/lib/demoData";
import { timeAgo, cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

const stats = [
  { label: "Total Memories", value: "24", icon: Image, color: "#C9A84C", change: "+3 today" },
  { label: "Active Students", value: "61", icon: Users, color: "#8B5CF6", change: "MCA 2026" },
  { label: "Confessions", value: "38", icon: MessageSquare, color: "#EF4444", change: "+5 this week" },
  { label: "Gallery Photos", value: "120+", icon: Image, color: "#10B981", change: "12 albums" },
];

const tabs = ["Overview", "Memories", "Confessions", "Users", "Guestbook"];

export default function AdminPage() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("Overview");
  const [memories, setMemories] = useState(demoMemories as any[]);
  const [confessions, setConfessions] = useState(demoConfessions as any[]);
  const [loading, setLoading] = useState<string | null>(null);

  // Access guard
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield size={48} className="text-gold mx-auto mb-4" />
          <p className="text-white/60 mb-4">Please sign in to access admin panel</p>
          <Link href="/auth/login" className="btn-gold">Sign In</Link>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl text-white mb-2">Access Denied</h2>
          <p className="text-white/50 mb-6">You need admin privileges to access this panel.</p>
          <Link href="/" className="btn-gold">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleDeleteMemory = async (id: string) => {
    setLoading(id);
    try {
      await deleteMemory(id);
      setMemories((prev) => prev.filter((m) => m.id !== id));
      toast.success("Memory deleted");
    } catch { toast.error("Failed to delete"); }
    finally { setLoading(null); }
  };

  const handlePinMemory = async (id: string, pinned: boolean) => {
    try {
      await pinMemory(id, !pinned);
      setMemories((prev) => prev.map((m) => m.id === id ? { ...m, pinned: !pinned } : m));
      toast.success(pinned ? "Unpinned" : "Pinned! ✨");
    } catch { toast.error("Failed"); }
  };

  const handleDeleteConfession = async (id: string) => {
    setLoading(id);
    try {
      await deleteConfession(id);
      setConfessions((prev) => prev.filter((c) => c.id !== id));
      toast.success("Confession removed");
    } catch { toast.error("Failed"); }
    finally { setLoading(null); }
  };

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                <LayoutDashboard size={20} className="text-gold" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-white/40 text-sm">MCA Batch 2026 · SGSITS Indore</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="glass-card p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10"
                  style={{ background: stat.color, transform: "translate(30%, -30%)" }} />
                <div className="flex items-center justify-between mb-3">
                  <stat.icon size={20} style={{ color: stat.color }} />
                  <span className="text-white/30 text-xs">{stat.change}</span>
                </div>
                <div className="font-display text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 glass-card p-1 rounded-xl w-fit flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm transition-all duration-300",
                activeTab === tab
                  ? "bg-gold text-navy-deep font-medium"
                  : "text-white/50 hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "Overview" && (
          <RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-gold" /> Quick Actions
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Review Pending Memories", href: "#", icon: Eye, count: 2 },
                    { label: "Manage Confessions", href: "#", icon: MessageSquare, count: 5 },
                    { label: "View All Users", href: "#", icon: Users, count: 61 },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={() => setActiveTab(action.label.includes("Confes") ? "Confessions" : action.label.includes("User") ? "Users" : "Memories")}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <action.icon size={16} className="text-gold" />
                        <span className="text-white/80 text-sm">{action.label}</span>
                      </div>
                      <span className="text-gold text-xs border border-gold/30 px-2 py-0.5 rounded-full">{action.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display text-lg text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { text: "Aarav Sharma uploaded a new memory", time: "2 min ago", type: "upload" },
                    { text: "New confession posted anonymously", time: "15 min ago", type: "confession" },
                    { text: "Priya Verma added a guestbook entry", time: "1 hr ago", type: "guestbook" },
                    { text: "Rohit Patel uploaded to Gallery", time: "3 hr ago", type: "gallery" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-white/70 text-sm">{activity.text}</p>
                        <p className="text-white/30 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Memories tab */}
        {activeTab === "Memories" && (
          <div className="space-y-3">
            {memories.map((memory) => (
              <RevealOnScroll key={memory.id}>
                <div className="glass-card p-4 flex items-center gap-4">
                  {memory.mediaUrl && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={memory.mediaUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{memory.userName}</p>
                    <p className="text-white/50 text-xs line-clamp-1">{memory.caption}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-white/30 text-xs">{timeAgo(memory.createdAt)}</span>
                      <span className="text-white/30 text-xs">❤️ {memory.likes.length}</span>
                      {memory.pinned && <span className="text-gold text-xs">📌 Pinned</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handlePinMemory(memory.id, memory.pinned)}
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                        memory.pinned ? "bg-gold/20 text-gold" : "bg-white/5 text-white/40 hover:text-gold"
                      )}
                    >
                      <Pin size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteMemory(memory.id)}
                      disabled={loading === memory.id}
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                    >
                      {loading === memory.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* Confessions tab */}
        {activeTab === "Confessions" && (
          <div className="space-y-3">
            {confessions.map((conf) => (
              <RevealOnScroll key={conf.id}>
                <div className="glass-card p-4 flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-glow text-sm font-medium">{conf.anonymousName}</span>
                      <span className="text-white/30 text-xs">{timeAgo(conf.createdAt)}</span>
                      <span className="text-white/30 text-xs ml-auto">🔥 {conf.likes}</span>
                    </div>
                    <p className="text-white/70 text-sm line-clamp-2">{conf.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteConfession(conf.id)}
                    disabled={loading === conf.id}
                    className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    {loading === conf.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* Users tab */}
        {activeTab === "Users" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoStudents.map((student) => (
              <RevealOnScroll key={student.id}>
                <div className="glass-card p-4 flex items-center gap-4">
                  <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-gold/20" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{student.name}</p>
                    <p className="text-white/40 text-xs truncate">{student.rollNumber}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-glow/10 border border-purple-glow/20 text-purple-glow">student</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
