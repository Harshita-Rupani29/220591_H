"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url('/Material.074_21_baseColor.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        transition={{ duration: 0.8 }}
      >
          
        <div className="text-center">
          
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-4xl font-bold"
          >
            Social Media Analytics
          </motion.h1>

        
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-6 flex justify-center space-x-4"
          >
            {[
              { href: "/feed", color: "bg-gradient-to-r from-gray-300 to-gray-600", text: "Feed" },
              { href: "/top-users", color: "bg-gradient-to-r from-gray-300 to-gray-600", text: "Top Users" },
              { href: "/trending-posts", color: "bg-gradient-to-r from-gray-300 to-gray-600", text: "Trending Posts" },
            ].map(({ href, color, text }) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={href}
              >
                <Link href={href} className={`${color} px-4 py-2 text-black rounded-lg shadow-md`}>
                  {text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default HomePage;
