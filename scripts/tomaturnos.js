document.addEventListener("DOMContentLoaded", function () {
  const pacienteSelect = document.getElementById("paciente");
  const odontologoSelect = document.getElementById("odontologo");
  const fechaHoraSelect = document.getElementById("turno");
  const tomarTurnoBtn = document.querySelector("button");

  //GET PACIENTES
  fetch("http://localhost:8081/pacientes/listar")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((paciente) => {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = `${paciente.nombre} ${paciente.apellido}`;
        pacienteSelect.appendChild(option);
      });
    });

  //GET ODONTOLOGOS
  fetch("http://localhost:8081/odontologos/listar")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((odontologo) => {
        const option = document.createElement("option");
        option.value = odontologo.id;
        option.textContent = `${odontologo.nombre} ${odontologo.apellido}`;
        odontologoSelect.appendChild(option);
      });
    });

  tomarTurnoBtn.addEventListener("click", function () {
    const pacienteId = pacienteSelect.value;
    const odontologoId = odontologoSelect.value;
    const fechaHora = fechaHoraSelect.value;

    const turnoData = {
      paciente: parseInt(pacienteId),
      odontologo: parseInt(odontologoId),
      fechayHora: fechaHora,
    };

    // POST TURNOS
    fetch("http://localhost:8081/turnos/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(turnoData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Turno tomado con éxito:", data);
      })
      .catch((error) => {
        console.error("Error al tomar el turno:", error);
      });
  });
});
