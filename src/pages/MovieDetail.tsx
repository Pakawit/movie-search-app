import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "38d319c8";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
      );
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>กำลังโหลด...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ กลับไปหน้าหลัก</Link>
      <h1>{movie.Title}</h1>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}
        alt={movie.Title}
        width="300"
      />
      <p>📅 ปี: {movie.Year}</p>
      <p>🎭 ประเภท: {movie.Genre}</p>
      <p>🎬 ผู้กำกับ: {movie.Director}</p>
      <p>⭐ คะแนน: {movie.imdbRating}</p>
      <p>📝 เรื่องย่อ: {movie.Plot}</p>
    </div>
  );
}

export default MovieDetail;