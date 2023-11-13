import FrameRenderer from './DisplayCode'; // Adjust the import path as necessary
import InputAndRespond from './InputReply'; // Adjust the import path as necessary
import React, { useState, forwardRef } from 'react';

const Comment = forwardRef(({ comment, nestedComments, level }, ref) => {
  const [showChildren, setShowChildren] = useState(false);

  // Check if nestedComments is an array; if not, use an empty array
  const validNestedComments = Array.isArray(nestedComments) ? nestedComments : [];

  const childComments = validNestedComments.filter(c => c.parentId === comment.id);

  const commentStyle = {
    marginLeft: level > 0 ? '20px' : '0',
    position: 'relative',
    paddingLeft: '10px',
  };

  const connectorStyle = level > 0 ? {
    position: 'absolute',
    left: '-10px',
    bottom: 0,
    top: '-10px',
    borderLeft: '2px dotted #ccc',
    borderBottom: '2px dotted #ccc',
    height: '100%',
    width: '10px',
  } : {};

  const renderComments = (parentId, level) => {
    return childComments.map(c => (
      <Comment key={c.id} comment={c} nestedComments={nestedComments} level={level + 1} />
    ));
  };

  return (
    <div style={commentStyle} ref={ref}>
      {level > 0 && <div style={connectorStyle}></div>} {/* Connector for child comments */}

      <FrameRenderer content={`<html><body><p>${comment.text}</p></body></html>`} />
      <InputAndRespond parentId={comment.id} type={'Reply'} />

      {comment.children.length > 0 && (
        <button onClick={() => setShowChildren(!showChildren)}>
          {showChildren ? 'Hide' : `Show ${comment.children.length}`}
        </button>
      )}

      {showChildren && <div style={{ marginTop: '10px' }}>{renderComments(comment.id, level)}</div>}
    </div>
  );
});

export default Comment;
