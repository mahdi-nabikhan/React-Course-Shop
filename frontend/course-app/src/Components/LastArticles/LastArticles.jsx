import React, { useEffect, useState } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "./../SectionHeader/SectionHeader";

import "./LastArticles.css";

export default function LastArticles() {
  const [articles, setArticles] = useState()
  useEffect(() => {
    fetch(`http://localhost:5000/v1/articles`).then(res => res.json()).then(allArticle => {
      console.log(allArticle)
    })
  })
  return (
    <section class="articles">
      <div class="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
        />

        <div class="articles__content">
          <div class="row">
            {articles.map((article) => {
              <ArticleBox {...article}
              />

            })}


            cover="images/blog/3.jpg"
            desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."

          </div>
        </div>
      </div>
    </section>
  );
}
