import { Product } from '../pages/product';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
  onDelete: (productId: number) => Promise<void>;
  onUpdate: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onUpdate }) => {
  return (
    <ul className="grid grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default ProductList;
