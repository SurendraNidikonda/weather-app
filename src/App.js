
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityTable from './components/CityTable';
import WeatherPage from './components/WeatherPage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={CityTable} />
        <Route path="/weather/:cityId" Component={WeatherPage} />
      </Routes>
    </Router>
  );
};

export default App;
