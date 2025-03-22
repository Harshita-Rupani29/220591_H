"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import { FaRegComment } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/variants";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("/api/feed");
        const data = await res.json();

        // Add new posts to the top
        setFeed((prevFeed) => {
          const newPosts = data.filter((post) => 
            !prevFeed.some((p) => p.id === post.id)
          );
          return [...newPosts, ...prevFeed];
        });

      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    
    fetchFeed();

    // Fetch every 5 seconds for real-time updates
    const interval = setInterval(fetchFeed, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="p-8 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white"
    >
      <motion.h1 variants={fadeIn("up", 0.3)} className="text-4xl font-bold mb-6 text-center">
         Real-Time Feed (Newest First)
      </motion.h1>

      {loading ? (
        <motion.div className="grid gap-6">
          {Array(4).fill().map((_, idx) => (
            <Skeleton key={idx} className="h-32 w-full" />
          ))}
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} className="grid gap-6">
          {feed.map((post, index) => (
            <motion.div
              key={post.id}
              variants={fadeIn("up", index * 0.1)}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{post.user}</h2>
                <FaRegComment className="text-blue-500 text-3xl" />
              </div>
              <p className="text-gray-300 mt-2">{post.content}</p>
              <p className="text-gray-400 mt-2 text-sm"> {new Date(post.timestamp).toLocaleString()}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Feed;
