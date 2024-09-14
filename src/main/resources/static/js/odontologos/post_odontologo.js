//funcion para guardar un Odontologo
async function guardarOdontologo() {
  //capturamos el form
  const form = document.getElementById("agregarNuevoOdontologo");
  //creamos el objeto con los datos del form
  const odontologo = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    matricula: document.getElementById("matricula").value,
  };

  console.log(odontologo);

  //datos para el endpoint
  const URL = "/odontologo";
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(odontologo),
  };

  try {
    const response = await fetch(URL, settings);
    console.log(response);
    if (!response.ok) {
      throw new Error("Error al al consultar la API");
    }
    const odontologoData = await response.json();
    console.log(odontologoData);
    window.alert(
      `Odontologo: ${
        odontologoData.nombre + " " + odontologoData.apellido
      } guardado`
    );
    form.reset();
  } catch (error) {
    window.alert(`Error al Guardar, intente nuevamente`);
    form.reset();
    console.error("error al guardar un Odontologo: ", error);
  }
}

function main() {
  //capturamos el form
  const form = document.getElementById("agregarNuevoOdontologo");
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    guardarOdontologo();
  });
}

window.addEventListener("DOMContentLoaded", main);
