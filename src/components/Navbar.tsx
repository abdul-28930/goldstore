import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../stores/cartStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const cartCount = useCart((state) => state.items.length);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Crown className="w-8 h-8 text-gold-600" />
            <span className="text-xl font-bold">Rich Gold</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gold-600">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-gold-600">Shop</Link>
            <Link to="/collections" className="text-gray-700 hover:text-gold-600">Collections</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gold-600">Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to={user ? '/account' : '/login'}>
              <User className="w-6 h-6" />
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-gold-600">Home</Link>
              <Link to="/shop" className="text-gray-700 hover:text-gold-600">Shop</Link>
              <Link to="/collections" className="text-gray-700 hover:text-gold-600">Collections</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gold-600">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}