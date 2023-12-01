document.addEventListener("submit", function (event) {
  event.preventDefault();

  const url = "http://localhost:8081/odontologos/";

  var odontologoId = document.getElementById("inputOdontologoId").value;

  const odontologoInfo = document.getElementById("odontologoInfoId");
  odontologoInfo.innerHTML = "";

  buscarOdontologoPorId(odontologoId);

  function buscarOdontologoPorId(odontologoId) {
    fetch(url + odontologoId, {
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
    const odontologoInfoId = document.getElementById("odontologoInfoId");
    const tabla = document.createElement("table");
    const encabezado = document.createElement("tr");
    encabezado.innerHTML = `
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Matrícula</th>
    `;
    tabla.appendChild(encabezado);
      const fila = document.createElement("tr");
      fila.innerHTML = `
            <td>${odontologo.nombre}</td>
            <td>${odontologo.apellido}</td>
            <td>${odontologo.matricula}</td>
        `;
      tabla.appendChild(fila);

    odontologoInfoId.appendChild(tabla);
  }
});
