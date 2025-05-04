import { useEffect, useState } from "react";

type Props = {
  current: string;
  setFilter: (val: string) => void;
};

const FilterBar = ({ current, setFilter }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Could not load categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mb-6 flex gap-3 flex-wrap">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-4 py-2 rounded-full border transition ${
            current === cat
              ? "bg-mutedlilac text-white"
              : "bg-neutral border-mutedlilac text-mutedlilac hover:bg-mutedlilac/10"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
