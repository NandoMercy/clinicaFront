document.addEventListener("submit", function (event) {
  event.preventDefault();

  const url = "http://localhost:8081/odontologos/";

  var odontologoMatricula = document.getElementById(
    "inputOdontologoMatricula"
  ).value;

  const odontologoInfo = document.getElementById("odontologoInfoMatricula");
  odontologoInfo.innerHTML = "";

  buscarOdontologoPorMatricula(odontologoMatricula);

  function buscarOdontologoPorMatricula(odontologoMatricula) {
    fetch(url + odontologoMatricula, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((odontologo) => {
        renderizarInfo(odontologo);
      })
      .catch((error) => {
        console.error("Error al buscar odontólogo:", error);
      });
  }

  function renderizarInfo(odontologo) {
    const odontologoInfoMatricula = document.getElementById(
      "odontologoInfoMatricula"
    );
    const tabla = document.createElement("table");
    const encabezado = document.createElement("tr");
    encabezado.innerHTML = `
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Matrícula</th>
    `;
    tabla.appendChild(encabezado);

    odontologo.forEach((odontologo) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
            <td>${odontologo.nombre}</td>
            <td>${odontologo.apellido}</td>
            <td>${odontologo.matricula}</td>
        `;
      tabla.appendChild(fila);
    });

    odontologoInfoMatricula.appendChild(tabla);
  }
});
