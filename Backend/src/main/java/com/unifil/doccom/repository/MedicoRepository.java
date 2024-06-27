package com.unifil.doccom.repository;

import com.unifil.doccom.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

    @Query("SELECT m FROM Medico m WHERE m.nomeMedico = :nomeMedico")
    List<Medico> findByNome(@Param("nomeMedico") String local);

}

