import React from 'react'
import articles from './article-content';
import { useParams } from 'react-router-dom'
import NotFoundPage from './NotFoundPage';
import { useState } from 'react';


const ArticlePage = () => {
  const {articleId} = useParams();
  const article = articles.find(article=>article.name ===articleId);

  if(!article) {
    return  <NotFoundPage/>
  }
  
  return (
    <>
    <h1>{article.title}</h1>
    <h2>{article.name}</h2>
    {article.content.map((paragraph,i)=>(
      <p key={i}>{paragraph}</p>
    ))}
  </>
  );
}

export default ArticlePage;