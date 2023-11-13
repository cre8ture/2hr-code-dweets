import { useSelector } from 'react-redux';


const CommentThread = ({ commentId }) => {
    const comment = useSelector(state => state.comments.comments[commentId]);
  
    if (!comment) return null;
  
    return (
      <div>
        <p>{comment.text}</p>
        {/* Render child comments recursively if needed */}
      </div>
    );
  };
  
  export default CommentThread