import { useEffect, useState } from "react"; // Ensure useState is imported
import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./components/MovieCard";

const API_URL = 'http://www.omdbapi.com/?apikey=6cd3ca8';

// movie_1 is a static example, not used in the app logic, can be removed if not needed for other purposes
const movie_1 = {
    "Title": "Spiderman",
    "Year": "2010",
    "imdbID": "tt1785572",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {
    // State to store the list of movies fetched from the API
    const [movies, setMovies] = useState([]);
    // State to store the current value of the search input field
    const [searchTerm, setSearchTerm] = useState(''); // Initialized to empty string

    // Function to fetch movies from the OMDb API
    const searchMovies = async (title) => { // Renamed searchTitle to title for clarity
        if (!title) {
            console.error('Search title is required');
            setMovies([]); // Clear movies if search term is empty
            return;
        }

        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();

            console.log("API Response:", data); // Log the full response for debugging

            // Check if the API returned a 'Search' array (successful results)
            if (data.Search) {
                setMovies(data.Search); // Update movies state with the fetched array
            } else {
                // If no 'Search' array, it means no results or an API error
                setMovies([]); // Clear movies state
                console.log("No movies found or API error:", data.Error || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            setMovies([]); // Clear movies on fetch error
        }
    }

    // useEffect to perform an initial search when the component mounts
    useEffect(() => {
        // Perform an initial search for a specific movie
        // You can change 'Spiderman' to any movie title you want to load initially
      searchMovies('batman');
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    // Update searchTerm state as the user types
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search for Movies"
                    // Input value is controlled by the searchTerm state
                    value={searchTerm}
                    type="text"
                    // Optional: Trigger search on Enter key press
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            searchMovies(searchTerm);
                        }
                    }}
                />
                {/* Click event to trigger movie search */}
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} // Call searchMovies with the current searchTerm
                />
            </div>

            {/* Conditional rendering based on whether movies array has content */}
            {movies.length > 0 ? (
                <div className="container">
                    {/* Map over the movies array and render a MovieCard for each movie */}
                    {movies.map((movie) => (
                        // Use imdbID as a unique key for each MovieCard
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : (
                // Display "No movies found" message if movies array is empty
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App;