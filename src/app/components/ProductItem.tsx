// components/ProductItem.tsx
import { useState } from 'react';
import UpdateProductForm from './updateProductForm';
import { Product } from '../pages/product'; 

interface ProductItemProps {
  product: Product;
  onDelete: (productId: number) => Promise<void>;
  onUpdate: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <li className="bg-slate-500 p-3 rounded-lg">
      <div className="p-2">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p>Marca: {product.brand}</p>
        <p className="text-base font-semibold">Preço: ${product.price}</p>
        <p>{product.description}</p>
        <div className="flex gap-2">
          <button
            onClick={() => onDelete(product.id)}
            className="bg-red-700 rounded-lg p-1 text-white"
          >
            Excluir
          </button>
          <button
            onClick={() => setIsUpdating(true)}
            className="bg-green-700 rounded-lg p-1 text-white"
          >
            Atualizar Produto
          </button>
        </div>

        {isUpdating && (
          <UpdateProductForm
            product={product}
            onProductUpdated={() => {
              onUpdate(product);
              setIsUpdating(false);
            }}
          />
        )}
      </div>
    </li>
  );
};

export default ProductItem;
