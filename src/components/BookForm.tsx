"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
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

interface BookFormProps {
  book?: Book | null;
  isEdit?: boolean;
  onUpdateSuccess?: () => void;
}

export default function BookForm({
  book,
  isEdit = false,
  onUpdateSuccess,
}: BookFormProps) {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    publishedYear: book?.publishedYear || new Date().getFullYear(),
    isbn: book?.isbn || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "publishedYear" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEdit && book?._id) {
        await axios.put(
          `http://localhost:4000/api/v1/books/${book._id}`,
          formData
        );
        onUpdateSuccess?.();
        router.push("/");   
      } else {
        await axios.post("http://localhost:4000/api/v1/books", formData);
        router.push("/");   
      }
    } catch (err) {
      console.error("Error saving book:", err);
      setError("Failed to save book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        {isEdit ? "Edit Book" : "Add New Book"}
      </h1>
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN number"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Published Year
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 ${
                loading ? "bg-blue-300" : "bg-blue-600"
              } text-white rounded-md`}
            >
              {loading ? "Saving..." : isEdit ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
