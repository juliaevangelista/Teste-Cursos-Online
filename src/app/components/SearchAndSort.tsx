import { useEffect, useState } from "react";
import { Product } from '../product/page';
import { IoSearch } from "react-icons/io5";

interface SearchAndSortProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
  onCategoryFilter: (category: string) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  products,
  onFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  useEffect(() => {
    const filteredProducts = products
      .filter((product) => {
        const title = product.title || ""; 
        const brand = product.brand || "";
        return (
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .filter(
        (product) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)
      );

    if (sortOption === "title") {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "brand") {
      filteredProducts.sort((a, b) => a.brand.localeCompare(b.brand));
    }

    onFilter(filteredProducts);
  }, [searchTerm, sortOption, selectedCategories, products, onFilter]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
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

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Ordenar por</option>
        <option value="title">Título</option>
        <option value="brand">Marca</option>
      </select>

      <div className="mb-4">
        {categories.map((category) => (
          <label key={category} className="flex gap-2">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)} // Atualizado para usar o manipulador
            />
            {category.replace("-", " ")} 
          </label>
        ))}
      </div>
    </div>
  );
};

export default SearchAndSort;
