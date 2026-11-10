import { Link } from "react-router-dom";
function NotFound() {
  return (
    <main className="flex min-h-[55vh] items-center justify-center px-5 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-950">404</h1>
        <p className="mt-3 text-gray-700">Page not found</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
        >
          Back to NewsHub
        </Link>
      </div>
    </main>
  );
}
export default NotFound;
