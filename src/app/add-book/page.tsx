'use client';

import Sidebar from '@/components/Sidebar';
import BookForm from '@/components/BookForm';
import Link from 'next/link';

export default function AddBook() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-gray-900 hover:underline border-1 bg-white p-2 rounded-lg shadow-md">
            ← Back to Books
          </Link>
        </div>
        <BookForm isEdit={false} />
      </div>
    </div>
  );
}
