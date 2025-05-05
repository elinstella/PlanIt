import { useEffect, useState } from "react";

type Props = {
  current: string;
  setFilter: (val: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (val: "asc" | "desc") => void;
  dateFilter: "All" | "HasDate" | "NoDate";
  setDateFilter: (val: "All" | "HasDate" | "NoDate") => void;
};

const FilterBar = ({
  current,
  setFilter,
  sortOrder,
  setSortOrder,
  dateFilter,
  setDateFilter,
}: Props) => {
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
    <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
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
        <div className="flex gap-2 flex-wrap mt-2">
          {["All", "HasDate", "NoDate"].map((option) => (
            <button
              key={option}
              onClick={() => setDateFilter(option as "All" | "HasDate" | "NoDate")}
              className={`px-4 py-2 rounded-full border transition ${
                dateFilter === option
                  ? "bg-mutedlilac text-white"
                  : "bg-neutral border-mutedlilac text-mutedlilac hover:bg-mutedlilac/10"
              }`}
            >
              {{
                All: "All",
                HasDate: "Has due date",
                NoDate: "No due date",
              }[option]}
            </button>
          ))}
        </div>
      </div>

      {/* Here I added mt-4 to push it down */}
      <div className="flex items-center gap-2 mt-4">
        <label htmlFor="sort" className="text-sm text-mutedlilac">
          Sort by time:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="px-3 py-1 rounded bg-neutral text-mutedlilac border border-mutedlilac"
        >
          <option value="asc">Earliest first</option>
          <option value="desc">Latest first</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
