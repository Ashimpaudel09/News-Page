import React from "react";
import './NewsItem.css';

const NewsItem = ({ title, description, imgUrl, url, date, author }) => {
  const publishedDate = new Date(date);
  const now = new Date();
  const diffMinutes = Math.floor((now - publishedDate) / (1000 * 60));
  const diffDays = Math.floor(diffMinutes / 60 / 24);

  const timeAgo =
    diffDays > 7
      ? publishedDate.toDateString()
      : diffDays > 0
      ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      : diffMinutes > 60
      ? `${Math.floor(diffMinutes / 60)} hour${Math.floor(diffMinutes / 60) > 1 ? 's' : ''} ago`
      : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;

  return (
    <div className="news-card">
      <img
        src={imgUrl || "https://via.placeholder.com/300x200"}
        alt={title}
        className="news-img"
      />
      <div className="news-content">
        <h3 className="news-title">{title}</h3>
        <p className="news-description">{description}</p>
        <div className="news-meta">
          <small>By <strong>{author || "Unknown"}</strong></small>
          <small>{timeAgo}</small>
        </div>
        <a href={url} className="read-more-btn" target="_blank" rel="noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
