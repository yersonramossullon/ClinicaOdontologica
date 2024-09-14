//funcion para guardar un Odontologo
async function guardarTurno() {
  //capturamos el form
  const form = document.getElementById("agregarNuevoTurno");
  //creamos el objeto con los datos del form
  const turno = {
    paciente: { id: document.getElementById("IdPaciente").value },
    odontologo: { id: document.getElementById("IdOdontologo").value },
    fecha: document.getElementById("fecha-ingreso").value,
  };

  console.log(turno);

  //datos para el endpoint
  const URL = "/turno";
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turno),
  };

  try {
    const response = await fetch(URL, settings);
    console.log(response);
    if (!response.ok) {
      throw new Error("Error al al consultar la API");
    }
    const turnoData = await response.json();
    console.log(turnoData);
    window.alert(
      `Turno id: ${turnoData.id + " Con fecha: " + turnoData.fecha} guardado`
    );

    form.reset();
  } catch (error) {
    window.alert(`Error al Guardar, intente nuevamente`);
    form.reset();
    console.error("error al guardar un turno: ", error);
  }
}

function main() {
  //capturamos el form

  const form = document.getElementById("agregarNuevoTurno");
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    guardarTurno();
  });
}

window.addEventListener("DOMContentLoaded", main);
