import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";

export default function Home() {

  return (
    <div className="">
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Más Recientes" />
      
        <MovieList title="Películas" category="movie" />

        <MovieList title="Series" category="series" />
      </div>
    </div>
    )
}
