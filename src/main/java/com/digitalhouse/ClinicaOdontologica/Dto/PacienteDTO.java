package com.digitalhouse.ClinicaOdontologica.Dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class PacienteDTO {
    private Long id;
    private String nombreCompleto;
    private String cedula;
    private String email;
    private LocalDate fechaIngreso;

    //atributos de domicilio
    private String calle;
    private int numero;
    private String localidadProvincia;


}
