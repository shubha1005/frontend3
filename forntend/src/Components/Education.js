import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles1.css";

const Education = () => {
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchYouTubeVideos();
    fetchArticles();
    fetchTweets();
  }, []);

  const fetchYouTubeVideos = async () => {
    const apiKey = "AIzaSyAfimyUzCHdQ4RYDM4zLPGvwRIAGEHPvlE";
    const searchQuery = "e-waste recycling";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=6&key=${apiKey}`;
    
    try {
      const response = await axios.get(url);
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // const fetchArticles = async () => {
  //   const apiKey = "866a8cdb24664f768d5e6fccaa3c9565";
  //   const url = `https://newsapi.org/v2/everything?q=E%20waste&language=en&apiKey=${apiKey}`;
    
  //   try {
  //     const response = await axios.get(url);
  //     setArticles(response.data.articles);
  //   } catch (error) {
  //     console.error("Error fetching articles:", error);
  //   }
  // };

  // const fetchArticles = async () => {
  //   const apiKey = "866a8cdb24664f768d5e6fccaa3c9565";
  //   const query = "e-waste articles ";  // More specific query
  //   const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
  
  //   try {
  //     const response = await axios.get(url);
  //     setArticles(response.data.articles);
  //   } catch (error) {
  //     console.error("Error fetching articles:", error);
  //   }
  // };
  
  const fetchArticles = async () => {
    const apiKey = "62c3f315acf04d8dd03435397f4f5106";
    const url = `https://gnews.io/api/v4/search?q="e-waste"&country=in&lang=en&token=${apiKey}` ;
    
    try {
      const response = await axios.get(url);
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching e-waste articles:", error);
    }
  };

  
  const fetchTweets = async () => {
    const bearerToken = "AAAAAAAAAAAAAAAAAAAAAEKNzQEAAAAAGgnz4SsGWA7dkRDb9OHjtqb8RxM%3DgpOwqcEBuPvGbvuAALS7X8lQDCGB9Deay4Z8r1UPUSdHveu2Dw";
    const url = "https://api.twitter.com/2/tweets/search/recent?query=e-waste-recycling&max_results=5";
    
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${bearerToken}` }
      });
      setTweets(response.data.data);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  return (
    <div className="education-container">
      <h1 className="education-title">Educational Hub</h1>
      
      {/* YouTube Videos */}
      <h2 className="education-subtitle">Videos on E-Waste Recycling</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <iframe
            key={video.id.videoId}
            className="video-frame"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            allowFullScreen
          ></iframe>
        ))}
      </div >
      
      {/* Articles */}
     {/* Articles */}
<h2 className="education-subtitle">Educational Articles</h2>
<div className="article-section">
  <ul className="article-list">
    {articles.map((article, index) => (
      <li key={index} className="article-item">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
          {article.title}
        </a>
        {article.description && <p className="article-description">{article.description}</p>}
      </li>
    ))}
  </ul>
</div>


     
    </div>
  ); 
};

export default Education;
