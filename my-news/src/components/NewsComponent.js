import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import './NewsComponent.css'

const NewsComponent = (props) => {
  const capitalizeFirstLetter = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  document.title = `RickNews - ${capitalizeFirstLetter(props.category)}`;

  const update = async () => {
    props.setProgress(0);
    setLoading(true);
    try {
      const url = `https://newsapi.org/v2/top-headlines?apiKey=${props.api}&q=${props.category}&page=1&pageSize=${props.pageSize}`;
      props.setProgress(40);
      const response = await fetch(url);
      const data = await response.json();
      props.setProgress(70);

      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
      setPage(2); // Reset to next page
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setArticles([]);
      setTotalResults(0);
    }
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]); // reload when category changes

  const fetchMoreData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?apiKey=${props.api}&q=${props.category}&page=${page}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      const response = await fetch(url);
      const data = await response.json();

      setArticles((prev) => [...prev, ...(data.articles || [])]);
      setTotalResults(data.totalResults || 0);
    } catch (error) {
      console.error("Failed to fetch more news:", error);
    }
  };

  return (
    <>
      <div className="ricknews-hero">
        <div className="ricknews-overlay">
          <h1 className="ricknews-title">Welcome to RickNews</h1>
          <p className="ricknews-subtitle">
            Your daily source for the latest updates in{" "}
            <strong>{capitalizeFirstLetter(props.category)}</strong> and beyond.
          </p>
          <p className="ricknews-cta">Stay informed. Stay ahead.</p>
        </div>
      </div>

      <div className="container my-5">
        <h1 className="news-heading text-center my-4">
          Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
          endMessage={
            <p
              style={{
                textAlign: "center",
                color: "#45a29e",
                fontWeight: "bold",
              }}
            >
              You have seen it all!!!
            </p>
          }
        >
          <div className="row">
            {articles.map((element, index) => (
              <div key={index} className="col-md-4 col-sm-6 col-12">
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  url={element.url}
                  date={element.publishedAt}
                  author={element.author}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default NewsComponent;
