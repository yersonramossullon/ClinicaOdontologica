package com.digitalhouse.ClinicaOdontologica.Controller;

import com.digitalhouse.ClinicaOdontologica.Dto.TurnoDTO;
import com.digitalhouse.ClinicaOdontologica.Entity.Odontologo;
import com.digitalhouse.ClinicaOdontologica.Entity.Paciente;
import com.digitalhouse.ClinicaOdontologica.Entity.Turno;
import com.digitalhouse.ClinicaOdontologica.Exception.BadRequestException;
import com.digitalhouse.ClinicaOdontologica.Service.OdontologoService;
import com.digitalhouse.ClinicaOdontologica.Service.PacienteService;
import com.digitalhouse.ClinicaOdontologica.Service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turno")
public class TurnoController {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private OdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<TurnoDTO> guardarTurno(@RequestBody Turno turno) throws BadRequestException {
        Optional<Paciente> paciente = pacienteService.buscarPorId(turno.getPaciente().getId());
        Optional<Odontologo> odontologo= odontologoService.buscarPorId(turno.getOdontologo().getId());
        if (paciente.isPresent() && odontologo.isPresent()){
            turno.setPaciente(paciente.get());
            turno.setOdontologo(odontologo.get());
            return new ResponseEntity<>(turnoService.guardarTurno(turno), HttpStatus.OK);
        }
        //return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        throw new BadRequestException("Paciente u Odontologo no encontrados por ID");
    }

    @PutMapping
    public ResponseEntity<String> actualizarTurno(@RequestBody Turno turno) throws BadRequestException{
        Optional<Turno> turnoAActualizar = turnoService.buscarPorId(turno.getId());
        if (turnoAActualizar.isPresent()){
            turnoService.actualizarTurno(turno);
            return new ResponseEntity<>("Turno actualizado Correctamente", HttpStatus.OK);
        }
        //return new ResponseEntity<>("Turno no encontrado", HttpStatus.NOT_FOUND);
        throw new BadRequestException("Turno no encontrado por ID");
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Turno>> buscarPorId(@PathVariable Long id) throws BadRequestException{
        Optional<Turno> turnoABuscar = turnoService.buscarPorId(id);
        if (turnoABuscar.isPresent()){
            return new ResponseEntity<>(turnoABuscar, HttpStatus.OK);
        }
        //return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        throw new BadRequestException("Turno no encontrados por ID");
    }

    @GetMapping
    public ResponseEntity<List<Turno>> listarTurnos(){
        List<Turno> todosLosTurnos = turnoService.listarTodosLosTurnos();
        if (todosLosTurnos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(todosLosTurnos, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarTurno(@PathVariable Long id) throws BadRequestException{
        Optional<Turno> turnoAEliminar = turnoService.buscarPorId(id);
        if (turnoAEliminar.isPresent()){
            turnoService.eliminarTruno(id);
            return new ResponseEntity<>("Turno eliminado con Exito", HttpStatus.OK);
        }

        //return new ResponseEntity<>("Turno no encontrado", HttpStatus.NOT_FOUND);
        throw new BadRequestException("Turno no encontrado por ID");
    }



}
