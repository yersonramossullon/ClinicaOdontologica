package com.digitalhouse.ClinicaOdontologica;

import com.digitalhouse.ClinicaOdontologica.Entity.Domicilio;
import com.digitalhouse.ClinicaOdontologica.Entity.Paciente;
import com.digitalhouse.ClinicaOdontologica.Service.PacienteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class PacientesTestIntegracion {
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private MockMvc mockMvc; //va a ser el objeto que nos lleve a ejecutar el test

    public void cargarDatos(){
        Domicilio domicilio = new Domicilio("Los almendros",10,"Piura","Peru");
        Paciente paciente = new Paciente("Yerson","Ramos", "12345678", LocalDate.of(2024,01,10), domicilio,"yerson@gmail.com");
        pacienteService.guardarPaciente(paciente);
    }
    @Test
    public void listarPacientes() throws Exception{
        cargarDatos();
        MvcResult respuesta= mockMvc.perform(MockMvcRequestBuilders.get("/paciente").accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        assertFalse(respuesta.getResponse().getContentAsString().isEmpty());
    }
}
