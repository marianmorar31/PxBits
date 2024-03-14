import Image from 'next/image';
import Link from 'next/link';

interface Product {
    _id: number;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    price: number;
  }

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div key={product._id} className="bg-white p-6 rounded-lg shadow-md">
    <div className="aspect-w-16 aspect-h-9 mb-4">
      <Image
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover rounded"
        width={150}
        height={150}
      />
    </div>
    <p className="text-xl font-bold mb-2">{product.name}</p>
    <p className="text-gray-600 mb-2">{product.brand}</p>
    <p className="text-gray-700 mb-2">{product.category}</p>
    <p className="mb-4">{product.description}</p>
    <p className="text-green-600 font-bold">${product.price}</p>

    <Link href={`/products/${product._id}`}>
      <p className="mt-4 bg-blue-500 text-white p-2 rounded block text-center">View Details</p>
    </Link>
  </div>
);

export default ProductCard;