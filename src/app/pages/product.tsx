"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/searchBar";
import FilterAndSort from "../components/filterAndSort";
import ProductList from "../components/ProductList"; 

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<{ products: Product[] }>(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          (page - 1) * productsPerPage
        }`
      );
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
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
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      setFilteredProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (err) {
      console.error("Erro ao excluir produto", err);
    }
  };

  const handleUpdate = async (updatedProduct: Product) => {
    try {
      await axios.put(`https://dummyjson.com/products/${updatedProduct.id}`, updatedProduct);
      setProducts((prev) => prev.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));
      setFilteredProducts((prev) => prev.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));
    } catch (err) {
      console.error("Erro ao atualizar produto", err);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleFilter = (filtered: Product[]) => {
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reseta a página para 1 ao aplicar filtro
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <SearchBar
        products={products}
        onFilter={handleFilter}
      />
      <FilterAndSort
        products={products}
        onFilter={handleFilter}
      />
      <ProductList 
        products={paginatedProducts}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <div className="flex justify-between my-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span> {/* Removido o total de páginas */}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
