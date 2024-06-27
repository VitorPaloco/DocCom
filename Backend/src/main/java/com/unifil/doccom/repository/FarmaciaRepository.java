package com.unifil.doccom.repository;

import com.unifil.doccom.model.Farmacia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FarmaciaRepository extends JpaRepository<Farmacia, Long> {

    @Query("SELECT f FROM Farmacia f WHERE f.nomeFarmacia = :nomeFarmacia")
    List<Farmacia> findByNome(@Param("nomeFarmacia") String local);

}

