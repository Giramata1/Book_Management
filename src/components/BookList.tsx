"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: string;
}

interface BookListProps {
  books: Book[];
  fetchBooks: () => void;
}

export default function BookList({ books, fetchBooks }: BookListProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/books/${id}`);
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/books/${id}`);
  };

  if (!books || books.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow w-1/2">
        <h2 className="text-xl font-semibold">No books found</h2>
        <p className="text-gray-600 mt-2">
          Get started by adding your first book to the collection.
        </p>
        <Link
          href="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block mt-4"
        >
          + Add New Book
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 w-1/2">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-600">
            <th className="p-3 font-medium">Title</th>
            <th className="p-3 font-medium">Author</th>
            <th className="p-3 font-medium">ISBN</th>
            <th className="p-3 font-medium">Published</th>
            <th className="p-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-t border-gray-200">
              <td className="p-3">{book.title}</td>
              <td className="p-3">{book.author}</td>
              <td className="p-3">{book.isbn}</td>
              <td className="p-3">{book.publishedYear}</td>
              <td className="p-3 flex space-x-3">
                <button
                  onClick={() => handleViewDetails(book._id)}
                  className="text-blue-600 hover:text-blue-800"
                  title="View Book Details"
                >
                  📖
                </button>
                <button
                  onClick={() => handleEdit(book._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
