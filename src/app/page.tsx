"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import BookList from "@/components/BookList";
import Link from "next/link";
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(
        "http://localhost:4000/api/v1/books"
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 w-1/2">
          <h1 className="text-3xl font-bold">Book Collection</h1>
          <Link
            href="/add-book"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add New Book
          </Link>
        </div>
        <BookList books={books} fetchBooks={fetchBooks} />
      </div>
    </div>
  );
}
