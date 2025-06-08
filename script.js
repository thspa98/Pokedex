function obtenerPokemon() {
  const busqueda = document.getElementById('busqueda').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;

  fetch(url)
    .then(respuesta => {
      if (!respuesta.ok) throw new Error('Pokémon no encontrado');
      return respuesta.json();
    })
    .then(datos => {
      const tarjeta = document.getElementById('tarjeta-pokemon');
      tarjeta.classList.remove('oculto');

      document.getElementById('nombre').textContent = capitalizar(datos.name);
      document.getElementById('tipo').textContent = `Tipo: ${datos.types.map(t => traducirTipo(t.type.name)).join(', ')}`;
      document.getElementById('imagen').src = datos.sprites.front_default;

      const detalles = [
        `Altura: ${datos.height / 10} m`,
        `Peso: ${datos.weight / 10} kg`,
        `Experiencia base: ${datos.base_experience}`,
        `Habilidad principal: ${datos.abilities[0].ability.name}`,
        `Número en la Pokédex: ${datos.id}`,
        `Estadísticas:`,
        ...datos.stats.map(stat => `${traducirEstadistica(stat.stat.name)}: ${stat.base_stat}`),
        `Movimientos: ${datos.moves.slice(0, 3).map(m => m.move.name).join(', ')}`
      ];

      const ul = document.getElementById('detalles');
      ul.innerHTML = "";
      detalles.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
    })
    .catch(error => {
      alert(error.message);
      document.getElementById('tarjeta-pokemon').classList.add('oculto');
    });
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function traducirTipo(tipo) {
  const tipos = {
    normal: "Normal", fire: "Fuego", water: "Agua", grass: "Planta", electric: "Eléctrico",
    ice: "Hielo", fighting: "Lucha", poison: "Veneno", ground: "Tierra", flying: "Volador",
    psychic: "Psíquico", bug: "Bicho", rock: "Roca", ghost: "Fantasma", dragon: "Dragón",
    dark: "Siniestro", steel: "Acero", fairy: "Hada"
  };
  return tipos[tipo] || tipo;
}

function traducirEstadistica(nombre) {
  const estadisticas = {
    hp: "PS",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Ataque especial",
    "special-defense": "Defensa especial",
    speed: "Velocidad"
  };
  return estadisticas[nombre] || capitalizar(nombre);
}

document.getElementById("busqueda").addEventListener("keyup", function(evento) {
  if (evento.key === "Enter") {
    obtenerPokemon();
  }
});
