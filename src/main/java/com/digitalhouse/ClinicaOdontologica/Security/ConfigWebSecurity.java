package com.digitalhouse.ClinicaOdontologica.Security;

import com.digitalhouse.ClinicaOdontologica.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
//que habilite el modulo de seguridad.
public class ConfigWebSecurity{
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    //necesitamos, autenticar, y dar autorizaciones
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(usuarioService);
        return provider;
    }
    //ahora necesitamos otorgan las autorizaciones
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authz) -> authz
                        // Permitir acceso a la página principal index.html para todos
                        .requestMatchers("/").permitAll()
                        // Permitir que el USER pueda trabajar con los turnos y buscar pacientes/odontólogos
                        .requestMatchers("/turno/**", "/odontologo/buscar/**", "/paciente/buscar/**").hasAuthority("ROLE_USER")
                        // Permitir que el ADMIN pueda acceder a todos los endpoints
                        .requestMatchers("/paciente/**", "/odontologo/**", "/turno/**").hasAuthority("ROLE_ADMIN")
                        // Cualquier otro endpoint requiere autenticación
                        .anyRequest().authenticated()
                )
                .formLogin(withDefaults())
                .logout(withDefaults());
        return http.build();
    }

}
