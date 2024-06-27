package com.unifil.doccom.repository;

import com.unifil.doccom.model.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

    @Query("SELECT m FROM Medicamento m WHERE m.nomeMedicamento = :nomeMedicamento")
    List<Medicamento> findByNome(@Param("nomeMedicamento") String local);

}

