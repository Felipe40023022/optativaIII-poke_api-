// Base de datos simulada en memoria: los 151 Pokémon de la primera generación.
const nombres = [
    'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard',
    'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree',
    'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata',
    'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu',
    'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂',
    'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales',
    'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume',
    'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth',
    'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine',
    'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop',
    'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool',
    'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke',
    'Slowbro', 'Magnemite', 'Magneton', 'Farfetchd', 'Doduo', 'Dodrio', 'Seel',
    'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter',
    'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb',
    'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee',
    'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey',
    'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu',
    'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir',
    'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon',
    'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops',
    'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair',
    'Dragonite', 'Mewtwo', 'Mew'
];

// Estadísticas base de la primera generación: PS, ataque, defensa, especial, velocidad.
const estadisticasBase = [
    [45,49,49,65,45],[60,62,63,80,60],[80,82,83,100,80],[39,52,43,50,65],
    [58,64,58,65,80],[78,84,78,85,100],[44,48,65,50,43],[59,63,80,65,58],
    [79,83,100,85,78],[45,30,35,20,45],[50,20,55,25,30],[60,45,50,80,70],
    [40,35,30,20,50],[45,25,50,25,35],[65,90,40,45,75],[40,45,40,35,56],
    [63,60,55,50,71],[83,80,75,70,91],[30,56,35,25,72],[55,81,60,50,97],
    [40,60,30,31,70],[65,90,65,61,100],[35,60,44,40,55],[60,85,69,65,80],
    [35,55,40,50,90],[60,90,55,90,100],[50,75,85,30,40],[75,100,110,55,65],
    [55,47,52,40,41],[70,62,67,55,56],[90,92,87,75,76],[46,57,40,40,50],
    [61,72,57,55,65],[81,92,77,85,85],[70,45,48,60,35],[95,70,73,85,60],
    [38,41,40,65,65],[73,76,75,100,100],[115,45,20,25,20],[140,70,45,85,45],
    [40,45,35,40,55],[75,80,70,75,90],[45,50,55,75,30],[60,65,70,85,40],
    [75,80,85,100,50],[35,70,55,45,25],[60,95,80,60,30],[60,55,50,40,45],
    [70,65,60,90,90],[10,55,25,35,95],[35,80,50,50,120],[40,45,35,40,90],
    [65,70,60,65,115],[50,52,48,50,55],[80,82,78,80,85],[40,80,35,35,70],
    [65,105,60,60,95],[55,70,45,50,60],[90,110,80,80,95],[40,50,40,40,90],
    [65,65,65,50,90],[90,85,95,70,70],[25,20,15,105,90],[40,35,30,120,105],
    [55,50,45,135,120],[70,80,50,35,35],[80,100,70,50,45],[90,130,80,65,55],
    [50,75,35,70,40],[65,90,50,85,55],[80,105,65,100,70],[40,40,35,100,70],
    [65,70,65,100,70],[80,105,65,120,70],[40,80,100,30,20],[55,95,115,45,35],
    [80,110,130,55,45],[50,85,55,65,90],[65,100,70,80,105],[90,65,65,40,15],
    [95,75,110,80,30],[25,35,70,95,45],[50,60,95,120,70],[52,65,55,58,60],
    [35,45,160,100,70],[60,48,45,90,42],[80,80,50,100,70],[40,40,40,100,20],
    [70,80,50,100,45],[90,95,95,125,70],[30,80,50,35,70],[60,105,60,60,95],
    [40,45,35,40,56],[80,70,65,80,70],[30,65,100,45,40],[50,95,180,85,70],
    [30,35,30,100,80],[45,50,45,115,95],[35,45,160,30,70],[55,70,45,70,85],
    [40,30,50,100,30],[60,50,70,120,70],[35,45,160,100,70],[60,50,100,100,65],
    [60,95,95,45,35],[80,120,65,55,45],[30,105,90,50,25],[55,95,115,55,45],
    [65,125,100,55,85],[35,45,35,35,35],[60,110,105,65,45],[80,105,65,60,130],
    [55,50,45,80,40],[95,95,95,125,55],[40,40,35,100,70],[80,70,65,100,80],
    [80,82,83,100,80],[90,85,100,85,65],[55,70,45,70,85],[75,95,125,95,45],
    [65,55,115,100,60],[70,80,70,95,70],[60,65,60,130,110],[40,45,55,40,70],
    [80,105,65,100,80],[80,105,100,60,45],[40,45,65,100,90],[80,80,90,100,55],
    [80,70,65,100,100],[30,45,55,70,85],[60,75,85,100,115],[40,45,65,100,90],
    [70,110,80,55,105],[65,50,35,95,95],[65,95,57,100,93],[75,85,95,125,95],
    [20,10,55,20,80],[95,125,79,100,81],[130,85,80,95,60],[48,48,48,48,48],
    [55,55,50,65,55],[130,65,60,110,65],[65,65,60,130,110],[65,65,60,95,130],
    [65,130,60,110,65],[65,60,70,75,40],[35,40,100,90,35],[70,60,125,115,55],
    [30,80,90,45,55],[60,115,105,70,80],[80,105,65,60,130],[200,100,65,65,30],
    [90,85,100,125,85],[90,90,85,125,100],[90,100,90,125,90],[41,64,45,50,50],
    [61,84,65,70,70],[91,134,95,100,80],[106,110,90,154,130],[100,100,100,100,100]
];

const pokemons = nombres.map((nombre, index) => {
    const [ps, ataque, defensa, especial, velocidad] = estadisticasBase[index];
    return {
        id: index + 1,
        nombre,
        foto: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        estadisticas: {
            ps,
            ataque,
            defensa,
            ataque_especial: especial,
            defensa_especial: especial,
            velocidad
        }
    };
});

module.exports = { pokemons };