import React from "react";

export default function MovieCard({movie}) {

    return (
        <div className="movie">
          <div>{movie.Year}</div>
          <div>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : 'www://via.placeholder.com/400'
              }
            />
          </div>
          <div >
            <span>{movie.Type}</span>
            <h3>{movie.Title}</h3>
            </div>
           </div>
            )
        }