import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getTopHeadlines } from '../services/apiService';
import Loader from '../Components/Loader';
import NewsCard from '../Components/NewsCard';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const articles = await getTopHeadlines();
        console.log('Fetched Articles:', articles); // Now logged properly

        setNews(articles || []);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        toast.error("Something went wrong :(");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Loader size="medium" />;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Red Hero Banner Section */}
      <div className="mx-auto my-6 py-12 px-6 bg-red-600 rounded-2xl shadow-lg text-center">
        <style>
          {`
            html {
              scroll-behavior: smooth;
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-hero-title {
              animation: fadeInUp 0.6s ease-out forwards;
            }
            .animate-hero-subtitle {
              animation: fadeInUp 0.6s ease-out 0.2s forwards;
              opacity: 0;
            }
            .animate-hero-btn {
              animation: fadeInUp 0.6s ease-out 0.4s forwards;
              opacity: 0;
            }
          `}
        </style>

        <h1 className="animate-hero-title text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Welcome To News Portal
        </h1>

        <p className="animate-hero-subtitle font-bold text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Read the latest news from around the world.
        </p>

        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 0.5,
              behavior: 'smooth'
            });
          }}
          className="animate-hero-btn inline-block bg-white text-red-600 font-bold text-lg px-8 py-5 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Explore News ↓
        </button>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
        {news && news.length > 0 ? (
          // Use parentheses () for implicit return in map
          news.map((n, index) => (
            <NewsCard key={n.url || index} news={n} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No news articles available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;