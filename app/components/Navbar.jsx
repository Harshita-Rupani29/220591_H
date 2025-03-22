"use client";
import { useRouter } from "next/navigation"; 
import { BiHomeAlt, BiUser } from "react-icons/bi";
import { BsBriefcase } from "react-icons/bs";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
      <div className="container mx-auto">
        <div className="w-full bg-gradient-to-r from-gray-300 to-gray-600 h-[70px] backdrop-blur-2xl rounded-full max-w-[350px] mx-auto px-5 flex justify-between text-2xl text-white/50">

          <Link href="/feed" className={`cursor-pointer w-[60px] h-[60px] flex items-center justify-center transition-all duration-300 ${
              currentPath === "/" ? "text-white" : "hover:text-white"
            }`}>
            <BiHomeAlt />
          </Link>

          <Link href="/top-users" className={`cursor-pointer w-[60px] h-[60px] flex items-center justify-center transition-all duration-300 ${
              currentPath === "/" ? "text-white" : "hover:text-white"
            }`}>
            <BiUser />
          </Link>

          <Link href="/trending-posts" className={`cursor-pointer w-[60px] h-[60px] flex items-center justify-center transition-all duration-300 ${
              currentPath === "/" ? "text-white" : "hover:text-white"
            }`}>
            <BsBriefcase />
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
