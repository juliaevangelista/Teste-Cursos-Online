// components/UpdateProductForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '../product/page';

interface UpdateProductFormProps {
  product: Product;
  onProductUpdated: (updatedProduct: Product) => void; // Corrigido: agora aceita um Product atualizado
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ product, onProductUpdated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: product,
  });

  const onSubmit = (data: Product) => {
    onProductUpdated(data); // Passa o Product atualizado para a função
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          {...register('title', { required: 'O título é obrigatório' })}
          className={`border ${errors.title ? 'border-red-500' : 'border-gray-300'} p-1`}
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>

      <div>
        <label htmlFor="brand">Marca</label>
        <input
          id="brand"
          {...register('brand', { required: 'A marca é obrigatória' })}
          className={`border ${errors.brand ? 'border-red-500' : 'border-gray-300'} p-1`}
        />
        {errors.brand && <span className="text-red-500">{errors.brand.message}</span>}
      </div>

      <div>
        <label htmlFor="price">Preço</label>
        <input
          id="price"
          type="number"
          {...register('price', {
            required: 'O preço é obrigatório',
            min: { value: 0, message: 'O preço deve ser maior que zero' },
          })}
          className={`border ${errors.price ? 'border-red-500' : 'border-gray-300'} p-1`}
        />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>}
      </div>

      <div>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          {...register('description', { required: 'A descrição é obrigatória' })}
          className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} p-1`}
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>

      <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2">
        Atualizar Produto
      </button>
    </form>
  );
};

export default UpdateProductForm;
