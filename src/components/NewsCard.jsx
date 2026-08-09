import React from 'react';

const NewsCard = ({ news }) => {
  // Defensive check to avoid runtime errors if news is undefined
  if (!news) return null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      {/* Article Image with Fallback */}
      <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
        <img
          src={news.image || 'https://via.placeholder.com/600x400?text=News+Image'}
          alt={news.title || 'News'}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Source Name & Date Header */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {news.source?.name || 'General News'}
            </span>
            <span>
              {news.publishedAt
                ? new Date(news.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : ''}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800 hover:text-red-600 transition-colors line-clamp-2 mb-2">
            {news.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {news.description || 'No description available for this article.'}
          </p>
        </div>

        {/* Action Button Link */}
        <div className="pt-2">
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;