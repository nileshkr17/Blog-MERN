import React from 'react'
import { Link } from 'react-router-dom'
import articles from './article-content';
const ArticlesListPage = () => {
  return (
    <>
    <h1>Articles</h1>
    {articles.map(article => (
      <Link  key={article.name} className="article-list-item" to ={`/article/${article.name}`}>
        <h3>{article.title}</h3>
        <p>{article.content[0].substring(0,150)}...</p>
      </Link>
    )
    )}
    </>
  );
}

export default ArticlesListPage