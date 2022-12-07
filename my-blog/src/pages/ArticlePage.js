import React from 'react'
import articles from './article-content';
import { useParams } from 'react-router-dom'
import NotFoundPage from './NotFoundPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentsList from '../components/CommentsList';

const ArticlePage = () => {
  const [articleInfo,setArticleInfo] = useState({upvotes:0,comments:[]});
  const {articleId} = useParams();
  useEffect(()=> {
    const loadArticleInfo = async () => {
    const response = await axios.get(`/api/articles/${articleId}`);
    const newArticleInfo = response.data;
    setArticleInfo(newArticleInfo);
    }

    loadArticleInfo();
  },[]);

//when the component is first rendered, the useEffect hook will be called

  const article = articles.find(article=>article.name ===articleId);

  //This function will be called when the user clicks the upvote button
  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    setArticleInfo(response.data);
  }
  
  if(!article) {
    return  <NotFoundPage/>
  }
  
  return (
    <>
    <h1>{article.title}</h1>
    <div className='upvote-section'>
    <button onClick={addUpvote}>Upvote</button>
    <h2>{article.name}</h2>
    <p>This article has {articleInfo.upvotes} upvote(s)</p>
    </div>
    {article.content.map((paragraph,i)=>(
      <p key={i}>{paragraph}</p>
    ))}

    <CommentsList comments={articleInfo.comments}/>
  </>
  );
}

export default ArticlePage;