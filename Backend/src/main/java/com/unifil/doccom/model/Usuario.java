package com.unifil.doccom.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "USUARIO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDUsuario;

    @Column(name = "NOME_USUARIO")
    private String nomeUSUARIO;

    @Column(name = "SENHA_USUARIO")
    private String senhaUsuario;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(IDUsuario, usuario.IDUsuario) && Objects.equals(nomeUSUARIO, usuario.nomeUSUARIO) && Objects.equals(senhaUsuario, usuario.senhaUsuario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(IDUsuario, nomeUSUARIO, senhaUsuario);
    }
}
