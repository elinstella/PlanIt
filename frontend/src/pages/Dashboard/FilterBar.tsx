type Props = {
    current: string;
    setFilter: (val: string) => void;
  };
  
  const FilterBar = ({ current, setFilter }: Props) => {
    const categories = ["All", "Work", "Personal", "Health", "General"];
  
    return (
      <div className="mb-6 flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border ${
              current === cat
                ? "bg-mutedlilac text-white"
                : "bg-neutral border-mutedlilac text-mutedlilac"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterBar;
  