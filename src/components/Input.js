// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addComment, deleteComment } from '../redux/features/commentsSlice'; // adjust the import path

// const InputAndRespond = ({ parentId }) => {
//   const [commentText, setCommentText] = useState('');
//   const dispatch = useDispatch();

//   const handleAddComment = () => {
//     // Dispatch an action to add a comment using the action creator
//     console.log("addC   ", addComment, parentId, commentText)
//     dispatch(addComment({ id: Date.now(), text: commentText, parentId, author: 'AuthorName' })); // Add other necessary properties
//     setCommentText(''); // Clear the input field after adding
//   };

//   const handleDeleteComment = () => {
//     // Dispatch an action to delete a comment using the action creator
//     dispatch(deleteComment(parentId));
//   };

//   return (
//     <div className="code-viewer" 
//         styles={{display: "flex",
//         gap: "10px",
//         alignContent: "first baseline",
//         backgroundColor: "lightgray"}}>
        
//       <textarea
//         type="code"
//         value={commentText}
//         onChange={(e) => setCommentText(e.target.value)}
//         placeholder="Enter your code dweet"
//         styles={{maxWidth:'300px',
//         maxHeight: '200px',
//        backgroundColor: 'light grey'}}
//       />
//       <button onClick={handleAddComment}>Comment</button>
//       {parentId !== null && <button onClick={handleDeleteComment}>Delete</button>}
//     </div>
//   );
// };

// export default InputAndRespond;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment, deleteComment } from '../redux/features/commentsSlice'; // adjust the import path
import AceEditor from "react-ace";

// Import the necessary modes and themes
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";

const initialPlaceholder = "<h1>Enter in HTML, with or without CSS, and JavaScript, then comment in 150 characters or less</h1>";

const InputAndRespond = ({ parentId, type }) => {
    const [commentText, setCommentText] = useState(initialPlaceholder)// "<h1 class=\"title\">Enter in HTML, with or without CSS, and JavaScript, then comment in 150 characters or less</h1>"
    const [charCount, setCharCount] = useState(0);
    const maxCharLimit = 250;
    const dispatch = useDispatch();
  
    const handleAddComment = () => {
      dispatch(addComment({ id: Date.now(), text: commentText, parentId, author: 'AuthorName' }));
      setCommentText('');
      setCharCount(0);
    };
  
    const handleDeleteComment = () => {
      dispatch(deleteComment(parentId));
    };
  
    const handleTextChange = (newText) => {
      if (newText.length <= maxCharLimit) {
        setCommentText(newText);
        setCharCount(newText.length);
      }
    };
  
    return (
        <div>
          <label className='label-for-code-editor' style={{marginBottom: '10px'}}>Input your code dweet:</label>

  <div style={{ display: 'flex', marginTop: '10px', alignItems: "center", gap: '10px', height: type === 'reply' ? '80px' : '150px' }}>
    <div className='code-viewer' style={{ border: '1px solid rgba(30, 144, 255, 0.6)', borderRadius: '0px', padding: '5px', display: 'flex', alignItems: 'center' }}>
          <AceEditor
            mode="javascript" // set this depending on the language
            theme="tomorrow"
            value={commentText}
            onChange={handleTextChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            style={{ maxWidth: '300px', height: type === 'reply' ? '80px' : '150px' }}
            setOptions={{
              fontSize: "10pt",
              useWorker: false,
              wrap: true,
              showLineNumbers: false
            }}
          />
        </div>
        <div>
          <div style={{ textAlign: 'right', marginBottom: '5px' }}>
           character count {" "} {charCount} / {maxCharLimit}
          </div>
          <button onClick={handleAddComment} style={{ marginRight: '5px' }}>{type}</button>
          {parentId !== null && <button onClick={handleDeleteComment}>Delete</button>}
        </div>
      </div>
      </div>

    );
  };
  
  export default InputAndRespond;