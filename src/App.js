import React, { useState, useEffect } from 'react';
import Caard from './Caard';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState('Inception');

  useEffect(() => {
    searchMovies(term); // Trigger search on component mount with the default term
  }, []);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`/search?title=${title}`);
      const data = await response.json();
      setMovies(data.Search || []); // Handle the OMDB response
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      searchMovies(term);
    }
  };

  return (
    <div className="App">
      <div className="searchbox">
        <input
          type='text'
          id='search-box'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>
      {movies.length > 0 ? (
        <div className="card-container">
          {movies.map((movie, index) => (
            <Caard movie={movie} key={index} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
