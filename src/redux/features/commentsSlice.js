// src/redux/features/commentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: {
        'initial-html-comment': {
            id: 'initial-html-comment',
            parentId: null,
            text: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Simple Animation</title>
              <style>
                  #ball {
                      width: 50px;
                      height: 50px;
                      background-color: blue;
                      border-radius: 50%;
                      position: absolute;
                      top: 100px;
                  }
              </style>
          </head>
          <body>
          
          <div id="ball"></div>
          
          <script>
              const ball = document.getElementById('ball');
              let position = 0;
              let movingRight = true;
              const moveBall = () => {
                  if (position >= window.innerWidth - 50) {
                      movingRight = false;
                  } else if (position <= 0) {
                      movingRight = true;
                  }
          
                  if (movingRight) {
                      position += 5;
                  } else {
                      position -= 5;
                  }
                  
                  ball.style.left = position + 'px';
                  requestAnimationFrame(moveBall);
              };
              moveBall();
          </script>
          
          </body>
          </html>
          `,
            children: [
            ],


        },
       
    },
    selectedCommentId: null // New state for tracking the selected comment
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {

            console.log("monkey", initialState, state, action)
            const { id, parentId } = action.payload;
            state.comments[id] = { ...action.payload, children: [] };

            if (parentId !== null && state.comments[parentId]) {
                state.comments[parentId].children.push(id);
            }
        },
        deleteComment: (state, action) => {
            const recursiveDelete = (commentId) => {
                state.comments[commentId].children.forEach(childId => recursiveDelete(childId));
                delete state.comments[commentId];
            };

            recursiveDelete(action.payload);
        },
        editComment: (state, action) => {
            const { id } = action.payload;
            state.comments[id] = action.payload;
        },
        // New reducer to set the selected comment ID
        setSelectedCommentId: (state, action) => {
            state.selectedCommentId = action.payload;
        }
    }
});

export const { addComment, deleteComment, editComment, setSelectedCommentId } = commentsSlice.actions;

export default commentsSlice.reducer;
