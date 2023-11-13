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

        'unique-child-comment-id': {
            author: "Ki",
            id: 'unique-child-comment-id',
            parentId: 'initial-html-comment',
            text: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Spinning and Floating Rainbow Square</title>
                <style>
                    #square {
                        width: 100px;
                        height: 100px;
                        background-image: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet);
                        position: absolute;
                        border-radius: 10px;
                        animation: spin 2s linear infinite;
                    }
            
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                </style>
            </head>
            <body>
            <h1>Wow, Blue Ball flying! Check this out</h1>
            <div id="square"></div>
            
            <script>
                const square = document.getElementById('square');
                let x = 0, y = 0;
                let dx = 2, dy = 2;
            
                function moveSquare() {
                    const maxX = window.innerWidth - square.clientWidth;
                    const maxY = window.innerHeight - square.clientHeight;
            
                    x += dx;
                    y += dy;
            
                    if (x >= maxX || x <= 0) dx = -dx;
                    if (y >= maxY || y <= 0) dy = -dy;
            
                    square.style.left = x + 'px';
                    square.style.top = y + 'px';
            
                    requestAnimationFrame(moveSquare);
                }
            
                requestAnimationFrame(moveSquare);
            </script>
            
            </body>
            </html>
            `,
            children: [] // In case this child comment will also have its children
        }
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
