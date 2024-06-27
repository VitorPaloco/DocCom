package com.unifil.doccom.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.Date;

@Entity
@Table(name = "PACIENTE")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Paciente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDPaciente;

    @Column(name = "NOME_PACIENTE")
    private String nomePaciente;

    @Column(name = "CPF_PACIENTE")
    private String cpfPaciente;

    @Column(name = "NASCIMENTO_PACIENTE")
    private Date nascimentoPaciente;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Paciente paciente = (Paciente) o;
        return Objects.equals(IDPaciente, paciente.IDPaciente) &&
                Objects.equals(nomePaciente, paciente.nomePaciente) &&
                Objects.equals(cpfPaciente, paciente.cpfPaciente);
    }

    @Override
    public int hashCode() {
        return Objects.hash(IDPaciente, nomePaciente, cpfPaciente, nascimentoPaciente);
    }
}
