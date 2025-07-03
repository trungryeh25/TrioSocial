import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/post/PostCard";
import Navbar from "@/components/layout/Navbar";
import { Post } from "@/types/post";

const demoPosts: Post[] = [
  {
    id: "1",
    title: "How to learn TypeScript effectively",
    content:
      "TypeScript is a powerful superset of JavaScript that adds static typing...",
    createdAt: new Date().toISOString(),
    author: {
      id: "u1",
      username: "trgn312",
      email: "trgn312@gmail.com",
      bio: "TS Lover",
      role: "USER",
      createdAt: new Date().toISOString(),
    },
    comments: [],
  },
  {
    id: "2",
    title: "Building a Next.js app from scratch",
    content:
      "In this post, I'll show you how to set up a Next.js project step by step...",
    createdAt: new Date().toISOString(),
    author: {
      id: "u2",
      username: "truongpor",
      email: "tpor.admin@gmail.com",
      bio: "Fullstack  dev",
      role: "ADMIN",
      createdAt: new Date().toISOString(),
    },
    comments: [],
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {demoPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>

      <Footer />
    </>
  );
}
