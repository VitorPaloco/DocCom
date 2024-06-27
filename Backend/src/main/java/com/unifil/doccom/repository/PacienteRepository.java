package com.unifil.doccom.repository;

import com.unifil.doccom.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query("SELECT p FROM Paciente p WHERE p.nomePaciente = :nomePaciente")
    List<Paciente> findByNome(@Param("nomePaciente") String local);

}

