package com.digitalhouse.ClinicaOdontologica;

import com.digitalhouse.ClinicaOdontologica.Dto.PacienteDTO;
import com.digitalhouse.ClinicaOdontologica.Dto.TurnoDTO;
import com.digitalhouse.ClinicaOdontologica.Entity.Domicilio;
import com.digitalhouse.ClinicaOdontologica.Entity.Odontologo;
import com.digitalhouse.ClinicaOdontologica.Entity.Paciente;
import com.digitalhouse.ClinicaOdontologica.Entity.Turno;
import com.digitalhouse.ClinicaOdontologica.Service.OdontologoService;
import com.digitalhouse.ClinicaOdontologica.Service.PacienteService;
import com.digitalhouse.ClinicaOdontologica.Service.TurnoService;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class TurnosTestIntegracion {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private OdontologoService odontologoService;
    @Autowired
    private MockMvc mockMvc; //va a ser el objeto que nos lleve a ejecutar el test


    public void cargarDatos(){
        PacienteDTO pacienteDTO= pacienteService.guardarPaciente(new Paciente("Jorgito","Pereyra","1111111", LocalDate.of(2024,9,11),new Domicilio("calle 1",12,"La Rioja", "Argentina"),"jorgito@digitalhouse.com"));
        Paciente pacienteOriginal = pacienteService.pacienteDTOAPaciente(pacienteDTO);
        Odontologo odontologo= odontologoService.guardarOdontologo(new Odontologo("Matias","Torres","1223"));
        TurnoDTO turnoDTO= turnoService.guardarTurno(new Turno(pacienteOriginal,odontologo, LocalDate.of(2024,9,21)));
    }
    @Test
    public void listarTurnos() throws Exception{
        cargarDatos();
        MvcResult respuesta= mockMvc.perform(MockMvcRequestBuilders.get("/turno").accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        assertFalse(respuesta.getResponse().getContentAsString().isEmpty());
    }
}
