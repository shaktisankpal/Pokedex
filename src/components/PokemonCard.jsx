import React from "react";

// Card background colors based on type
const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-teal-300",
  fighting: "bg-orange-700",
  poison: "bg-purple-600",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-indigo-800",
  dragon: "bg-blue-800",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

// **NEW**: Stat-specific colors
const statColors = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-blue-500",
  "special-attack": "bg-purple-500",
  "special-defense": "bg-green-500",
  speed: "bg-pink-500",
};

// Component for rendering a single stat bar
const StatBar = ({ statName, statValue, color }) => {
  const barWidth = Math.min((statValue / 255) * 100, 100); // Max stat is 255
  return (
    <div className="flex items-center w-full">
      <p className="w-1/3 text-sm font-semibold capitalize text-right pr-4">
        {statName}
      </p>
      {/* **UPDATED**: The track is now a dark, semi-transparent black */}
      <div className="w-2/3 bg-black/20 rounded-full h-5">
        {/* **UPDATED**: The fill color is now passed in and is stat-specific */}
        <div
          className={`${color} h-5 rounded-full flex items-center justify-end pr-2`}
          style={{ width: `${barWidth}%` }}
        >
          <span
            className="text-xs font-bold text-white"
            style={{ textShadow: "1px 1px #000" }}
          >
            {statValue}
          </span>
        </div>
      </div>
    </div>
  );
};

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) return null;

  const primaryType = pokemon.types[0].type.name;
  const cardColor = typeColors[primaryType] || "bg-gray-500";

  // **NEW**: Extract new data (Genus and Flavor Text)
  const genus =
    pokemon.species.genera.find((g) => g.language.name === "en")?.genus ||
    "Unknown";

  // Find the first English flavor text, and clean it up
  const flavorText =
    pokemon.species.flavor_text_entries
      .find((e) => e.language.name === "en")
      ?.flavor_text.replace(/[\n\f]/g, " ") || "No description available.";

  return (
    // **UPDATED**: Card is wider (max-w-3xl)
    <div
      className={`w-full max-w-3xl mx-auto rounded-xl shadow-2xl p-6 md:p-8 text-white transform hover:scale-103 transition-transform duration-300 ease-in-out ${cardColor}`}
    >
      {/* Header: Name, ID, Genus, and Types */}
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold capitalize">
            {pokemon.name}
          </h1>
          {/* **NEW**: Genus */}
          <h2 className="text-2xl font-semibold opacity-90 mt-1">{genus}</h2>
          <div className="flex space-x-2 mt-3">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className={`px-4 py-1 text-base rounded-full shadow-md ${
                  typeColors[type.name] || "bg-gray-400"
                } border-2 border-white/50`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="text-3xl md:text-4xl font-bold opacity-80 mt-2 sm:mt-0">
          #{String(pokemon.id).padStart(3, "0")}
        </div>
      </div>

      {/* Main Content: Image and Stats */}
      <div className="flex flex-col md:flex-row my-6 items-center">
        {/* Image */}
        <div className="flex-shrink-0 w-1/2 md:w-2/5 flex justify-center p-4">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Stats */}
        <div className="w-full md:w-3/5 mt-6 md:mt-0 md:pl-6 space-y-3">
          <h3 className="text-2xl font-bold mb-3 border-b-2 border-white/50 pb-1">
            Base Stats
          </h3>
          {pokemon.stats.map((stat) => (
            <StatBar
              key={stat.stat.name}
              statName={stat.stat.name.replace("-", " ")}
              statValue={stat.base_stat}
              // **UPDATED**: Pass the stat-specific color
              color={statColors[stat.stat.name] || "bg-gray-400"}
            />
          ))}
        </div>
      </div>

      {/* **NEW**: Flavor Text Description */}
      <div className="bg-black/20 rounded-lg p-4 my-4">
        <h3 className="text-xl font-bold mb-2">Pokédex Entry</h3>
        <p className="text-base italic opacity-90">{flavorText}</p>
      </div>

      {/* **NEW**: Abilities Section */}
      <div className="bg-black/20 rounded-lg p-4 my-4">
        <h3 className="text-xl font-bold mb-2">Abilities</h3>
        <div className="flex flex-wrap gap-3">
          {pokemon.abilities.map(({ ability, is_hidden }) => (
            <span
              key={ability.name}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                is_hidden ? "bg-red-700" : "bg-gray-700"
              } capitalize`}
            >
              {ability.name.replace("-", " ")} {is_hidden && "(Hidden)"}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Physical Info (Updated to a grid) */}
      <div className="bg-black/20 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4">
        <div>
          <p className="text-sm opacity-80">Weight</p>
          <h4 className="font-bold text-lg">{pokemon.weight / 10} kg</h4>
        </div>
        <div>
          <p className="text-sm opacity-80">Height</p>
          <h4 className="font-bold text-lg">{pokemon.height / 10} m</h4>
        </div>
        {/* **NEW**: Base Experience */}
        <div>
          <p className="text-sm opacity-80">Base XP</p>
          <h4 className="font-bold text-lg">{pokemon.base_experience}</h4>
        </div>
        <div>
          <p className="text-sm opacity-80">Species</p>
          <h4 className="font-bold text-lg capitalize">
            {pokemon.species.name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
