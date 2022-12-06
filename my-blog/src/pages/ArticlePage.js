import React from 'react'
import articles from './article-content';
import { useParams } from 'react-router-dom'


const ArticlePage = () => {
  const {articleId} = useParams();
  const article = articles.find(article=>article.name ===articleId);
  
  return (
    <>
    <h1>{article.title}</h1>
    <h2>{article.name}</h2>
    <p>{article.content.map(paragraph=>(
      <p>{paragraph}</p>
    ))}</p>
  
  </>
  );
}

export default ArticlePage;