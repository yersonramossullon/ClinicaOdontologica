async function obtenerTodosLosOdontologos() {
  const URL_OBTENER_ODONTOLOGOS = "/odontologo";

  try {
    const response = await fetch(URL_OBTENER_ODONTOLOGOS);
    console.log(response);
    if (!response.ok) {
      throw new Error("nose pudo realizar la solicitud: " + response.status);
    }
    if (response.status === 204) {
      throw new Error("la BD Odontologos no contiene datos");
    }
    const listaOdontologos = await response.json();
    agregarFilasATabla(listaOdontologos);
    agregarEventoBtnEditar();
    agregarEventoBtnEliminar();
  } catch (error) {
    console.error("Error al obtener todos los Odontologos: ", error);
  }
}

function agregarFilasATabla(listaOdontologos) {
  console.log(listaOdontologos);
  //capturamos el body de la tabla de odontologos
  const tablaOdontologosBody = document.getElementById("tBodyOdontologos");

  listaOdontologos.forEach((odontologo) => {
    let fila = tablaOdontologosBody.insertRow();
    fila.id = "tr_" + odontologo.id;
    fila.classList.add("hover:bg-green-100");
    fila.classList.add("flex-row");
    fila.innerHTML = `${plantillaTd(odontologo)}`;
  });
}

function plantillaBtnEditar(odontologo) {
  return `
        <button 
          data-target="${odontologo.id}" class="cursor-pointer bg-green-950 rounded-lg btnEditar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-8 rounded-lg text-white">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>`;
}

function plantillaBtnEliminar(odontologo) {
  return `
        <button 
          data-target="${odontologo.id}" class="cursor-pointer bg-red-700 rounded-lg btnEliminar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-8 rounded-lg text-white">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
              </svg>
        </button>`;
}

function plantillaTd(odontologo) {
  return `
    <td class="py-2 px-4 border-b text-center font-bold text-2xl">
              ${odontologo.id}
            </td>
            <td class="py-2 px-4 border-b text-center">${odontologo.nombre.toUpperCase()}</td>
            <td class="py-2 px-4 border-b text-center">${odontologo.apellido.toUpperCase()}</td>
            <td class="py-2 px-4 border-b text-center">${odontologo.matricula.toUpperCase()}</td>
            <td class="py-2 px-4 border-b place-content-center text-center">
              ${plantillaBtnEditar(odontologo)}
            </td>
            <td class="py-2 px-4 border-b place-content-center text-center">
              ${plantillaBtnEliminar(odontologo)}
            </td>
  `;
}

function agregarEventoBtnEditar() {
  //capturamos todos los botones con clase actualizar que existan en el DOM
  const btnsEditar = document.querySelectorAll(".btnEditar");
  btnsEditar.forEach((boton) => {
    boton.addEventListener("click", async (evento) => {
      const idOdontologoAActualizar = boton.getAttribute("data-target");
      console.log(
        " el ID del boton a actualizar es: ",
        idOdontologoAActualizar
      );
      //agregamos los datos al form si encontramos al odontologo
      const odontologo = await buscarOdontologo(idOdontologoAActualizar);
      if (odontologo) {
        mostrarFormActualizacion();
        document.getElementById("text-id").value = odontologo.id;
        document.getElementById("nombre").value = odontologo.nombre;
        document.getElementById("apellido").value = odontologo.apellido;
        document.getElementById("matricula").value = odontologo.matricula;
        agregarEventosFormActualizacion(odontologo);
      }
    });
  });
}

function agregarEventosFormActualizacion(odontologo) {
  // capturamos la seccion y el formulario
  const seccionForm = document.getElementById("seccion_form");
  const formActualizacion = document.getElementById("actualizar_odontologo");
  //capturo el boton cancelar y el submit del form
  const btnCancelar = document.getElementById("btn_cancelar");
  formActualizacion.addEventListener("submit", function (evento) {
    evento.preventDefault();
    console.log("se llama al metodo de actualizar odontologo con el objeto");
    actualizarOdontologo(odontologo);
  });
  btnCancelar.addEventListener("click", (evento) => {
    console.log("reseteamos el form y se oculta");
    formActualizacion.reset();
    seccionForm.classList.add("hidden"); // ocultamos el form
  });
}

async function actualizarOdontologo(odontologo) {
  //creamos el objeto JSON odontologo con los datos del Form
  const odontologoActualizado = {
    id: odontologo.id,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    matricula: document.getElementById("matricula").value,
  };
  //datos para el endpoint actualizar
  const URL_ACTUALIZAR_ODONTOLOGO = "/odontologo";
  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(odontologoActualizado),
  };

  try {
    const response = await fetch(URL_ACTUALIZAR_ODONTOLOGO, settings);
    console.log(response);
    if (!response.ok) {
      window.alert("Error, intenta nuevamente!!!");
      throw new Error("Error al actualizar paciente: ", odontologo.id);
    }

    const responseBody = await response.text();
    window.alert(responseBody);
    window.location.reload();
  } catch (error) {
    console.error("Error: ", error);
  }
}

function mostrarFormActualizacion() {
  //capturamos el DOM
  const seccionForm = document.getElementById("seccion_form");
  seccionForm.classList.remove("hidden"); // mostramos el form
}

function agregarEventoBtnEliminar() {
  //capturamos todos los botones con clase actualizar que existan en el DOM
  const btnsEliminar = document.querySelectorAll(".btnEliminar");
  btnsEliminar.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      const idOdontologoAEliminar = boton.getAttribute("data-target");
      console.log(" el ID del boton a eliminar es: ", idOdontologoAEliminar);
      eliminarOdontologo(idOdontologoAEliminar);
    });
  });
}

async function buscarOdontologo(id) {
  const URL_BUSCAR_ODONTOLOGO = `/odontologo/buscar/${id}`;
  try {
    const response = await fetch(URL_BUSCAR_ODONTOLOGO);
    if (!response.ok) {
      throw new Error("Error al realizar el fetch");
    }
    if (response.status === 404) {
      throw new Error("No se encontro al Odontologo con ID: ", id);
    }

    const objOdontologo = await response.json();
    return objOdontologo;
  } catch (error) {
    console.error("Error al buscar Odontologo: ", error);
    return null;
  }
}

async function eliminarOdontologo(id) {
  const URL_ELIMINAR_ODONTOLOGO = `/odontologo/${id}`;
  const settings = {
    method: "DELETE",
  };

  try {
    const response = await fetch(URL_ELIMINAR_ODONTOLOGO, settings);
    console.log(response);

    if (!response.ok) {
      //lanzamos alerta negativa
      window.alert("No se pudo eliminar el Paciente, intenta nuevamente.");
      throw new Error("Error al eliminar paciente: ", id);
    }
    const responseBody = await response.text();
    //lanzamos alerta positiva
    window.alert(responseBody);
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar paciente: ", error);
  }
}
window.addEventListener("DOMContentLoaded", obtenerTodosLosOdontologos);
