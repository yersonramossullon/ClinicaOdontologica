package com.digitalhouse.ClinicaOdontologica.Controller;

import com.digitalhouse.ClinicaOdontologica.Entity.Odontologo;
import com.digitalhouse.ClinicaOdontologica.Exception.ResourceNotFoundException;
import com.digitalhouse.ClinicaOdontologica.Service.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologo")
public class OdontologoController {
    @Autowired
    private OdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<Odontologo> guardarOdontologo(@RequestBody Odontologo odontologo){
        return new ResponseEntity<>(odontologoService.guardarOdontologo(odontologo), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<String> actualizarOdontologo(@RequestBody Odontologo odontologo) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoAActualizar = odontologoService.buscarPorId(odontologo.getId());
        if (odontologoAActualizar.isPresent()){
            odontologoService.actualizarOdontologo(odontologo);
            return new ResponseEntity<>("Odontologo Actualizado con Exito", HttpStatus.OK);
        }
        //return new ResponseEntity<>("Odontologo no encontrado", HttpStatus.NOT_FOUND);
        throw new ResourceNotFoundException("Odontologo no encontrado por ID");
    }


    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Odontologo>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorId(id);
        if (odontologoBuscado.isPresent()){
            return new ResponseEntity<>(odontologoBuscado, HttpStatus.OK);
        }
        //return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        throw new ResourceNotFoundException("Odontologo no encontrado por ID");
    }

    @GetMapping("/buscar/matricula/{matricula}")
    public ResponseEntity<Optional<Odontologo>> buscarPorMatricula(@PathVariable String matricula) throws ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorMatricula(matricula);
        if (odontologoBuscado.isPresent()){
            return new ResponseEntity<>(odontologoBuscado, HttpStatus.OK);
        }
        //return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        throw new ResourceNotFoundException("Odontologo no encontrado por ID");
    }

    @GetMapping
    public ResponseEntity<List<Odontologo>> listarOdontologos(){
        List<Odontologo> todosLosOdontologos = odontologoService.listarTodosLosOdontologos();
        if (todosLosOdontologos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(todosLosOdontologos, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Odontologo> odontologoAEliminar = odontologoService.buscarPorId(id);
        if (odontologoAEliminar.isPresent()){
            odontologoService.eliminarOdontologo(id);
            return new ResponseEntity<>("Odontologo Eliminado con Exito", HttpStatus.OK);
        }
        //return new ResponseEntity<>("Odontologo no encontrado", HttpStatus.NOT_FOUND);
        throw new ResourceNotFoundException("Odontologo no encontrado por ID");
    }

}
