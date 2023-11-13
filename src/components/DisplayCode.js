import React, { useState, useEffect } from 'react';

const FrameRenderer = ({ content }) => {
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setSrcDoc(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [content]);

  return (
    <div className='codeViewer' style={{
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' // Adjusted box shadow
      }}>
      <iframe src={srcDoc} title="Frame Renderer" width="100%" height="200px"  style={{border: "none"}}/>
    </div>
  );
};

export default FrameRenderer;
