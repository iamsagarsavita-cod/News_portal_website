function Category({ category, setCategory }) {
  const categories = [
    "general",
    "world",
    "nation",
    "business",
    "sports",
    "technology",
    "health",
    "entertainment",
    "science",
  ];
  return (
    <div
      className="flex flex-wrap justify-center gap-2 sm:gap-3"
      aria-label="Filter by category"
    >
      {categories.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={category === item}
          onClick={() => setCategory(item)}
          className={`rounded-full px-4 py-2 font-medium capitalize transition ${category === item ? "bg-red-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-red-100 hover:text-red-700"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
export default Category;
