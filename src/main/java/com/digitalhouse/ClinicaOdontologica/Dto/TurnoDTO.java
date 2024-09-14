package com.digitalhouse.ClinicaOdontologica.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TurnoDTO {
    private Long id;
    private LocalDate fecha;
    private Long paciente_id;
    private Long odontologo_id;
}
