import { FaSearch, FaTimes } from "react-icons/fa";
function SearchBar({ search, setSearch, handleSearch, onClear }) {
  return (
    <form
      className="mx-auto mb-8 mt-8 max-w-2xl"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <label htmlFor="news-search" className="sr-only">
        Search news
      </label>
      <div className="flex items-center overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-sm focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
        <input
          id="news-search"
          type="text"
          inputMode="search"
          placeholder="Search latest news..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-w-0 flex-1 px-5 py-3 text-gray-900 outline-none placeholder:text-gray-500"
        />
        {search && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="grid h-11 w-11 shrink-0 place-items-center text-gray-600 hover:bg-gray-100"
          >
            <FaTimes aria-hidden="true" />
          </button>
        )}
        <button
          type="submit"
          aria-label="Search"
          className="grid h-12 w-14 shrink-0 place-items-center bg-red-600 text-white hover:bg-red-700"
        >
          <FaSearch aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
export default SearchBar;
