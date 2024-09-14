package com.digitalhouse.ClinicaOdontologica.Service;

import com.digitalhouse.ClinicaOdontologica.Dto.TurnoDTO;
import com.digitalhouse.ClinicaOdontologica.Entity.Turno;
import com.digitalhouse.ClinicaOdontologica.Repository.ITurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
    @Autowired
    private ITurnoRepository ITurnoRepository;

    public TurnoDTO guardarTurno(Turno turno){
        Turno turnoGuardado = ITurnoRepository.save(turno);
        return turnoATurnoDto(turnoGuardado);
    }
    public void actualizarTurno(Turno turno){
        ITurnoRepository.save(turno);
    }

    public void eliminarTruno(long id){
        ITurnoRepository.deleteById(id);
    }

    public Optional<Turno> buscarPorId(Long id){
        return ITurnoRepository.findById(id);
    }

    public List<Turno> listarTodosLosTurnos(){
        return ITurnoRepository.findAll();
    }

    public TurnoDTO turnoATurnoDto(Turno turno){
        TurnoDTO turnoDTO = new TurnoDTO();
        turnoDTO.setId(turno.getId());
        turnoDTO.setFecha(turno.getFecha());
        turnoDTO.setOdontologo_id(turno.getOdontologo().getId());
        turnoDTO.setPaciente_id(turno.getPaciente().getId());
        return turnoDTO;
    }

}
