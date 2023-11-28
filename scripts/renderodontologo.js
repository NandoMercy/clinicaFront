window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const url = "http://localhost:8081/odontologos/listar";

  consultarOdontologos();

  function consultarOdontologos() {
    const settings = {
      method: "GET",
      /* headers: {
        authorization: token,
      },*/
    };

    console.log("Consultando Listado de Odontologos");
    fetch(url, settings)
      .then((response) => response.json())
      .then((odontologos) => {
        console.log("Listado de odontologos");
        console.log(odontologos);

        renderizarOdontologos(odontologos);
      })
      .catch((err) => console.log(err));
  }

  function renderizarOdontologos(odontologos) {
    const odontologoDetailsTable = document.getElementById("odontologoDetails");
    const tabla = document.createElement("table");
    const encabezado = document.createElement("tr");
    encabezado.innerHTML = `
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Matrícula</th>
    `;
    tabla.appendChild(encabezado);

    odontologos.forEach((odontologo) => {
      const fila = document.createElement("tr");
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
