package com.digitalhouse.ClinicaOdontologica.Exception;

public class BadRequestException extends Exception{
    public BadRequestException(String mensaje){
        super(mensaje);
    }

}
