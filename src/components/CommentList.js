import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InputAndRespond from './Input'; // Adjust the import path as necessary
import Comment from './Comment'; // Import the new Comment component

const initialCommentStyle = {
//   borderRadius: '10px',
  backgroundColor: 'white',
  margin: '20px',
  padding: '10px', // Added padding for inner spacing
  transition: 'border-color 0.3s ease' // Transition for border color
};

const CommentList = () => {
  const nestedComments = useSelector(state => state.comments.comments || {});
  const commentRefs = useRef({});
  const selectedCommentId = useSelector(state => state.comments.selectedCommentId);

  useEffect(() => {
    if (selectedCommentId && commentRefs.current[selectedCommentId]) {
      commentRefs.current[selectedCommentId].scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCommentId]);

  return (
    <div>
      <div style={initialCommentStyle}>
        <InputAndRespond parentId={null} type={"Deet code!"} />
      </div>

      {Object.values(nestedComments)
        .filter(comment => comment.parentId === null)
        .map(comment => (
          <Comment key={comment.id} 
          ref={el => commentRefs.current[comment.id] = el}
          comment={comment} nestedComments={nestedComments} level={0} />
        ))}
    </div>
  );
};

export default CommentList;
