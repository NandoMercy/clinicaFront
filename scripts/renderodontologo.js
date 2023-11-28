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
    const odontologoDetailsList = document.getElementById("odontologoDetails");
    const listaOdontologos = document.createElement("ul");

    odontologos.forEach((odontologo) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
            <strong>Nombre:</strong> ${odontologo.nombre} <br>
            <strong>Apellido:</strong> ${odontologo.apellido} <br>
            <strong>Matrícula:</strong> ${odontologo.matricula} <br>
            <hr>
        `;
      listaOdontologos.appendChild(listItem);
    });

    odontologoDetailsList.appendChild(listaOdontologos);
  }
});
