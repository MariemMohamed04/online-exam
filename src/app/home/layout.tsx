// /app/home/layout.tsx
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="custom-home-layout">
      <header className="header">
        <h1>Welcome to My Custom Home Page</h1>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeLayout;
