import { FaSearch } from "react-icons/fa";

function SeachBar({ search, setSearch, handleSearch }) {
  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10">
      <div className="flex items-center bg-white-border border-gray-300 rounded-3xl overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search latest news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 px-6 py-3 outline-none text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white px-6 py-4 hover:bg-red-700 transition duration-300"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SeachBar;
