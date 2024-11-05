import { useState, FormEvent } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  description: string;
}

interface AddProductFormProps {
  onProductAdded: (product: Product) => void;
}

export default function AddProductForm({
  onProductAdded,
}: AddProductFormProps) {
  const [title, setTitle] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newProduct: Omit<Product, "id"> = {
        title,
        brand,
        price: Number(price),
        description,
      };
      const response = await axios.post<Product>(
        "https://dummyjson.com/products/add",
        newProduct
      );
      onProductAdded(response.data);
      setTitle("");
      setBrand("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.error("Erro ao adicionar produto", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Adicionar Produto</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Marca"
        required
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço"
        required
        type="number"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        required
      />
      <button type="submit">Adicionar Produto</button>
    </form>
  );
}
