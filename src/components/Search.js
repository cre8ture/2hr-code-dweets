import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCommentId } from '../redux/features/commentsSlice'; // Adjust the import path as necessary

const CommentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const comments = useSelector(state => state.comments.comments);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setSearchResults([]);
      return;
    }

    const results = Object.values(comments).filter(comment => 
      comment.text.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleResultClick = (id) => {
    dispatch(setSelectedCommentId(id)); // Dispatch action to set the selected comment ID
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search code dweets..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map(result => (
            <li key={result.id} data-id={result.id} onClick={() => handleResultClick(result.id)}>
              {result.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSearch;
