import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import NewsItem from './components/NewsItem';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Navbar/>
      <Routes>
        <Route  key="all" path="/" element={<NewsComponent pageSize={6} category={"all"} />}/>
        <Route  key="business" path="/business" element={<NewsComponent pageSize={6} category={"business"} />}/>
        <Route  key="football" path="/football" element={<NewsComponent pageSize={6} category={"football"} />}/>
        <Route  key="cricket" path="/cricket" element={<NewsComponent pageSize={6} category={"cricket"} />}/>
        <Route  key="fashion" path="/fashion" element={<NewsComponent pageSize={6} category={"fashion"} />}/>
      </Routes>
    </Router>
      </>
    );
  }
}
