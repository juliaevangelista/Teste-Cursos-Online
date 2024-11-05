"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateProductForm from "../components/updateProductForm";
import SearchAndSort from "../components/SearchAndSort";

export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  description: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<{ products: Product[]; total: number }>(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          (page - 1) * productsPerPage
        }`
      );
      setProducts(response.data.products);
      setFilteredProducts(response.data.products); // Atualiza os produtos filtrados inicialmente
      setTotalProducts(response.data.total);
    } catch (err) {
      console.error("Erro ao carregar produtos", err);
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      setFilteredProducts(filteredProducts.filter((product) => product.id !== productId)); // Atualiza o filteredProducts
    } catch (err) {
      console.error("Erro ao excluir produto", err);
    }
  };

  // Função para filtrar produtos por categoria
  const filterByCategory = (category: string) => {
    const filtered = products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reseta a página para a primeira ao filtrar
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="p-4">
      <SearchAndSort products={products} onFilter={setFilteredProducts} onCategoryFilter={filterByCategory} /> {/* Passa a função de filtro por categoria */}
      
      <div>
        {filteredProducts
          .slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
          )
          .map((product) => (
            <div key={product.id}>
              
            </div>
          ))}
      </div>

      <div className="">
        <ul className="grid grid-cols-3 gap-2">
          {filteredProducts.map((product) => (
            <li key={product.id} className="bg-slate-500 p-3 rounded-lg">
              <div className="p-2">
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <p>Marca: {product.brand}</p>
                <p className="text-base font-semibold">Preço: ${product.price}</p>
                <p>{product.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(product.id)}
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
                      fetchProducts(currentPage);
                      setIsUpdating(false);
                    }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 rounded-lg p-2"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-gray-300 rounded-lg p-2"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
