package com.unifil.doccom.repository;

import com.unifil.doccom.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    @Query("SELECT DISTINCT r FROM Receita r JOIN r.medicamentos m WHERE m.nomeMedicamento = :nomeMedicamento")
    List<Receita> findReceitasByMedicamento(@Param("nomeMedicamento") String nomeMedicamento);

}
