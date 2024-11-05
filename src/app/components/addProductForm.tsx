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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newProduct: Omit<Product, "id"> = {
        title,
        brand,
        price: Number(price),
        description,
      };
      const response = await axios.post<Product>(
        "https://dummyjson.com/products/add",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onProductAdded(response.data);
      setTitle("");
      setBrand("");
      setPrice("");
      setDescription("");
    } catch (err) {
      setError("Erro ao adicionar produto. Tente novamente.");
      console.error("Erro ao adicionar produto:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Adicionar Produto</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
        className="border p-2 w-full"
      />

      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Marca"
        required
        className="border p-2 w-full"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço"
        required
        type="number"
        className="border p-2 w-full"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        required
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 w-full"
        disabled={loading}
      >
        {loading ? "Adicionando..." : "Adicionar Produto"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
