import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import Navbar from "./components/Navbar";
import NewsComponent from "./components/NewsComponent";
import Footer from "./components/Footer";

const Layout = () => (
  <>
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </>
);

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <NewsComponent api={apiKey} category="all" pageSize={6} setProgress={setProgress} /> },
        { path: "/business", element: <NewsComponent api={apiKey} category="business" pageSize={6} setProgress={setProgress} /> },
        { path: "/cricket", element: <NewsComponent api={apiKey} category="cricket" pageSize={6} setProgress={setProgress} /> },
        { path: "/football", element: <NewsComponent api={apiKey} category="football" pageSize={6} setProgress={setProgress} /> },
        { path: "/fashion", element: <NewsComponent api={apiKey} category="fashion" pageSize={6} setProgress={setProgress} /> },
      ],
    },
  ]);

  return (
    <>
      <LoadingBar color="#e50914" progress={progress} height={3} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
