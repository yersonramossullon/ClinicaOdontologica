package com.digitalhouse.ClinicaOdontologica.Exception;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LogManager.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<String> manejoResourceNotFoundException(ResourceNotFoundException err){
        return new ResponseEntity<>("mensaje: " + err.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> manejoBadRequestException(BadRequestException err){
        return new ResponseEntity<>("mensaje: " + err.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /*@ExceptionHandler({Exception.class})
    public ResponseEntity<?> todosLosErrores(Exception e, WebRequest req){
        logger.error("Error: {}", e.getMessage());
        return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }*/
}
