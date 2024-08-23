//El mismo código pero está hecho con foreach y textcontent
////////Read method: GET URL: http://localhost:8000/movies

// const container = document.getElementById('movies-container');

// async function getMovies() {
//   //fetch le pasamos dos parametros ("url", objeto{})
//   const response = await fetch(`http://localhost:8000/movies`, {
//     method: "GET", //importante que sea en mayúscula
//     headers: { 'Content-Type': 'application/json' }
//   })
//   const data = await response.json()
//   return data
// }

// async function printMovies() {
//   const data = await getMovies();
//   data.forEach(movie => {
//     const elementMovie = document.createElement('div');
//     const buttonDelete = document.createElement('button')
//     const buttonUpdate = document.createElement('button')
//     elementMovie.textContent = `Título: ${movie.name}, Género: ${movie.gender}, Director: ${movie.director}, Fecha de lanzamiento: ${movie['releaseDate']},`;
//     buttonDelete.textContent = 'Delete';
//     buttonDelete.classList.add("buttonDelete")
//     buttonUpdate.textContent = 'Update'
//     buttonUpdate.classList.add("buttonUpdate")
//     container.appendChild(elementMovie);
//     container.appendChild(buttonDelete);
//     container.appendChild(buttonUpdate);
//     buttonDelete.addEventListener("click", function () {
//       deleteMovies(movie.id, elementMovie, buttonDelete);
//     });
//     buttonUpdate.addEventListener("click", () => {
//       updateMovies(movie.id)
//     })
//   })
// }

// /////////Delete method: DELETE URL: http://localhost:8000/movies/id

// async function deleteMovies(id, elementMovie, buttonDelete) {
//   const response = await fetch(`http://localhost:8000/movies/${id}`, { //IMPORTANTE las comillas deben ser las invertidas, para poder concatenar el id
//     method: "DELETE", //importante que sea en mayúscula
//     headers: { 'Content-Type': 'application/json' }
//   })
//   if (response.ok) {
//     // Eliminar los elementos del DOM si la solicitud DELETE fue exitosa
//     elementMovie.remove();
//     buttonDelete.remove();
//   } else {
//     console.error("Error al eliminar la película");
//   }
// }

// printMovies();


// /////////Create method: POST URL: http://localhost:8000/movies

// const addButton = document.getElementById("buttonAddMovie")

// async function createMovies() {
//   let nameMovie = prompt("Ingrese el nombre de la película")
//   let genderMovie = prompt("Ingrese el género(Biografia, Aventura, Fantasía, Acción, etc)")
//   let directorMovie = prompt("Ingrese el nombre de la mente maestra que dirigue la película")
//   let releaseMovie = prompt("En que año se ha lanzado la película??")

//   const response = await fetch(`http://localhost:8000/movies`, {
//     method: "POST", //importante que sea en mayúscula
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: nameMovie,
//       gender: genderMovie,
//       director: directorMovie,
//       releaseDate: releaseMovie
//     })
//   })
//   const data = await response.json();
// }

// addButton.addEventListener('click', () => {
//   createMovies()
// })

// //////Update method: PUT URL: http://localhost:8000/movies/id

// async function updateMovies(id) {
//   let nameMovie = prompt("Ingrese el nombre de la película")
//   let genderMovie = prompt("Ingrese el género(Biografia, Aventura, Fantasía, Acción, etc)")
//   let directorMovie = prompt("Ingrese el nombre de la mente maestra que dirigue la película")
//   let releaseMovie = prompt("En que año se ha lanzado la película??")

//   const response = await fetch(`http://localhost:8000/movies/${id}`, {
//     method: "PUT",
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: nameMovie,
//       gender: genderMovie,
//       director: directorMovie,
//       releaseDate: releaseMovie
//     })
//   })
//   const data = await response.json()
// }


//El mismo código pero está hecho con Map e innerHtml

const container = document.getElementById('movies-container');

async function getMovies() {
  const response = await fetch(`http://localhost:8000/movies`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
}

async function printMovies() {
  const data = await getMovies();
  // Crear el HTML usando map y luego unirlo en un solo string
  const moviesHTML = data.map(movie => {
    return `
      <div class="movie" id="movie-${movie.id}">
        Título: ${movie.name}, Género: ${movie.gender}, Director: ${movie.director}, Fecha de lanzamiento: ${movie['releaseDate']}
        <button class="buttonDelete" onclick="deleteMovies(${movie.id})">Delete</button>
        <button class="buttonUpdate" onclick="updateMovies(${movie.id})">Update</button>
      </div>
    `;
  }).join(""); // Unir todos los elementos en un solo string
  container.innerHTML = moviesHTML; // Asignar el HTML generado al contenedor
}

async function deleteMovies(id) {
  const response = await fetch(`http://localhost:8000/movies/${id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    // const movieElement = document.getElementById(`movie-${id}`);
    // movieElement.remove(); // Eliminar el elemento directamente usando su ID
  } else {
    console.error("Error al eliminar la película");
  }
}

printMovies();

const addButton = document.getElementById("buttonAddMovie");

async function createMovies() {
  let nameMovie = prompt("Ingrese el nombre de la película");
  let genderMovie = prompt("Ingrese el género(Biografía, Aventura, Fantasía, Acción, etc)");
  let directorMovie = prompt("Ingrese el nombre del director");
  let releaseMovie = prompt("¿En qué año se ha lanzado la película?");

  const response = await fetch(`http://localhost:8000/movies`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameMovie,
      gender: genderMovie,
      director: directorMovie,
      releaseDate: releaseMovie
    })
  });
  const data = await response.json();
  return data
  printMovies(); // 
}

addButton.addEventListener('click', () => {
  createMovies();
});

async function updateMovies(id) {
  let nameMovie = prompt("Ingrese el nombre de la película");
  let genderMovie = prompt("Ingrese el género(Biografía, Aventura, Fantasía, Acción, etc)");
  let directorMovie = prompt("Ingrese el nombre del director");
  let releaseMovie = prompt("¿En qué año se ha lanzado la película?");

  const response = await fetch(`http://localhost:8000/movies/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameMovie,
      gender: genderMovie,
      director: directorMovie,
      releaseDate: releaseMovie
    })
  });
  const data = await response.json();
  return data
  printMovies(); 
}

//Hacer servicio de obtener una movie
