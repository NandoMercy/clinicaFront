window.addEventListener("load", function () {
  // Obtenemos variables globales
  const form = document.forms[0];
  const nombre = document.querySelector("#inputNombre");
  const apellido = document.querySelector("#inputApellido");
  const matricula = document.querySelector("#inputMatricula");

  const url = "http://localhost:8081/odontologos/registrar";

  // Escuchamos el submit y preparamos el envío
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Cuerpo de la request
    const payload = {
      nombre: nombre.value,
      apellido: apellido.value,
      matricula: matricula.value,
    };

    // Configuramos la request del Fetch
    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Lanzamos la consulta de registro a la API
    realizarRegistro(settings);

    // Limpiamos los campos del formulario
    form.reset();
  });

  // Realizar el registro [POST]
  function realizarRegistro(settings) {
    console.log("Lanzando la consulta a la API");
    fetch(url, settings)
      .then((response) => {
        console.log(response);

        // Manejar el error de la request.
        if (response.ok) return response.json();
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      })
      .then((data) => {
        console.log("Promesa cumplida:");
        console.log(data);
        console.log(data.jwt);

        if (data.jwt) {
          // Guardamos en LocalStorage el objeto con el token
          localStorage.setItem("jwt", JSON.stringify(data.jwt));

          // Redireccionamos a la página
          location.replace("./index.html");
        }
      })
      .catch((err) => {
        console.error("Promesa rechazada ");
        console.error(err);

        // Manejar diferentes tipos de errores
        if (err instanceof TypeError) {
          alert("Error de conexión. Verifica tu conexión a Internet.");
        } else if (err.status === 400) {
          console.warn("El usuario ya se encuentra registrado o algunos datos requeridos están incompletos");
          alert("El usuario ya se encuentra registrado o algunos datos requeridos están incompletos");
        } else if (err.status === 500) {
          console.error("Error del servidor");
          alert("Error del servidor");
        } else {
          alert("Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.");
        }
      });
  }
});