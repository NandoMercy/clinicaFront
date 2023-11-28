document
  .getElementById("buscarForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const url = "http://localhost:8081/odontologos/id";

    var matricula = document.getElementById("inputMatricula").value;

    buscarOdontologoPorMatricula(matricula);

    function buscarOdontologoPorMatricula(matricula) {
      fetch(url + matricula, {
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

    function renderizarInfo(info) {
      var odontologoDetailsTable = document.getElementById("odontologoInfo");
      odontologoDetailsTable.innerHTML = "";

      var tabla = document.createElement("table");
      var encabezado = document.createElement("tr");
      encabezado.innerHTML = `
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Matrícula</th>
    `;
      tabla.appendChild(encabezado);

      info.forEach((odontologo) => {
        var fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${odontologo.nombre}</td>
            <td>${odontologo.apellido}</td>
            <td>${odontologo.matricula}</td>
        `;
        tabla.appendChild(fila);
      });

      odontologoDetailsTable.appendChild(tabla);
    }
  });
