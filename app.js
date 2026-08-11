// La Estanteria - logica principal

let discos = [];

function parseCSV(texto) {
  const lineas = texto.split(/\r?\n/).filter(l => l.trim().length > 0);
  const cabecera = splitCSVLine(lineas[0]);
  const filas = lineas.slice(1).map(linea => {
    const valores = splitCSVLine(linea);
    const obj = {};
    cabecera.forEach((clave, i) => {
      obj[clave.trim()] = (valores[i] || "").trim();
    });
    return obj;
  });
  return filas;
}

function splitCSVLine(linea) {
  const resultado = [];
  let actual = "";
  let dentroComillas = false;
  for (let i = 0; i < linea.length; i++) {
    const c = linea[i];
    if (c === '"') {
      dentroComillas = !dentroComillas;
    } else if (c === ',' && !dentroComillas) {
      resultado.push(actual);
      actual = "";
    } else {
      actual += c;
    }
  }
  resultado.push(actual);
  return resultado;
}

function normalizarFila(fila) {
  return {
    id: fila.id || (fila.artista + "-" + fila.album).toLowerCase().replace(/\s+/g, "-"),
    artista: fila.artista || "",
    album: fila.album || "",
    anio: fila.anio || fila["año"] || "",
    formato: fila.formato || "Vinilo",
    genero: fila.genero || "",
    portada: fila.portada || fila.portada_url || "",
    youtube: fila.youtube || fila.youtube_music_url || "",
    estado: fila.estado || "",
    edicion: fila.edicion || "",
    notas: fila.notas || "",
    favorito: fila.favorito || "No",
    balda: fila.balda || fila.seccion || fila.genero || "Coleccion"
  };
}

function cargarDatos() {
  if (CONFIG.csvUrl && CONFIG.csvUrl.trim().length > 0) {
    fetch(CONFIG.csvUrl)
      .then(res => res.text())
      .then(texto => {
        const filas = parseCSV(texto);
        discos = filas.map(normalizarFila).filter(d => d.artista && d.album);
        iniciar();
      })
      .catch(err => {
        console.error("No se pudo cargar el Sheet, usando datos de ejemplo.", err);
        discos = DATOS_EJEMPLO.map(normalizarFila);
        iniciar();
      });
  } else {
    discos = DATOS_EJEMPLO.map(normalizarFila);
    iniciar();
  }
}

function claseFormato(formato) {
  const f = (formato || "").toLowerCase();
  if (f.includes("cd")) return "formato-cd";
  if (f.includes("cass") || f.includes("cinta")) return "formato-cassette";
  return "formato-vinilo";
}

function colorLomo(disco) {
  const paleta = ["#7a3b2e", "#5c4326", "#3d5a4c", "#4a3b5c", "#6b5327", "#2f4858", "#7a4a20", "#5a2e3d"];
  const base = (disco.genero || disco.balda || disco.artista || "x");
  let hash = 0;
  for (let i = 0; i < base.length; i++) hash = (hash * 31 + base.charCodeAt(i)) % paleta.length;
  return paleta[Math.abs(hash) % paleta.length];
}

function agruparPorBalda(lista) {
  const grupos = {};
  lista.forEach(disco => {
    const clave = disco.balda || "Coleccion";
    if (!grupos[clave]) grupos[clave] = [];
    grupos[clave].push(disco);
  });
  return grupos;
}

function pintarEstanteria(lista) {
  const cont = document.getElementById("estanteria");
  cont.innerHTML = "";

  if (lista.length === 0) {
    cont.innerHTML = '<p class="vacio">No hay discos que coincidan con la busqueda.</p>';
    return;
  }

  const grupos = agruparPorBalda(lista);

  Object.keys(grupos).sort().forEach(nombreBalda => {
    const balda = document.createElement("section");
    balda.className = "balda";

    const titulo = document.createElement("h2");
    titulo.className = "balda-titulo";
    titulo.textContent = nombreBalda;
    balda.appendChild(titulo);

    const filaLomos = document.createElement("div");
    filaLomos.className = "lomos";

    grupos[nombreBalda].forEach(disco => {
      const lomo = document.createElement("div");
      lomo.className = "lomo " + claseFormato(disco.formato);
      lomo.style.background = colorLomo(disco);
      lomo.title = disco.artista + " - " + disco.album;

      const texto = document.createElement("span");
      texto.className = "lomo-texto";
      texto.textContent = disco.artista + " - " + disco.album;
      lomo.appendChild(texto);

      lomo.addEventListener("click", () => abrirFicha(disco));
      filaLomos.appendChild(lomo);
    });

    balda.appendChild(filaLomos);
    cont.appendChild(balda);
  });
}

function abrirFicha(disco) {
  document.getElementById("fichaAlbum").textContent = disco.album;
  document.getElementById("fichaArtista").textContent = disco.artista;
  document.getElementById("fichaMeta").textContent = [disco.formato, disco.anio, disco.genero].filter(Boolean).join(" · ");
  document.getElementById("fichaEstado").textContent = [disco.estado, disco.edicion].filter(Boolean).join(" · ");
  document.getElementById("fichaNotas").textContent = disco.notas || "";

  const img = document.getElementById("fichaPortada");
  if (disco.portada) {
    img.src = disco.portada;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  const enlace = document.getElementById("fichaYoutube");
  if (disco.youtube) {
    enlace.href = disco.youtube;
    enlace.style.display = "inline-block";
  } else {
    enlace.href = "https://music.youtube.com/search?q=" + encodeURIComponent(disco.artista + " " + disco.album);
    enlace.style.display = "inline-block";
  }

  document.getElementById("overlay").classList.remove("oculto");
}

function cerrarFicha() {
  document.getElementById("overlay").classList.add("oculto");
}

function rellenarGeneros() {
  const select = document.getElementById("filtroGenero");
  const generos = Array.from(new Set(discos.map(d => d.genero).filter(Boolean))).sort();
  generos.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    select.appendChild(opt);
  });
}

function aplicarFiltros() {
  const texto = document.getElementById("buscador").value.toLowerCase().trim();
  const formato = document.getElementById("filtroFormato").value;
  const genero = document.getElementById("filtroGenero").value;

  const filtrados = discos.filter(d => {
    const coincideTexto = !texto || (d.artista + " " + d.album).toLowerCase().includes(texto);
    const coincideFormato = !formato || d.formato === formato;
    const coincideGenero = !genero || d.genero === genero;
    return coincideTexto && coincideFormato && coincideGenero;
  });

  pintarEstanteria(filtrados);
}

function elegirAleatorio() {
  const texto = document.getElementById("buscador").value.toLowerCase().trim();
  const formato = document.getElementById("filtroFormato").value;
  const genero = document.getElementById("filtroGenero").value;

  const filtrados = discos.filter(d => {
    const coincideTexto = !texto || (d.artista + " " + d.album).toLowerCase().includes(texto);
    const coincideFormato = !formato || d.formato === formato;
    const coincideGenero = !genero || d.genero === genero;
    return coincideTexto && coincideFormato && coincideGenero;
  });

  if (filtrados.length === 0) {
    alert("No hay discos que coincidan con los filtros actuales.");
    return;
  }

  const elegido = filtrados[Math.floor(Math.random() * filtrados.length)];
  abrirFicha(elegido);
}

function iniciar() {
  rellenarGeneros();
  pintarEstanteria(discos);

  document.getElementById("buscador").addEventListener("input", aplicarFiltros);
  document.getElementById("filtroFormato").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroGenero").addEventListener("change", aplicarFiltros);
  document.getElementById("btnAleatorio").addEventListener("click", elegirAleatorio);
  document.getElementById("cerrarFicha").addEventListener("click", cerrarFicha);
  document.getElementById("overlay").addEventListener("click", (e) => {
    if (e.target.id === "overlay") cerrarFicha();
  });
}

document.addEventListener("DOMContentLoaded", cargarDatos);
