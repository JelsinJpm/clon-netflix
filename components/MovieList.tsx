import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { isEmpty } from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

interface MovieListProps {
  title: string;
  category?: 'all' | 'movie' | 'series';
}

interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string;
  duration: string
  genre: string
  category: 'movie' | 'series';
}

const MovieList: React.FC<MovieListProps> = ({ title, category = 'all' }) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        let filteredMovies = response.data.all_movies;

        if (category !== 'all') {
          // Filtrar por tipo si no es "all"
          filteredMovies = filteredMovies.filter((movie: Movie) => movie.category === category);
        }

        setAllMovies(filteredMovies);
      } catch (error) {
        console.error('Error al obtener películas:', error);
      }
    };

    fetchAllMovies();
  }, [category]);

  if (isEmpty(allMovies)) {
    return null;
  }

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <Slider {...settings}>
          {allMovies.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieList;