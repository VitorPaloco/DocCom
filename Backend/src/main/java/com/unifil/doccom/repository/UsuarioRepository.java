package com.unifil.doccom.repository;

import com.unifil.doccom.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByNomeUSUARIO(String nomeUSUARIO);
}
