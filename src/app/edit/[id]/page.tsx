
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import BookForm from '@/components/BookForm'
import Link from 'next/link'
import axios from 'axios'

interface Book {
  _id: string
  title: string
  author: string
  publishedYear: number
  isbn: string
  createdAt?: string
  updatedAt?: string
}

export default function EditBookPage() {
  const { id } = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  
  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await axios.get<Book>(`http://localhost:4000/api/v1/books/${id}`)
          setBook(response.data)
        } catch (error) {
          console.error('Error fetching book:', error)
        }
      }
      fetchBook()
    }
  }, [id])
  
  
  const handleUpdateSuccess = () => {
    
    if (id) {
      router.push(`/books/${id}`)
    }
  }

  if (!book) return <div>Loading...</div>
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex items-center mb-6">
           <Link 
            href={`/books/${book._id}`}
            className="px-4 py-2 text-gray-900  border-1 bg-white p-2 rounded-lg shadow-md"
          >
            ← Back to Book details
          </Link>
        </div>
        <BookForm 
          book={book} 
          isEdit={true} 
          onUpdateSuccess={handleUpdateSuccess}
        />
      </div>
    </div>
  )
}