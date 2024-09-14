package com.digitalhouse.ClinicaOdontologica.Service;

import com.digitalhouse.ClinicaOdontologica.Entity.Odontologo;
import com.digitalhouse.ClinicaOdontologica.Repository.IOdontologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {
    @Autowired
    private IOdontologoRepository IOdontologoRepository;

    public Odontologo guardarOdontologo(Odontologo odontologo){
        return IOdontologoRepository.save(odontologo);
    }

    public void actualizarOdontologo(Odontologo odontologo){
        IOdontologoRepository.save(odontologo);
    }

    public void eliminarOdontologo(Long id){
        IOdontologoRepository.deleteById(id);
    }

    public Optional<Odontologo> buscarPorId(Long id){
        return IOdontologoRepository.findById(id);
    }

    public Optional<Odontologo> buscarPorMatricula(String matricula){
        return  IOdontologoRepository.findByMatricula(matricula);
    }

    public List<Odontologo> listarTodosLosOdontologos(){
        return IOdontologoRepository.findAll();
    }
}
