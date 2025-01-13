import React from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/useCart';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
}

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="book-card">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-serif font-bold text-lg mb-2">{book.title}</h3>
      <p className="text-gray-600 mb-2">{book.author}</p>
      <div className="flex justify-between items-center">
        <span className="text-primary font-bold">${book.price.toFixed(2)}</span>
        <Button
          onClick={() => addToCart(book)}
          variant="secondary"
          className="hover:bg-primary hover:text-white transition-colors"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};