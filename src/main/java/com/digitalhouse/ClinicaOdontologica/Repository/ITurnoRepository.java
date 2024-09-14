package com.digitalhouse.ClinicaOdontologica.Repository;

import com.digitalhouse.ClinicaOdontologica.Entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITurnoRepository extends JpaRepository<Turno, Long> {

}
