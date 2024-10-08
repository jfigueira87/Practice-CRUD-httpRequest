const container = document.getElementById('movies-container');
const containerForm = document.getElementById('form');
const URL_API = `http://localhost:8000/movies`

/////////Read method: GET URL: http://localhost:8000/movies//////////

async function getMovies() {
  try {
    const response = await fetch(URL_API, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Error al obtener las películas');
    const data = await response.json();
    return data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al obtener las películas: ' + error.message,
      confirmButtonText: 'OK'
    });
  }
}

//Servicio para obtener una película por ID

async function getOneMovie(id) {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Error al obtener la película');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al obtener los detalles de la película: ' + error.message,
      confirmButtonText: 'OK'
    });
  }
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
          <button class="btn btn-red" onclick="confirmDelete('${movie.id}')">Delete</button>
          <button class="btn" onclick="ShowUpdateMovie('${movie.id}')">Update</button>
        </div>
      </div>
    `;
  }).join("");
  container.innerHTML = moviesHTML;
}
printMovies();

/////////Delete method: DELETE //////////////////

function confirmDelete(id) {
  Swal.fire({
    title: '¿Estás seguro que quieres eliminar?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4361ee',
    cancelButtonColor: '#d00000',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMovies(id);
    }
  });
}

// Método para eliminar la película con el fetch
async function deleteMovies(id) {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      printMovies();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar la película.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Error en la solicitud: ' + error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

//Función para quitar el formulario de la pantalla y desactivar el Overlay
function closeUpdateForm() {
  containerForm.innerHTML = ""
  document.getElementById('overlay').style.display = 'none';
}

///////////Método Create, POST//////////////////

function showCreateMovies() {
  document.getElementById('overlay').style.display = 'block';
  containerForm.innerHTML = `
  <div class="containerForm">
    <form action="">
        <label for="mName">Nombre:</label><br>
        <input type="text" id="mName" name="mName" required><br>

        <label for="mGender">Género:</label><br>
        <select id="mGender" name="mGender" required>
        <option value="" disabled selected>Selecciona un género</option>
        <option value="Drama">Drama</option>
        <option value="Comedia">Comedia</option>
        <option value="Terror">Terror</option>
        <option value="Acción">Acción</option>
        <option value="Aventura">Aventura</option>
        <option value="Suspenso">Suspenso</option>
        <option value="Ciencia ficción">Ciencia ficción</option>
        </select><br>

        <label for="mRelease">Año de lanzamiento:</label><br>
        <input list="years" type="text" pattern="\d+" inputmode="numeric" id="mRelease" name="mRelease" required><br>

        <label for="mDirector">Director:</label><br>
        <input type="text" id="mDirector" name="mDirector" required><br>

        <datalist id="years">
        </datalist>
    </form>
  </div>
  <div class="containerButtons">
    <button class="btn" onclick="createMovie()">Crear</button>
    <button class="btn btn-red" onclick= "closeUpdateForm()">Cancelar</button>
  </div>
  `;



  //Asignar un listado desplegable con los años desde 1895 hasta 2024
  const startYear = 1895; 
  const endYear = 2024; 
  const yearList = document.getElementById('years');

    for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement('option');
    option.value = year; 
    yearList.appendChild(option); 
  }
}

async function createMovie() {

  const mName = document.getElementById('mName').value;
  const mGender = document.getElementById('mGender').value;
  const mRelease = document.getElementById('mRelease').value;
  const mDirector = document.getElementById('mDirector').value;

  if (!mName || !mGender || !mRelease || !mDirector) {
    return Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Debe completar todos los campos',
      confirmButtonColor: '#4361ee',
      confirmButtonText: 'OK'
    });
  }

  if (!/^\d+$/.test(mRelease)) {
    // Si el valor no coincide con la expresión regular, muestra un mensaje de error o realiza alguna acción
    return Swal.fire({
      icon: 'warning',
      title: 'Año de lanzamiento incorrecto',
      text: 'Por favor ingresa solo números y que además sean positivos',
      confirmButtonColor: '#4361ee',
      confirmButtonText: 'OK'
    });
  }

    if (mRelease < 1895) {
    return Swal.fire({
      icon: 'warning',
      title: 'Año de lanzamiento erróneo',
      text: 'En ese año no se había creado ninguna película, no mientas ;)',
      confirmButtonColor: '#4361ee',
      confirmButtonText: 'OK'
    });
  }

  try {
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
    return data;

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al crear la película',
      confirmButtonText: 'OK'
    });
  }
}


const addButton = document.getElementById("buttonAddMovie");
addButton.addEventListener('click', () => {
  showCreateMovies()
})


/////////Método Update, PUT///////////////////

async function ShowUpdateMovie(id) {
  try {
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
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al obtener los detalles de la película: ' + error.message,
      confirmButtonText: 'OK'
    });
  }
}


async function UpdateMovie(id) {
  try {
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

    if (response.ok) {
      Swal.fire({
        title: 'Hecho',
        text: 'Se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      const data = await response.json();
      printMovies();
      closeUpdateForm();
      return data;
    } else {
      throw new Error('Error al actualizar la película');
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al actualizar la película: ' + error.message,
      confirmButtonText: 'OK'
    });
  }
}

