import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface MovieData {
  id: number;
  title: string;
  description: string;
  poster: string;
  genre: string;
  duration: string;
  category: string;
  year: string;
}

const MoviePage = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        if (movieId) {
          const response = await fetch(`http://localhost:5000/api/movies/${movieId}`);
          const data: MovieData = await response.json();
          setMovieData(data);
        }
      } catch (error) {
        console.error('Error al obtener datos de la película:', error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movieData) {
    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-3xl text-white">Cargando...</p>
        </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Viendo:</span> {movieData?.title}
        </p>
      </nav>
      <video className="h-full w-full" autoPlay controls src={'/movies/' + movieData?.title + '.mp4'}></video>
    </div>
  );
};

export default MoviePage;