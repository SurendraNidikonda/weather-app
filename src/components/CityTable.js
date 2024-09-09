import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('name');
  const history = useNavigate();

  
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${searchTerm}&sort=${sort}&start=${page * 20}&rows=20`
        );
        setCities((prevCities) => [...prevCities, ...response.data.records]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, [page, searchTerm, sort]);

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCities([]);
    setPage(0);
  };

  
  const handleSort = (column) => {
    setSort(column);
    setCities([]);
    setPage(0);
  };

  
  const handleCityClick = (cityId) => {
    history.push(`/weather/${cityId}`);
  };

  return (
    <div>
      <input type="text" placeholder="Search City" onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>City Name</th>
            <th onClick={() => handleSort('country_name')}>Country</th>
            <th onClick={() => handleSort('timezone')}>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={index}>
              <td onClick={() => handleCityClick(city.fields.geoname_id)}>
                {city.fields.name}
              </td>
              <td>{city.fields.country_name}</td>
              <td>{city.fields.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading more cities...</p>}
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
};

export default CityTable;
