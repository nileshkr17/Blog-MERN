import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './pages/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <div id="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticlesListPage />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
// const response = await axios.get('http://localhost:8000/api/articles/learn-react/');
// const data = response.data;