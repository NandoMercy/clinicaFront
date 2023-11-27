window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const nombre = document.querySelector("#inputNombre");
  const apellido = document.querySelector("#inputApellido");
  const matricula = document.querySelector("#inputMatricula");

  const url = "http://localhost:8081/odontologos/registrar";

  /* -------------------------------------------------------------------------- */
  /*            Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    //Cuerpo de la request
    const payload = {
      firstName: nombre.value,
      lastName: apellido.value,
      matricula: matricula.value,
    };

    //configuramos la request del Fetch
    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };
    //lanzamos la consulta de login a la API
    realizarRegister(settings);

    //limpio los campos del formulario
    form.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                    Realizar el registro [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    console.log("Lanzando la consulta a la API");
    fetch(url, settings)
      .then((response) => {
        console.log(response);

        // manejar el error de la request.
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log("Promesa cumplida:");
        console.log(data);
        console.log(data.jwt);

        if (data.jwt) {
          //guardo en LocalStorage el objeto con el token
          localStorage.setItem("jwt", JSON.stringify(data.jwt));

          //redireccionamos a la página
          location.replace("./index.html");
        }
      })
      .catch((err) => {
        console.warn("Promesa rechazada ");
        console.log(err);
        if (err.status == 400) {
          console.warn(
            "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto"
          );
          alert(
            "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto"
          );
        } else if (err.status == 500) {
          console.warn("Error del servidor");
          alert("Error del servidor");
        }
      });
  }
});
