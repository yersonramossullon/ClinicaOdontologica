window.addEventListener("load", function () {
  //capturado el DOM
  const formulario = document.getElementById("agregarNuevoPaciente");

  //ante el envio del form, se ejecuta la funcion anonima
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    //creamos el objeto JSON con los datos del form
    const paciente = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      cedula: document.getElementById("cedula").value,
      email: document.getElementById("email").value,
      fechaIngreso: document.getElementById("fecha-ingreso").value,
      domicilio: {
        calle: document.getElementById("calle").value,
        numero: document.getElementById("numero").value,
        localidad: document.getElementById("localidad").value,
        provincia: document.getElementById("provincia").value,
      },
    };

    //url al ENDPOINT
    const url = "/paciente";
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paciente),
    };
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // mostramos la alerta de que se guardo el objeto
        let alerta = document.getElementById("alerta");
        alerta.textContent = "Paciente Agregado Correctamente";
        alerta.className =
          "mt-4 p-4 rounded-lg bg-green-100 text-green-700 border border-green-400";
        alerta.classList.remove("hidden");
        setTimeout(function () {
          alerta.classList.add("hidden");
          formulario.reset(); // limpiamos el form
        }, 4000);
      })
      .catch((error) => {
        const alerta = document.getElementById("alerta");
        alerta.textContent = "Error, intente nuevamente";
        alerta.className =
          "mt-4 p-4 rounded-lg bg-red-100 text-red-700 border border-red-400";
        alerta.classList.remove("hidden");
        setTimeout(function () {
          alerta.classList.add("hidden");
          formulario.reset(); // limpiamos el form
        }, 4000);
      });
  });
});
