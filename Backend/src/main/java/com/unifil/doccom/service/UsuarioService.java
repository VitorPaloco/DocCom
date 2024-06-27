package com.unifil.doccom.service;

import com.unifil.doccom.model.Usuario;
import com.unifil.doccom.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean login(String nomeUSUARIO, String senhaUsuario) {
        Usuario usuario = usuarioRepository.findByNomeUSUARIO(nomeUSUARIO);
        return usuario != null && usuario.getSenhaUsuario().equals(senhaUsuario);
    }

    public boolean cadastrar(Usuario usuario) {
        if (usuarioRepository.findByNomeUSUARIO(usuario.getNomeUSUARIO()) != null) {
            return false;
        }
        usuarioRepository.save(usuario);
        return true;
    }
}
