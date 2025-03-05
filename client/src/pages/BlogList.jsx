import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
      <h1 className='text-3xl font-bold text-center'>All Blog Posts</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <div className='text-center text-gray-500'>No posts found.</div>
      )}
    </div>
  );
}
 