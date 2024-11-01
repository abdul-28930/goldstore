import { Crown, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-gold-400" />
              <span className="text-xl font-bold">Rich Gold</span>
            </Link>
            <p className="text-gray-400">
              Premium gold-covered jewelry since 2010
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold-400"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gold-400"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gold-400"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-gold-400">Shop</Link></li>
              <li><Link to="/collections" className="text-gray-400 hover:text-gold-400">Collections</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-gold-400">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gold-400">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gold-400" />
                <span className="text-gray-400">123 Jewelry Lane, Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400" />
                <span className="text-gray-400">info@richgold.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe for exclusive offers and updates.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button
                type="submit"
                className="w-full bg-gold-600 text-white px-4 py-2 rounded hover:bg-gold-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Rich Gold Covering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}