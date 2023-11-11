import { useState, useEffect } from 'react';
import axios from 'axios';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import PlayButton from './PlayButton';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

const Billboard: React.FC = () => {
  interface Movie {
    id: string;
    title: string;
    description: string;
    poster: string;
  }
  
  const [randomMovie, setRandomMovie] = useState<Movie>({ id: '', title: '', description: '', poster: '' });

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setRandomMovie(response.data.random_movie);
      } catch (error) {
        console.error('Error al obtener una película aleatoria:', error);
      }
    };

    fetchRandomMovie();
  }, []);

  return (
    <div className="relative h-[56.25vw]">
      <video poster={randomMovie.poster} className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500" autoPlay muted loop src={'/movies/' + randomMovie.title + '.mp4'}></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {randomMovie.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {randomMovie.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={randomMovie?.id}/>
          <button
            onClick={() => {}}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
            >
              <InformationCircleIcon className="w-4 md:w-7 mr-1" />
              Más info
          </button>
        </div>
      </div>
    </div>
  )
}
export default Billboard;
