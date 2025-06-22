import PostCard from '@/components/PostCard';
import { Post } from '@/types/post';
import { api } from '@/lib/api';

async function getPosts(): Promise<Post[]> {
  const res = await api.get('/posts');
  return res.data;
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-2xl mx-auto mt-6 px-4 space-y-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
