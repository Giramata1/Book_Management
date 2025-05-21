"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear: number;
  isbn: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          setLoading(true);
          const response = await axios.get<Book>(
            `http://localhost:4000/api/v1/books/${id}`
          );
          setBook(response.data);
        } catch (error) {
          console.error("Error fetching book:", error);
          setError("Failed to load book details");
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-gray-900 hover:text-blue-800 border-1 bg-white p-2 rounded-lg shadow-md">
            ← Back to Books
          </Link>
          
        </div>

        <div className="max-w-lg bg-white p-6 rounded-lg shadow-md mt-20">
          <Link
            href={`/edit/${book._id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-80"
          >
            Edit Book
          </Link>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {book.title}
          </h1>

          <div className="grid  gap-4 mt-6">
            <div>
              <p className="text-gray-600 font-semibold">Author</p>
              <p className="text-gray-800">{book.author}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">ISBN</p>
              <p className="text-gray-800">{book.isbn}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Published Year</p>
              <p className="text-gray-800">{book.publishedYear}</p>
            </div>

            <div>
              <p className="text-gray-800  bg-white p-6  rounded-lg shadow-md">
                Book ID:{book._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
