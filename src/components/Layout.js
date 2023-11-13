import React from 'react';
// import Search from './DisplayCommentThreadFromSearch'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main className="layout-content">
        {children}
      </main>
      <footer className="layout-footer">
        {/* Footer content goes here */}
        <p>you can learn more about me <a href="https://github.com/cre8ture">at my Github</a></p>
      </footer>
    </div>
  );
};

export default Layout;
