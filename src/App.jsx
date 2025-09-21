import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import loaderGif from "./assets/loader.gif";

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async (query) => {
    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found!");
      }
      const data = await response.json();

      const speciesResponse = await fetch(data.species.url);
      if (!speciesResponse.ok) {
        throw new Error("Could not fetch Pokémon species details.");
      }
      const speciesData = await speciesResponse.json();

      const combinedData = {
        ...data,
        species: speciesData,
      };

      setPokemon(combinedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen font-sans text-white p-4 flex flex-col items-center transition-all duration-500 ${
        !pokemon && !loading && !error ? "justify-center" : "pt-8"
      }`}
    >
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1
            className="text-5xl font-bold tracking-wider text-yellow-400"
            style={{ textShadow: "2px 2px 4px #000000" }}
          >
            Pokédex
          </h1>
          <p className="text-gray-300 mt-2">
            Search for your favorite Pokémon by name or ID
          </p>
        </header>
        <SearchBar onSearch={fetchPokemon} />
      </div>

      {/* **THE FIX IS HERE**: 
          We now wrap the entire <main> element in a condition.
          It will only be rendered to the page if we are loading, have an error, or have a Pokémon to show.
          This prevents an empty <main> block from pushing the search bar up.
      */}
      {(loading || error || pokemon) && (
        <main className="w-full flex-grow flex items-center justify-center p-4">
          {loading && (
            <img src={loaderGif} alt="Loading..." className="w-24 h-24" />
          )}
          {error && (
            <p className="text-red-400 text-2xl bg-red-900/50 p-4 rounded-lg">
              {error}
            </p>
          )}
          {pokemon && <PokemonCard pokemon={pokemon} />}
        </main>
      )}

      {pokemon && (
        <footer className="text-center text-gray-400 mt-8 mb-4">
          <p>
            Powered by the{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-400"
            >
              PokéAPI
            </a>
          </p>
        </footer>
      )}
    </div>
  );
};

export default App;
