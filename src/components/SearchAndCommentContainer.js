
import {useState } from 'react'
import Search from './Search';
import DisplayCommentThreadFromSearch from './DisplayCommentThreadFromSearch'

const CommentPage = () => {
    const [selectedCommentId, setSelectedCommentId] = useState(null);
  
    // Function to set the selected comment ID
    const handleSelectComment = (id) => {
      setSelectedCommentId(id);
    };
  
    return (
      <div>
        <Search onSelectComment={handleSelectComment} />
        {selectedCommentId && <DisplayCommentThreadFromSearch commentId={selectedCommentId} />}
      </div>
    );
  };
  
  export default CommentPage