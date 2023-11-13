import React from 'react';
import Layout from './components/Layout';
import CommentList from './components/CommentList';
import SearchAndCommentContainer from './components/SearchAndCommentContainer';
import Header from './components/Header'
import './App.css';
// import Input from './components/Input';
function App() {
  return (
    <Layout>
      <div>
        <SearchAndCommentContainer/>
        <Header />
       <CommentList /> {/*parentId={comment.id} />} */}
      </div>
      </Layout>
  );
}

export default App;
