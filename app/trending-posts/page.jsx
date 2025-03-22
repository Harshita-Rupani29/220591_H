"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import { FaFire } from "react-icons/fa";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">🔥 Trending Posts</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill().map((_, idx) => (
            <Skeleton key={idx} className="h-40 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800 rounded-lg p-6 shadow-lg transition hover:scale-105">
              <div className="flex items-center space-x-4">
                <FaFire className="text-red-500 text-4xl" />
                <div>
                  <h2 className="text-2xl font-semibold">{post.content}</h2>
                  <p className="text-gray-400">Comments: {post.comments}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;
