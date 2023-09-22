import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MoviesList = (props) => {
  const deleteMovieHandler= (id)=>{
    props.onDeleteMovie(id);
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <div
          key={movie.id}>
           <Movie 
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          
        />
        <button onClick={()=>deleteMovieHandler(movie.id)}>Delete</button>
        </div>
      ))}
    </ul>
  );
};

export default MoviesList;
