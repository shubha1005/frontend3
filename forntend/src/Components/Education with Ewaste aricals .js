import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles1.css";

const Education = () => {
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [videosRes, articlesRes, tweetsRes] = await Promise.all([
        fetchYouTubeVideos(),
        fetchArticles(),
        fetchTweets(),
      ]);

      setVideos(videosRes);
      setArticles(articlesRes);
      setTweets(tweetsRes);
    } catch (err) {
      setError("Failed to fetch some data. Please try again later.");
      console.error(err);
    }
  };

  const fetchYouTubeVideos = async () => {
    const apiKey = "AIzaSyC1RhbtXof0S91iTeOLSiLqI92lA79S9RQ";
    const searchQuery = "e-waste recycling";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=6&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data.items;
    } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
    }
  };

  const fetchArticles = async () => {
    const apiKey = "866a8cdb24664f768d5e6fccaa3c9565";
    const url = `https://newsapi.org/v2/everything?q=e-waste&language=en&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      // Filter articles related to "W State"
      const filteredArticles = response.data.articles.filter((article) =>
        article.title.toLowerCase().includes("w state")
      );
      return filteredArticles;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  };

  const fetchTweets = async () => {
    const bearerToken =
      "AAAAAAAAAAAAAAAAAAAAAEKNzQEAAAAAGgnz4SsGWA7dkRDb9OHjtqb8RxM%3DgpOwqcEBuPvGbvuAALS7X8lQDCGB9Deay4Z8r1UPUSdHveu2Dw";
    const url =
      "https://api.twitter.com/2/tweets/search/recent?query=e-waste-recycling&max_results=5";

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching tweets:", error);
      return [];
    }
  };

  return (
    <div className="education-container">
      <h1 className="education-title">Educational Hub</h1>

      {error && <p className="error-message">{error}</p>}

      {/* YouTube Videos */}
      <h2 className="education-subtitle">Videos on E-Waste Recycling</h2>
      <div className="video-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <iframe
              key={video.id.videoId}
              className="video-frame"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>
          ))
        ) : (
          <p className="loading-text">No videos available.</p>
        )}
      </div>

      {/* Articles */}
      <h2 className="education-subtitle">Educational Articles (W State)</h2>
      <div className="article-section">
        {articles.length > 0 ? (
          <ul className="article-list">
            {articles.map((article, index) => (
              <li key={index} className="article-item">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-link"
                >
                  {article.title}
                </a>
                {article.description && (
                  <p className="article-description">{article.description}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="loading-text">No articles found for W State.</p>
        )}
      </div>

      {/* Tweets */}
      <h2 className="education-subtitle">Latest Tweets on E-Waste</h2>
      <ul className="tweet-list">
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <li key={tweet.id} className="tweet-item">{tweet.text}</li>
          ))
        ) : (
          <p className="loading-text">No tweets available.</p>
        )}
      </ul>
    </div>
  );
};

export default Education;
