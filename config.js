// Configuracion de La Estanteria
// csvUrl: pega aqui la URL publicada como CSV de tu pestana de Google Sheets.
// Formato tipico:
// https://docs.google.com/spreadsheets/d/TU_ID/gviz/tq?tqx=out:csv&sheet=COLECCION
// Si csvUrl esta vacio, se usaran los discos de ejemplo (DATOS_EJEMPLO) mas abajo.

const CONFIG = {
        csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4G8zbkwARA27RiZl9gEH4ALSbIwzTiBfZNLkYRlvH7I1LfMn1IvpD8ClyeGs6NOsLP1PsthZRzJsi/pub?gid=0&single=true&output=csv",
  titulo: "La Estanteria"
};

const DATOS_EJEMPLO = [
  {
    id: "rush-moving-pictures",
    artista: "Rush",
    album: "Moving Pictures",
    anio: "1981",
    formato: "Vinilo",
    genero: "Progressive Rock",
    portada: "",
    youtube: "https://music.youtube.com/search?q=Rush%20Moving%20Pictures",
    estado: "Muy bueno",
    edicion: "Reedicion 180g",
    notas: "El disco que me metio de lleno en Rush.",
    favorito: "Si",
    balda: "Progresivo"
  },
  {
    id: "camaron-la-leyenda-del-tiempo",
    artista: "Camaron de la Isla",
    album: "La Leyenda del Tiempo",
    anio: "1979",
    formato: "Vinilo",
    genero: "Flamenco",
    portada: "",
    youtube: "https://music.youtube.com/search?q=Camaron+La+Leyenda+del+Tiempo",
    estado: "Bueno",
    edicion: "",
    notas: "Un disco que rompio moldes en su epoca.",
    favorito: "Si",
    balda: "Flamenco y raices"
  },
  {
    id: "the-offspring-smash",
    artista: "The Offspring",
    album: "Smash",
    anio: "1994",
    formato: "CD",
    genero: "Punk Rock",
    portada: "",
    youtube: "https://music.youtube.com/search?q=The+Offspring+Smash",
    estado: "Muy bueno",
    edicion: "",
    notas: "Uno de los CDs mas gastados de mi coleccion.",
    favorito: "No",
    balda: "Punk y alternativo"
  },
  {
    id: "leiva-nostalgico",
    artista: "Leiva",
    album: "Nostalgico",
    anio: "2016",
    formato: "Vinilo",
    genero: "Rock en espanol",
    portada: "",
    youtube: "https://music.youtube.com/search?q=Leiva+Nostalgico",
    estado: "Excelente",
    edicion: "",
    notas: "",
    favorito: "Si",
    balda: "Rock espanol"
  },
  {
    id: "grateful-dead-american-beauty",
    artista: "Grateful Dead",
    album: "American Beauty",
    anio: "1970",
    formato: "Vinilo",
    genero: "Rock",
    portada: "",
    youtube: "https://music.youtube.com/search?q=Grateful+Dead+American+Beauty",
    estado: "Bueno",
    edicion: "",
    notas: "",
    favorito: "No",
    balda: "Rock clasico"
  },
  {
    id: "carolina-durante-elige-tu-propia-aventura",
    artista: "Carolina Durante",
    album: "Elige tu Propia Aventura",
    anio: "2019",
    formato: "Cassette",
    genero: "Rock en espanol",
    portada: "",
    youtube: "https://music.youtube.com/search?q=Carolina+Durante+Elige+tu+propia+aventura",
    estado: "Nuevo",
    edicion: "Edicion limitada cassette",
    notas: "",
    favorito: "No",
    balda: "Rock espanol"
  }
];
