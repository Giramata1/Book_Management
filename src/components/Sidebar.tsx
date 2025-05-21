"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoBookOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-1/5 h-screen bg-blue-600 text-white flex flex-col">
      <div className="p-4 flex items-center space-x-2">
        <div className="bg-white p-2 rounded-lg">
          <IoDocumentTextOutline className="text-2xl text-blue-600" />
        </div>
        <h1 className="text-xl font-bold">
          <Link href="/" className="transition-colors">
            Book Manager
          </Link>
        </h1>
      </div>

      
      <div className="mt-4">
        <h2 className="px-4 text-sm font-semibold">Navigation</h2>
        <ul className="mt-2">
          <li>
            <Link
              href="/"
              className={`flex items-center px-4 py-3 transition ${
                pathname === "/" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            >
              <IoBookOutline className="mr-2" />
              All Books
            </Link>
          </li>
          <li>
            <Link
              href="/add-book"
              className={`flex items-center px-4 py-3 transition ${
                pathname === "/add-book" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            >
              <IoAddOutline className="mr-2" />
              Add New Book
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-auto p-4 text-sm text-blue-100">
        © 2025 Book Management System
      </div>
    </div>
  );
}
