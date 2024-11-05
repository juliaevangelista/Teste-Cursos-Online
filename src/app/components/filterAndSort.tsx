import { useEffect, useState } from "react";
import { Product } from "../pages/product";

interface FilterAndSortProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({
  products,
  onFilter,
}) => {
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
    const filteredProducts = products.filter(
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
  }, [sortOption, selectedCategories, products, onFilter]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Ordenar por</option>
        <option value="title">Título</option>
        <option value="brand">Marca</option>
      </select>

      <div>
        {categories.map((category) => (
          <label key={category} className="flex gap-1">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category.replace("-", " ")}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterAndSort;
