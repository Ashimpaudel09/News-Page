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
  const [progress, setProgress] = useState(0);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <NewsComponent category="all" pageSize={6} setProgress={setProgress} /> },
        { path: "/business", element: <NewsComponent category="business" pageSize={6} setProgress={setProgress} /> },
        { path: "/entertainment", element: <NewsComponent category="entertainment" pageSize={6} setProgress={setProgress} /> },
        { path: "/sports", element: <NewsComponent category="sports" pageSize={6} setProgress={setProgress} /> },
        { path: "/technology", element: <NewsComponent category="technology" pageSize={6} setProgress={setProgress} /> },
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
