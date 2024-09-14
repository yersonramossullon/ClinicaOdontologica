async function obtenerTodosLosTurnos() {
  const URL_OBTENER_TURNOS = "/turno";

  try {
    const response = await fetch(URL_OBTENER_TURNOS);
    if (!response.ok) {
      throw new Error("No se pudo realizar la solicitud: " + response.status);
    }
    if (response.status === 204) {
      throw new Error("La BD de Turnos no contiene datos");
    }
    const listaTurnos = await response.json();
    agregarFilasATabla(listaTurnos);
    agregarEventoBtnEditar();
    agregarEventoBtnEliminar();
  } catch (error) {
    console.error("Error al obtener todos los turnos: ", error);
  }
}

function agregarEventoBtnEditar() {
  //capturamos todos los botones con clase actualizar que existan en el DOM
  const btnsEditar = document.querySelectorAll(".btnEditar");
  btnsEditar.forEach((boton) => {
    boton.addEventListener("click", async (evento) => {
      const idTurnoAActualizar = boton.getAttribute("data-target");
      console.log(" el ID del boton a actualizar es: ", idTurnoAActualizar);
      //agregamos los datos al form si encontramos al turno
      const turno = await buscarTurno(idTurnoAActualizar);
      if (turno) {
        mostrarFormActualizacion();
        document.getElementById("text-id").value = turno.id;
        document.getElementById("paciente").value = turno.paciente.nombre;
        document.getElementById("odontologo").value = turno.odontologo.nombre;
        document.getElementById("fecha").value = turno.fecha;
        console.log("se llama a el evento de actualizacion");
        agregarEventosFormActualizacion(turno);
      }
    });
  });
}

function agregarEventosFormActualizacion(turno) {
  // capturamos la seccion y el formulario
  console.log("se agrega el evento al form de actualizacion");
  const seccionForm = document.getElementById("seccion_form");
  const formActualizacion = document.getElementById("actualizar_turno");
  //capturo el boton cancelar y el submit del form
  const btnCancelar = document.getElementById("btn_cancelar");
  formActualizacion.addEventListener("submit", function (evento) {
    evento.preventDefault();
    console.log("se llama al metodo de actualizar Turno con el objeto");
    actualizarTurno(turno);
  });
  btnCancelar.addEventListener("click", (evento) => {
    console.log("reseteamos el form y se oculta");
    formActualizacion.reset();
    seccionForm.classList.add("hidden"); // ocultamos el form
  });
}

async function actualizarTurno(turno) {
  //creamos el objeto JSON odontologo con los datos del Form
  const turnoActualizado = {
    id: turno.id,
    paciente: turno.paciente,
    odontologo: turno.odontologo,
    fecha: document.getElementById("fecha").value,
  };
  //datos para el endpoint actualizar
  const URL_ACTUALIZAR_TURNO = "/turno";
  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turnoActualizado),
  };

  try {
    const response = await fetch(URL_ACTUALIZAR_TURNO, settings);
    console.log(response);
    if (!response.ok) {
      window.alert("Error, intenta nuevamente!!!");
      throw new Error("Error al actualizar Turno: ", turno.id);
    }

    const responseBody = await response.text();
    window.alert(responseBody);
    window.location.reload();
  } catch (error) {
    console.error("Error: ", error);
  }
}

function agregarEventoBtnEliminar() {
  //capturamos todos los botones con clase actualizar que existan en el DOM
  const btnsEliminar = document.querySelectorAll(".btnEliminar");
  btnsEliminar.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      const idTurnoAEliminar = boton.getAttribute("data-target");
      console.log(" el ID del boton a eliminar es: ", idTurnoAEliminar);
      eliminarTurno(idTurnoAEliminar);
    });
  });
}

function agregarFilasATabla(listaTurnos) {
  const tablaTurnosBody = document.getElementById("tBodyTurnos");
  listaTurnos.forEach((turno) => {
    let fila = tablaTurnosBody.insertRow();
    fila.id = "tr_" + turno.id;
    fila.classList.add("hover:bg-green-100");
    fila.classList.add("flex-row");
    fila.innerHTML = `${plantillaTd(turno)}`;
  });
}

function plantillaTd(turno) {
  return `
        <td class="py-2 px-4 border-b text-center font-bold text-2xl">${
          turno.id
        }</td>
        <td class="py-2 px-4 border-b text-center">${turno.paciente.nombre.toUpperCase()}</td>
        <td class="py-2 px-4 border-b text-center">${turno.odontologo.nombre.toUpperCase()}</td>
        <td class="py-2 px-4 border-b text-center">${turno.fecha}</td>
        <td class="py-2 px-4 border-b text-center">${plantillaBtnEditar(
          turno
        )}</td>
        <td class="py-2 px-4 border-b text-center">${plantillaBtnEliminar(
          turno
        )}</td>
    `;
}

function plantillaBtnEditar(turno) {
  return `
        <button data-target="${turno.id}" class="cursor-pointer bg-green-950 rounded-lg btnEditar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 rounded-lg text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
        </button>
    `;
}

function plantillaBtnEliminar(turno) {
  return `
        <button data-target="${turno.id}" class="cursor-pointer bg-red-700 rounded-lg btnEliminar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 rounded-lg text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.018.166m-2.651-.802A9.598 9.598 0 0 0 12 5.25c-1.206 0-2.376.213-3.461.604m-2.65.802c.335-.06.676-.114 1.018-.165M20.25 7.5c.414 3.912.375 7.773-.116 11.607a2.25 2.25 0 0 1-2.238 1.968H6.105a2.25 2.25 0 0 1-2.238-1.968C3.376 15.273 3.337 11.412 3.75 7.5m16.5 0A48.108 48.108 0 0 0 3.75 7.5" />
            </svg>
        </button>
    `;
}

function agregarEventoBtnEditar() {
  const btnsEditar = document.querySelectorAll(".btnEditar");
  btnsEditar.forEach((boton) => {
    boton.addEventListener("click", async (evento) => {
      const idTurnoAActualizar = boton.getAttribute("data-target");
      const turno = await buscarTurno(idTurnoAActualizar);
      console.log("el id del turno a editar es: ", idTurnoAActualizar);

      if (turno) {
        mostrarFormActualizacion();
        document.getElementById("text-id").value = turno.id;
        document.getElementById("paciente").value = turno.paciente.nombre;
        document.getElementById("odontologo").value = turno.odontologo.nombre;
        document.getElementById("fecha").value = turno.fecha;
        agregarEventosFormActualizacion(turno);
      }
    });
  });
}

function mostrarFormActualizacion() {
  //capturamos el DOM
  const seccionForm = document.getElementById("seccion_form");
  seccionForm.classList.remove("hidden"); // mostramos el form
}

async function buscarTurno(id) {
  const URL_BUSCAR_TURNO = `/turno/buscar/${id}`;
  try {
    const response = await fetch(URL_BUSCAR_TURNO);
    if (!response.ok) {
      throw new Error("Error al buscar el turno");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al buscar turno: ", error);
    return null;
  }
}

function agregarEventoBtnEliminar() {
  const btnsEliminar = document.querySelectorAll(".btnEliminar");
  btnsEliminar.forEach((boton) => {
    boton.addEventListener("click", async () => {
      const idTurnoAEliminar = boton.getAttribute("data-target");
      await eliminarTurno(idTurnoAEliminar);
    });
  });
}

async function eliminarTurno(id) {
  const URL_ELIMINAR_TURNO = `/turno/${id}`;
  try {
    const response = await fetch(URL_ELIMINAR_TURNO, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el turno");
    }
    const responseBody = await response.text();
    window.alert(responseBody);
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar turno: ", error);
  }
}
window.addEventListener("DOMContentLoaded", obtenerTodosLosTurnos);
