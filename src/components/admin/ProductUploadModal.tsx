import { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { storage, db } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface ProductUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductUploadModal({ isOpen, onClose }: ProductUploadModalProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const imageUrls: string[] = [];

      // Upload images
      for (const image of images) {
        const imageRef = ref(storage, `products/${Date.now()}-${image.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      // Upload video if exists
      let videoUrl = '';
      if (video) {
        const videoRef = ref(storage, `products/${Date.now()}-${video.name}`);
        await uploadBytes(videoRef, video);
        videoUrl = await getDownloadURL(videoRef);
      }

      // Save product data
      await addDoc(collection(db, 'products'), {
        name: formData.get('name'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        category: formData.get('category'),
        stock: Number(formData.get('stock')),
        images: imageUrls,
        videoUrl,
        featured: Boolean(formData.get('featured')),
        createdAt: new Date()
      });

      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Product</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500"
              >
                <option value="">Select category</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="rings">Rings</option>
                <option value="bracelets">Bracelets</option>
                <option value="traditional">Traditional</option>
                <option value="modern">Modern</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files || []))}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Video (optional)</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files?.[0] || null)}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm">Featured Product</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-600 text-white px-6 py-3 rounded-lg hover:bg-gold-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Add Product
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}