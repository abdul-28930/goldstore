import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { LayoutGrid, Package, DollarSign, Users, Plus } from 'lucide-react';
import { db } from '../../lib/firebase';
import ProductUploadModal from '../../components/admin/ProductUploadModal';
import ProductList from '../../components/admin/ProductList';

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const products = await getDocs(collection(db, 'products'));
      const orders = await getDocs(collection(db, 'orders'));
      const users = await getDocs(collection(db, 'users'));

      const totalRevenue = orders.docs.reduce((sum, order) => 
        sum + order.data().total, 0
      );

      return {
        products: products.size,
        orders: orders.size,
        users: users.size,
        revenue: totalRevenue
      };
    }
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Package, label: 'Products', value: stats?.products || 0, color: 'bg-blue-500' },
          { icon: LayoutGrid, label: 'Orders', value: stats?.orders || 0, color: 'bg-green-500' },
          { icon: Users, label: 'Customers', value: stats?.users || 0, color: 'bg-purple-500' },
          { icon: DollarSign, label: 'Revenue', value: `₹${(stats?.revenue || 0).toLocaleString()}`, color: 'bg-gold-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-sm">
        <ProductList />
      </div>

      {/* Upload Modal */}
      <ProductUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}