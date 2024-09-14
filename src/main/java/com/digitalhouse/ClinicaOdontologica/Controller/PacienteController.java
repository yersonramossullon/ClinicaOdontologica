package com.digitalhouse.ClinicaOdontologica.Controller;

import com.digitalhouse.ClinicaOdontologica.Dto.PacienteDTO;
import com.digitalhouse.ClinicaOdontologica.Entity.Paciente;
import com.digitalhouse.ClinicaOdontologica.Exception.ResourceNotFoundException;
import com.digitalhouse.ClinicaOdontologica.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    @Autowired
    private PacienteService pacienteService;
    @PostMapping
    public ResponseEntity<PacienteDTO> guardarPaciente(@RequestBody Paciente paciente){
        PacienteDTO paciente1 = pacienteService.guardarPaciente(paciente);
        return new ResponseEntity<>(paciente1, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<String> actualizarPaciente(@RequestBody Paciente paciente) throws ResourceNotFoundException{
        Optional<Paciente> pacienteAActualizar = pacienteService.buscarPorId(paciente.getId());
        if (pacienteAActualizar.isPresent()){
            pacienteService.actualizarPaciente(paciente);
            return new ResponseEntity<>("Paciente Actualizado con Exito", HttpStatus.OK);
        }
        //return new ResponseEntity<>("Paciente no encontrado", HttpStatus.NOT_FOUND);
        throw new ResourceNotFoundException("Paciente no encontrado por ID");
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Paciente>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorId(id);
        if (pacienteBuscado.isPresent()){
            return new ResponseEntity<>(pacienteBuscado, HttpStatus.OK);
        }
        //return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        throw new ResourceNotFoundException("Paciente no encontrado por ID");
    }


    @GetMapping("/buscar/email/{email}")
    public ResponseEntity<Optional<Paciente>> buscarPorEmail(@PathVariable String email) throws ResourceNotFoundException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorEmail(email);
        if (pacienteBuscado.isPresent()){
            return new ResponseEntity<>(pacienteBuscado, HttpStatus.OK);
        }
        //return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        throw new ResourceNotFoundException("Paciente no encontrado por email");
    }


    @GetMapping
    public ResponseEntity<List<Paciente>> listarPacientes(){
        List<Paciente> todosLosPacientes = pacienteService.listarTodosLosPacientes();
        if (todosLosPacientes.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(todosLosPacientes, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Paciente> pacienteAEliminar = pacienteService.buscarPorId(id);
        if (pacienteAEliminar.isPresent()){
            pacienteService.eliminarPaciente(id);
            return new ResponseEntity<>("Paciente Eliminado con Exito", HttpStatus.OK);
        }
        //return new ResponseEntity<>("Paciente no encontrado", HttpStatus.NOT_FOUND);
        throw new ResourceNotFoundException("Paciente no encontrado por ID");
    }


}
