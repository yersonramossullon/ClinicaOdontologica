//funcion para consumo de la API
async function listarPacientes() {
  //capturamos el DOM, en este caso el body de la tabla
  const tablaPacientesBody = document
    .getElementById("tablaPacientes")
    .getElementsByTagName("tbody")[0];
  // variable para saber si la tabla de clientes esta vacia;
  let tablaVacia = true;
  //datos para la API
  const URL = "/paciente";
  const settings = {
    method: "GET",
  };

  // llamamos a la API
  try {
    const response = await fetch(URL, settings);
    console.log(response);

    if (response.status === 204) {
      throw new Error("La BD pacientes esta vacia ");
    }
    const data = await response.json();
    console.log(data);

    tablaVacia = false;
    //recorremos la lista de pacientes obtenidos en el data
    data.forEach((paciente) => {
      // Por cada paciente agregamos una fila al tbody
      let pacienteFila = tablaPacientesBody.insertRow();
      pacienteFila.id = "tr_" + paciente.id;
      pacienteFila.classList.add("hover:bg-emerald-100");
      pacienteFila.classList.add("flex-row");
      const btnEditar = `
        <button id="update_${paciente.id}" data-target="${paciente.id}" class="cursor-pointer bg-blue-950 rounded-lg btnEditar">
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
      const btnEliminar = `
        <button id="delete_${paciente.id}" data-target="${paciente.id}" class="cursor-pointer bg-red-700 rounded-lg btnEliminar">
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
      pacienteFila.innerHTML = `
            <td class="py-2 px-4 border-b text-center font-bold text-2xl">
              ${paciente.id}
            </td>
            <td class="py-2 px-4 border-b text-center">${paciente.nombre.toUpperCase()}</td>
            <td class="py-2 px-4 border-b text-center">${paciente.apellido.toUpperCase()}</td>
            <td class="py-2 px-4 border-b text-center">${paciente.cedula.toUpperCase()}</td>
            <td class="py-2 px-4 border-b text-center">${paciente.email.toUpperCase()}</td>
            <td class="py-2 px-4 border-b text-center">${
              paciente.fechaIngreso
            }</td>
            <td class="py-2 px-4 border-b text-center">${paciente.domicilio.calle.toUpperCase()}</td>
            <td class="py-2 px-4 border-b text-center">${
              paciente.domicilio.numero
            }</td>
            <td class="py-2 px-4 border-b text-center">${paciente.domicilio.localidad.toUpperCase()}</td>
            <td class="py-2 px-4 border-b text-center">${paciente.domicilio.provincia.toUpperCase()}</td>
            <td class="py-2 px-4 border-b content-center">
              ${btnEditar}
            </td>
            <td class="py-2 px-4 border-b content-center">
              ${btnEliminar}
            </td>
          `;
    });
  } catch (error) {
    console.error("Error: ", error);
  }

  if (!tablaVacia) {
    agregarEventoBtnEditar(); //agregamos el evento clik a los botones actualizar
    agregarEventoBtnEliminar(); //agregamos el evento clik a los botones eliminar
  }
}

function agregarEventoBtnEditar() {
  //capturamos todos los botones con clase actualizar que existan en el DOM
  const btnsEditar = document.querySelectorAll(".btnEditar");
  btnsEditar.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      const idPacienteAActualizar = boton.getAttribute("data-target");
      console.log(" el ID del boton a actualizar es: ", idPacienteAActualizar);
      buscarPaciente(idPacienteAActualizar);
    });
  });
}

function agregarEventoBtnEliminar() {
  //capturamos todos los botones con clase btnEliminar que existan en el DOM
  const btnsEliminar = document.querySelectorAll(".btnEliminar");
  btnsEliminar.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      const idPacienteAEliminar = boton.getAttribute("data-target");
      console.log(" el ID del boton a eliminar es: ", idPacienteAEliminar);
      eliminarPaciente(idPacienteAEliminar);
    });
  });
}

function mostrarFormActualizacion() {
  //capturamos el DOM
  const seccionForm = document.getElementById("seccion_form");
  seccionForm.classList.remove("hidden"); // mostramos el form
}

async function buscarPaciente(id) {
  //datos para la API
  const URL_BUSCAR_PACIENTE = `/paciente/buscar/${id}`;
  const settings = {
    method: "GET",
  };

  try {
    //llamamos a la API con los Datos
    const response = await fetch(URL_BUSCAR_PACIENTE, settings);
    if (!response.ok) {
      throw new Error("Error en la solicitud fetch buscar paciente id: ", id);
    }
    const pacienteData = await response.json();

    if (pacienteData) {
      // mostramos la seccion de formlualrio para actualizar
      mostrarFormActualizacion();
      //llenamos los input del form para actualizar paciente
      document.getElementById("text-id").value = pacienteData.id;
      document.getElementById("nombre").value = pacienteData.nombre;
      document.getElementById("apellido").value = pacienteData.apellido;
      document.getElementById("cedula").value = pacienteData.cedula;
      document.getElementById("email").value = pacienteData.email;
      document.getElementById("fecha-ingreso").value =
        pacienteData.fechaIngreso;
      document.getElementById("calle").value = pacienteData.domicilio.calle;
      document.getElementById("numero").value = pacienteData.domicilio.numero;
      document.getElementById("localidad").value =
        pacienteData.domicilio.localidad;
      document.getElementById("provincia").value =
        pacienteData.domicilio.provincia;
      // capturamos la seccion y el formulario
      const seccionForm = document.getElementById("seccion_form");
      const formActualizacion = document.getElementById("actualizar_paciente");
      //capturo el boton cancelar y el submit del form
      const btnCancelar = document.getElementById("btn_cancelar");
      formActualizacion.addEventListener("submit", function (evento) {
        evento.preventDefault();
        console.log("se llama al metodo de actualizar paciente con el objeto");
        actualizarPaciente(pacienteData);
      });
      btnCancelar.addEventListener("click", (evento) => {
        console.log("reseteamos el form y se oculta");

        formActualizacion.reset();
        seccionForm.classList.add("hidden"); // ocultamos el form
      });
    }
  } catch (error) {
    console.error("error en la solicitud: ", error);
  }
}

async function actualizarPaciente(paciente) {
  //creamos el objeto JSON con los datos del form
  const pacienteAActualizar = {
    id: paciente.id,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    cedula: document.getElementById("cedula").value,
    email: document.getElementById("email").value,
    fechaIngreso: document.getElementById("fecha-ingreso").value,
    domicilio: {
      id: paciente.domicilio.id,
      calle: document.getElementById("calle").value,
      numero: parseInt(document.getElementById("numero").value),
      localidad: document.getElementById("localidad").value,
      provincia: document.getElementById("provincia").value,
    },
  };
  //url al ENDPOINT
  const URL_ACTUALIZAR_PACIENTE = "/paciente";
  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pacienteAActualizar),
  };

  //capturamos la alerta del form
  const alerta = document.getElementById("alerta");

  try {
    const response = await fetch(URL_ACTUALIZAR_PACIENTE, settings);
    console.log(response);

    if (!response.ok) {
      //lanzamos alerta negativa
      alerta.textContent = "Error, intente nuevamente";
      alerta.className =
        "mt-4 p-4 rounded-lg bg-red-100 text-red-700 border border-red-400";
      alerta.classList.remove("hidden");
      setTimeout(function () {
        alerta.classList.add("hidden");
        window.location.reload();
      }, 4000);

      throw new Error("Error al actualizar paciente: ");
    }
    const responseBody = await response.text();
    //lanzamos alerta positiva
    alerta.textContent = responseBody;
    alerta.className =
      "mt-4 p-4 rounded-lg bg-green-100 text-green-700 border border-green-400";
    alerta.classList.remove("hidden");
    setTimeout(function () {
      alerta.classList.add("hidden");
      window.location.reload();
    }, 4000);
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function eliminarPaciente(id) {
  //datos para el endpoint
  const URL_ELIMINAR_PACIENTE = `/paciente/${id}`;
  const settings = {
    method: "DELETE",
  };

  try {
    const response = await fetch(URL_ELIMINAR_PACIENTE, settings);
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

function main() {
  listarPacientes(); // fetch a GET pacientes
}

window.addEventListener("DOMContentLoaded", main);
