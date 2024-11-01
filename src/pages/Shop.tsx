import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { db } from '../lib/firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const categories = [
  'All',
  'Necklaces',
  'Earrings',
  'Rings',
  'Bracelets',
  'Traditional',
  'Modern'
];

const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹1000', min: 0, max: 1000 },
  { label: '₹1000 - ₹5000', min: 1000, max: 5000 },
  { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
  { label: 'Above ₹10000', min: 10000, max: Infinity }
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: async () => {
      const q = selectedCategory === 'All'
        ? query(collection(db, 'products'))
        : query(
            collection(db, 'products'),
            where('category', '==', selectedCategory.toLowerCase())
          );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    }
  });

  const filteredProducts = products?.filter(
    product => 
      product.price >= selectedPriceRange.min && 
      product.price <= selectedPriceRange.max
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === category
                      ? 'bg-gold-100 text-gold-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <button
                  key={range.label}
                  onClick={() => setSelectedPriceRange(range)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedPriceRange === range
                      ? 'bg-gold-100 text-gold-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filters Button */}
        <button
          className="md:hidden flex items-center gap-2 text-gray-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden space-y-6 bg-white p-4 rounded-lg shadow-md">
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      selectedCategory === category
                        ? 'bg-gold-100 text-gold-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <button
                    key={range.label}
                    onClick={() => {
                      setSelectedPriceRange(range);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      selectedPriceRange === range
                        ? 'bg-gold-100 text-gold-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {selectedCategory} Jewelry
            </h1>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span>{filteredProducts?.length || 0} products</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}