import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { BookCard } from '@/components/BookCard';
import { useToast } from "@/hooks/use-toast";

// Mock data for books
const mockBooks = [
  {
    "id": 1,
    "title": "React for Beginners",
    "author": "John Doe",
    "price": 19.99,
    "stock": 5,
    "cover": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400"
  },
  {
    "id": 2,
    "title": "Advanced JavaScript",
    "author": "Jane Smith",
    "price": 29.99,
    "stock": 3,
    "cover": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400"
  },
  {
    "id": 3,
    "title": "Understanding TypeScript",
    "author": "Michael Brown",
    "price": 24.99,
    "stock": 7,
    "cover": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400"
  },
  {
    "id": 4,
    "title": "Mastering Node.js",
    "author": "Sarah Williams",
    "price": 34.99,
    "stock": 2,
    "cover": "https://images.unsplash.com/photo-1537884944318-390069bb8665?w=400"
  },
  {
    "id": 5,
    "title": "CSS for Dummies",
    "author": "Emily Davis",
    "price": 15.99,
    "stock": 8,
    "cover": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400"
  },
  {
    "id": 6,
    "title": "Web Performance Optimization",
    "author": "David Johnson",
    "price": 39.99,
    "stock": 4,
    "cover": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400"
  },
  {
    "id": 7,
    "title": "React Native in Action",
    "author": "Richard Lee",
    "price": 49.99,
    "stock": 6,
    "cover": "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400"
  },
  {
    "id": 8,
    "title": "JavaScript: The Good Parts",
    "author": "Douglas Crockford",
    "price": 14.99,
    "stock": 10,
    "cover": "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=400"
  },
  {
    "id": 9,
    "title": "Building Scalable Web Applications",
    "author": "Anna Taylor",
    "price": 29.99,
    "stock": 3,
    "cover": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400"
  },
  {
    "id": 10,
    "title": "Python for Data Science",
    "author": "Chris Martin",
    "price": 39.99,
    "stock": 5,
    "cover": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400"
  }
]

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredBooks = mockBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-bold text-primary mb-8">Bookstore</h1>

      <div className="mb-8">
        <Input
          type="search"
          placeholder="Search books by title or author..."
          className="max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;