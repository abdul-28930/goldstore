import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        {product.videoUrl && (
          <span className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
            Video
          </span>
        )}
      </Link>
      <button
        className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4" />
      </button>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-1 hover:text-gold-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-gold-600 font-bold">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}