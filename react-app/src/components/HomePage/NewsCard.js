import React from "react";

function NewsCard({ news }) {
    return (
        <div className="portfolio-news-div">
            <div className="news-card-container">
                {news.map(article => (
                    <div key={article.title} className="news-card" onClick={() => window.open(article.article_url)}>
                        <div className="news-info-div">
                            <div className="news-author bold">
                                {article.publisher.name}
                            </div>
                            <div className="news-title">
                                {article.title}
                            </div>
                        </div>
                        <div className="news-img-div">
                            <img className="news-img" src={article.image_url} alt="news-img" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsCard
