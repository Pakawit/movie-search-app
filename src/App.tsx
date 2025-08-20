import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState("");

  const API_KEY = "38d319c8"; 

  const searchMovies = async () => {
    try {
      setError("");
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await res.json();

      if (data.Response === "False") {
        setError(data.Error || "ไม่พบผลการค้นหา");
        setMovies([]);
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🎬 Movie Search App</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ค้นหาหนัง เช่น Avengers"
      />
      <button onClick={searchMovies}>ค้นหา</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/200x300"
              }
              alt={movie.Title}
              width="200"
            />
            <h3>{movie.Title}</h3>
            <p>📅 {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;