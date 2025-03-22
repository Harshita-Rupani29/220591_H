"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import { FaUser } from "react-icons/fa";

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Top Users</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(5).fill().map((_, idx) => (
            <Skeleton key={idx} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div key={user.id} className="bg-gray-800 rounded-lg p-6 shadow-lg transition hover:scale-105">
              <div className="flex items-center space-x-4">
                <FaUser className="text-blue-500 text-4xl" />
                <div>
                  <h2 className="text-2xl font-semibold">{user.name}</h2>
                  <p className="text-gray-400">Posts: {user.postCount}</p>
                </div>
              </div>
              <p className="text-gray-300 mt-4">Rank: #{index + 1}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsers;
