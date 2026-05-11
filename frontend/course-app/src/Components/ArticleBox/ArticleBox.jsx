import React from "react";
import { Link } from "react-router";
import "./ArticleBox.css";

export default function ArticleBox({ title, description, cover,shortName }) {
  return (
    <div class="col-4">
      <div class="article-card">
        <div class="article-card__header">
          <Link to={`/articles-info/${shortName}`} class="article-card__link-img">
            <img
              src={cover}
              class="article-card__img"
              alt="Article Cover"
            />
          </Link>
        </div>
        <div class="article-card__content">
          <Link to={`/articles-info/${shortName}`}  class="article-card__link">
            {title}
          </Link>
          <p class="article-card__text">
            {description}  
          </p>
          <Link to={`/articles-info/${shortName}`}  class="article-card__btn">
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
}
