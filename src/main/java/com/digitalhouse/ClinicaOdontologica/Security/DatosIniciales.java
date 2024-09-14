package com.digitalhouse.ClinicaOdontologica.Security;
import com.digitalhouse.ClinicaOdontologica.Entity.*;
import com.digitalhouse.ClinicaOdontologica.Repository.IOdontologoRepository;
import com.digitalhouse.ClinicaOdontologica.Repository.IPacienteRepository;
import com.digitalhouse.ClinicaOdontologica.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class DatosIniciales implements ApplicationRunner {
    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    IPacienteRepository pacienteRepository;
    @Autowired
    IOdontologoRepository odontologoRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        String passSinCifrar = "admin";
        String passCifrado = bCryptPasswordEncoder.encode(passSinCifrar);
        Usuario usuario = new Usuario("Jorgito","jpereyradh","jorge.pereyra@digitalhouse.com",passCifrado, UsuarioRole.ROLE_ADMIN);
        usuarioRepository.save(usuario);

        String passSinCifrar2 = "user";
        String passCifrado2 = bCryptPasswordEncoder.encode(passSinCifrar2);
        Usuario usuario2 = new Usuario("yerson","yersonrs","yerson@gmail.com",passCifrado2, UsuarioRole.ROLE_USER);
        usuarioRepository.save(usuario2);

        Paciente paciente = new Paciente();
        paciente.setNombre("yerson");
        paciente.setApellido("ramos");
        paciente.setCedula("12345678");
        paciente.setFechaIngreso(LocalDate.of(2024,1,30));
        paciente.setEmail("yerson@gmail.com");

        Domicilio domicilio = new Domicilio();
        domicilio.setCalle("los almendros");
        domicilio.setNumero(10);
        domicilio.setLocalidad("Piura");
        domicilio.setProvincia("Peru");

        paciente.setDomicilio(domicilio);

        pacienteRepository.save(paciente);

        // creamos un nuevo odontologo
        Odontologo odontologo = new Odontologo();
        odontologo.setNombre("Omar");
        odontologo.setApellido("Gonzales");
        odontologo.setMatricula("A12345");

        odontologoRepository.save(odontologo);
    }
}
