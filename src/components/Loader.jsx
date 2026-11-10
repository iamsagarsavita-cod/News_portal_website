function Loader() {
  return (
    <div
      className="flex justify-center py-16"
      role="status"
      aria-label="Loading news"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
    </div>
  );
}
export default Loader;
