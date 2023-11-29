document.addEventListener("submit", function (event) {
  event.preventDefault();

  const url = "http://localhost:8081/odontologos/";

  var odontologoId = document.getElementById("inputOdontologoId").value;

  buscarOdontologoPorId(odontologoId);

  function buscarOdontologoPorId(odontologoId) {
    fetch(url + odontologoId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        renderizarInfo(data);
      })
      .catch((error) => {
        console.error("Error al buscar odontólogo:", error);
      });
  }

  function renderizarInfo(odontologos) {
    var odontologoInfoTabla = document.getElementById("odontologoInfo");
    odontologoInfoTabla.innerHTML = "";

    var tabla = document.createElement("table");
    var encabezado = document.createElement("tr");
    encabezado.innerHTML = `
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Matrícula</th>
    `;
    tabla.appendChild(encabezado);

    odontologos.forEach((odontologo) => {
      var fila = document.createElement("tr");
      fila.innerHTML = `
            <td>${odontologo.nombre}</td>
            <td>${odontologo.apellido}</td>
            <td>${odontologo.matricula}</td>
        `;
      tabla.appendChild(fila);
    });

    odontologoInfoTabla.appendChild(tabla);
  }
});
