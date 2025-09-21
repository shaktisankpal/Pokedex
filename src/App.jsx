import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import loaderGif from "./assets/loader.gif";
// **NEW**: Import our utility function
import { getClosestMatch } from "./utils/stringSimilarity";

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  // **UPDATED**: Error state will now be an object
  const [error, setError] = useState(null);
  // **NEW**: State to hold all Pokémon names
  const [allPokemonNames, setAllPokemonNames] = useState([]);

  // **NEW**: useEffect to fetch all Pokémon names on initial app load
  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        // The PokéAPI has over 1300 Pokémon now, so we need a high limit.
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1302"
        );
        const data = await response.json();
        // We only need the names, so we map the results to an array of strings
        const names = data.results.map((p) => p.name);
        setAllPokemonNames(names);
      } catch (err) {
        console.error("Failed to fetch Pokémon list:", err);
      }
    };
    fetchAllPokemonNames();
  }, []); // Empty array ensures this runs only once on mount

  const fetchPokemon = async (query) => {
    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      if (!response.ok) {
        // Use a generic error for the throw, we'll handle suggestions in the catch block
        throw new Error("Not found");
      }
      const data = await response.json();
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      const combinedData = { ...data, species: speciesData };
      setPokemon(combinedData);
    } catch (err) {
      // **UPDATED**: Error handling logic
      const suggestion = getClosestMatch(query, allPokemonNames);
      if (suggestion) {
        setError({
          message: `Pokémon not found. Did you mean`,
          suggestion: suggestion,
        });
      } else {
        setError({ message: "Pokémon not found!", suggestion: null });
      }
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

      {(loading || error || pokemon) && (
        <main className="w-full flex-grow flex items-center justify-center p-4">
          {loading && (
            <img src={loaderGif} alt="Loading..." className="w-24 h-24" />
          )}

          {/* **UPDATED**: JSX for rendering the error and suggestion */}
          {error && (
            <div className="text-center text-red-400 text-xl bg-red-900/50 p-6 rounded-lg">
              <p className="font-semibold">{error.message}</p>
              {error.suggestion && (
                <button
                  onClick={() => fetchPokemon(error.suggestion)}
                  className="mt-2 text-2xl font-bold text-yellow-300 hover:text-yellow-400 capitalize transition-colors"
                >
                  {error.suggestion}?
                </button>
              )}
            </div>
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
