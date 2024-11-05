import { useState, useEffect } from "react";
import { Product } from "../pages/product";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ products, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const title = product.title || "";
      const brand = product.brand || "";
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    onFilter(filteredProducts);
  }, [searchTerm, products, onFilter]);

  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Buscar por título ou marca"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-lg p-1 m-2"
      />
      <IoSearch size={20} />
    </div>
  );
};

export default SearchBar;
