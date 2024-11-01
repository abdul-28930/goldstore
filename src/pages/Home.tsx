import { ArrowRight, Diamond, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative text-center text-white space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold">Rich Gold Covering</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Exquisite gold-covered jewelry that combines luxury with affordability
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-gold-400 text-black px-8 py-3 rounded-full hover:bg-gold-500 transition"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Diamond,
              title: "Premium Gold Covering",
              description: "Finest quality gold covering that lasts"
            },
            {
              icon: Truck,
              title: "Pan India Delivery",
              description: "Free shipping on orders over ₹2000"
            },
            {
              icon: Shield,
              title: "Quality Guarantee",
              description: "100% quality assurance on all products"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <feature.icon className="w-12 h-12 mx-auto text-gold-600" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Collection</h2>
        <FeaturedProducts />
      </section>

      {/* Collection Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[400px] group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80"
              alt="Traditional Collection"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Link
                to="/shop?category=traditional"
                className="bg-gold-400 text-black px-8 py-3 rounded-full hover:bg-gold-500 transition"
              >
                Traditional Collection
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80"
              alt="Modern Collection"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Link
                to="/shop?category=modern"
                className="bg-gold-400 text-black px-8 py-3 rounded-full hover:bg-gold-500 transition"
              >
                Modern Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}