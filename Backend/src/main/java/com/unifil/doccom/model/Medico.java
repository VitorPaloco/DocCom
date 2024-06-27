package com.unifil.doccom.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "MEDICO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Medico implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDMedico;

    @Column(name = "NOME_MEDICO")
    private String nomeMedico;

    @Column(name = "CRM_MEDICO")
    private String crmMedico;

    @Column(name = "SENHA_MEDICO")
    private String senhaMedico;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Medico medico = (Medico) o;
        return Objects.equals(IDMedico, medico.IDMedico) &&
                Objects.equals(nomeMedico, medico.nomeMedico) &&
                Objects.equals(crmMedico, medico.crmMedico) &&
                Objects.equals(senhaMedico, medico.senhaMedico);
    }

    @Override
    public int hashCode() {
        return Objects.hash(IDMedico, nomeMedico, crmMedico, senhaMedico);
    }
}
