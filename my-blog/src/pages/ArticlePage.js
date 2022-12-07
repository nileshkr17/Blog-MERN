import React from 'react'
import articles from './article-content';
import { useParams } from 'react-router-dom'
import NotFoundPage from './NotFoundPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';

const ArticlePage = () => {
  const [articleInfo,setArticleInfo] = useState({upvotes:0,comments:[]});
  const {articleId} = useParams();
  const {user,isloading}=useUser();


  useEffect(()=> {
    const loadArticleInfo = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken:token}:{};
    const response = await axios.get(`/api/articles/${articleId}`,{
      headers
    });
    const newArticleInfo = response.data;
    setArticleInfo(newArticleInfo);
    }

    loadArticleInfo();
  },[]);

//when the component is first rendered, the useEffect hook will be called

  const article = articles.find(article=>article.name ===articleId);

  //This function will be called when the user clicks the upvote button
  const addUpvote = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken:token}:{};
    const response = await axios.put(`/api/articles/${articleId}/upvote`,null,{headers});
    setArticleInfo(response.data);
  }
  
  if(!article) {
    return  <NotFoundPage/>
  }
  
  return (
    <>
    <h1>{article.title}</h1>
    <div className='upvote-section'>
{user 
      ?  <button onClick={addUpvote}>Upvote</button>
      :<button>Log in to upvote</button>
} 
    
    <h2>{article.name}</h2>
    <p>This article has {articleInfo.upvotes} upvote(s)</p>
    </div>
    {article.content.map((paragraph,i)=>(
      <p key={i}>{paragraph}</p>
    ))}
  {user 
      ?
  <AddCommentForm 
    articleName={articleId} 
          onArticleUpdated={updatedArticle=> setArticleInfo(updatedArticle)}/>

          :<button>Login to comment</button>}
    <CommentsList comments={articleInfo.comments}/>
  </>
  );
}

export default ArticlePage;