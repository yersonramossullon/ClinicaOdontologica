package com.digitalhouse.ClinicaOdontologica.Service;

import com.digitalhouse.ClinicaOdontologica.Dto.PacienteDTO;
import com.digitalhouse.ClinicaOdontologica.Entity.Paciente;
import com.digitalhouse.ClinicaOdontologica.Repository.IPacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    private IPacienteRepository IPacienteRepository;

    public PacienteDTO guardarPaciente(Paciente paciente){
        Paciente pacienteGuardado = IPacienteRepository.save(paciente);
        return pacienteAPacienteDTO(pacienteGuardado);
    }

    public void actualizarPaciente(Paciente paciente){
        IPacienteRepository.save(paciente);
    }

    public void eliminarPaciente(Long id){
        IPacienteRepository.deleteById(id);
    }

    public Optional<Paciente> buscarPorId(Long id){
        return IPacienteRepository.findById(id);
    }

    public Optional<Paciente> buscarPorEmail(String correo){
        return IPacienteRepository.findByEmail(correo);
    }

    public List<Paciente> listarTodosLosPacientes(){
        //List<Paciente> listaPacientes = IPacienteRepository.findAll();
        //List<PacienteDTO> listaDto = new ArrayList<>();
        return IPacienteRepository.findAll();
    }

    public PacienteDTO pacienteAPacienteDTO(Paciente paciente){
        PacienteDTO pacienteDTO = new PacienteDTO();
        pacienteDTO.setId(paciente.getId());
        pacienteDTO.setNombreCompleto(paciente.getNombre() + " " + paciente.getApellido());
        pacienteDTO.setCedula(paciente.getCedula());
        pacienteDTO.setEmail(paciente.getEmail());
        pacienteDTO.setFechaIngreso(paciente.getFechaIngreso());
        //datos del domicilio
        pacienteDTO.setCalle(paciente.getDomicilio().getCalle());
        pacienteDTO.setNumero(paciente.getDomicilio().getNumero());
        pacienteDTO.setLocalidadProvincia(paciente.getDomicilio().getLocalidad() + " " + paciente.getDomicilio().getProvincia());

        return pacienteDTO;
    }

    public Paciente pacienteDTOAPaciente(PacienteDTO pacienteDTO){
        Optional<Paciente> pacienteBuscado = IPacienteRepository.findById(pacienteDTO.getId());
        Paciente paciente = new Paciente();
        if (pacienteBuscado.isPresent()){
            paciente.setId(pacienteBuscado.get().getId());
            paciente.setNombre(pacienteBuscado.get().getNombre());
            paciente.setApellido(pacienteBuscado.get().getApellido());
            paciente.setCedula(pacienteBuscado.get().getCedula());
            paciente.setFechaIngreso(pacienteBuscado.get().getFechaIngreso());
            paciente.setDomicilio(pacienteBuscado.get().getDomicilio());
            paciente.setEmail(pacienteBuscado.get().getEmail());
        }
        return paciente;
    }
}
