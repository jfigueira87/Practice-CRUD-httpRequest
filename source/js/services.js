const container = document.getElementById('movies-container');
const containerForm = document.getElementById('form');
const URL_API = `http://localhost:8000/movies`

/////////Read method: GET URL: http://localhost:8000/movies//////////

async function getMovies() {
  const response = await fetch(URL_API, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
}

//Servicio para obtener una película por ID

async function getOneMovie(id) {
  const response = await fetch(`${URL_API}/${id}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  console.log(data)

  return data;
}

async function printMovies() {
  const data = await getMovies();
  // Crear el HTML usando map y luego unirlo en un solo string
  const moviesHTML = data.map(movie => {
    return `
      <div class="cardMovie">
        <div class="movie" id="movie-${movie.id}">
          Título: ${movie.name}<br> Género: ${movie.gender}<br> Director: ${movie.director}<br> Fecha de lanzamiento: ${movie['releaseDate']}<br>
        </div>  
        <div class="buttonsMovie">
          <button class="btn btn-red" onclick="deleteMovies('${movie.id}')">Delete</button>
          <button class="btn" onclick="ShowUpdateMovie('${movie.id}')">Update</button>
        </div>
      </div>
    `;
  }).join(""); // Unir todos los elementos en un solo string
  container.innerHTML = moviesHTML; // Asignar el HTML generado al contenedor
}
printMovies();

/////////Delete method: DELETE //////////////////

async function deleteMovies(id) {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      printMovies();  // Actualiza la lista si es exitoso
    } else {
      console.error("Error al eliminar la película");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}


//deleteMovies("efa3");

//Función para quitar el formulario de la pantalla y desactivar el Overlay
function closeUpdateForm(){
  containerForm.innerHTML=""
  document.getElementById('overlay').style.display = 'none';
}

///////////Método Create, POST//////////////////

async function showCreateMovies() {
  document.getElementById('overlay').style.display = 'block';
  containerForm.innerHTML = `
  <div class="containerForm">
    <form action="">
        <label for="mName">Nombre:</label><br>
        <input type="text" id="mName" name="mName"><br>
        
        <label for="mGender">Género:</label><br>
        <input type="text" id="mGender" name="mGender"><br>
        
        <label for="mRelease">Año de lanzamiento:</label><br>
        <input type="number" id="mRelease" name="mRelease"><br>
        
        <label for="mDirector">Director:</label><br>
        <input type="text" id="mDirector" name="mDirector"><br>  
    </form>
  </div>
  <div class="containerButtons">
    <button class="btn" onclick="createMovie()">Crear</button>
    <button class="btn btn-red" onclick= "closeUpdateForm()">Cancelar</button>
  </div>
  `;
}

async function createMovie() {

  const mName = document.getElementById('mName').value;
  const mGender = document.getElementById('mGender').value;
  const mRelease = document.getElementById('mRelease').value;
  const mDirector = document.getElementById('mDirector').value;


  const response = await fetch(URL_API, {

    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: mName,
      gender: mGender,
      releaseDate: mRelease,
      director: mDirector,

    })
  });
  const data = await response.json();
  printMovies();
  closeUpdateForm();
  return data
}

const addButton = document.getElementById("buttonAddMovie");
addButton.addEventListener('click', () => {
  showCreateMovies()
})


/////////Método Update, PUT///////////////////

async function ShowUpdateMovie(id) {
  const elementDbMovie = await getOneMovie(id);
  document.getElementById('overlay').style.display = 'block';
  containerForm.innerHTML = `
    <div class="containerForm">
      <form action="">
        <label for="mName">Nombre:</label><br>
        <input type="text" id="mName" name="mName" value="${elementDbMovie.name}"><br>
        
        <label for="mGender">Género:</label><br>
        <input type="text" id="mGender" name="mGender" value="${elementDbMovie.gender}"><br>
        
        <label for="mRelease">Año de lanzamiento:</label><br>
        <input type="number" id="mRelease" name="mRelease" value="${elementDbMovie.releaseDate}"><br>
        
        <label for="mDirector">Director:</label><br>
        <input type="text" id="mDirector" name="mDirector" value="${elementDbMovie.director}"><br>  
      </form>
    </div>
    <div class="containerButtons">
      <button class="btn" onclick="UpdateMovie(${elementDbMovie.id})">Guardar</button>
      <button class="btn btn-red" onclick= "closeUpdateForm()">Cancelar</button>
    </div>
  `;
}

async function UpdateMovie(id) {

  const mName = document.getElementById('mName').value;
  const mGender = document.getElementById('mGender').value;
  const mRelease = document.getElementById('mRelease').value;
  const mDirector = document.getElementById('mDirector').value;

  const response = await fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: mName,
      gender: mGender,
      releaseDate: mRelease,
      director: mDirector,

    })
  });
  const data = await response.json();
  printMovies();
  closeUpdateForm();
  return data

}
