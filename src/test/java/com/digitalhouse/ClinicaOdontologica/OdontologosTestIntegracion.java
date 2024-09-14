package com.digitalhouse.ClinicaOdontologica;

import com.digitalhouse.ClinicaOdontologica.Entity.Odontologo;
import com.digitalhouse.ClinicaOdontologica.Service.OdontologoService;
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

import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class OdontologosTestIntegracion {
    @Autowired
    private OdontologoService odontologoService;
    @Autowired
    private MockMvc mockMvc; //va a ser el objeto que nos lleve a ejecutar el test

    public void cargarDatos(){
        Odontologo odontologo = odontologoService.guardarOdontologo(new Odontologo("12345doc","Omar","Gonzales"));
    }
    @Test
    public void listarOdontologos() throws Exception{
        cargarDatos();
        MvcResult respuesta= mockMvc.perform(MockMvcRequestBuilders.get("/odontologo").accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        assertFalse(respuesta.getResponse().getContentAsString().isEmpty());
    }
}
