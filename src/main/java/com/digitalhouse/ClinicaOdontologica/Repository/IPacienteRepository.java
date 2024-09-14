package com.digitalhouse.ClinicaOdontologica.Repository;

import com.digitalhouse.ClinicaOdontologica.Entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IPacienteRepository extends JpaRepository<Paciente,Long> {
    // consultas manuales
    Optional<Paciente> findByEmail(String correo);

}
