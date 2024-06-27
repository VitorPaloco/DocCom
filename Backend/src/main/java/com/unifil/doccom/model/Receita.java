package com.unifil.doccom.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "RECEITA")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Receita implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDReceita;

    @Column(name = "DATA_RECEITA")
    private Date dataReceita;

    @ManyToOne
    @JoinColumn(name = "PACIENTE")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "MEDICO")
    private Medico medico;

    @ManyToOne
    @JoinColumn(name = "FARMACIA")
    private Farmacia farmacia;

    @ManyToMany
    @JoinTable(
            name = "RECEITA_MEDICAMENTO",
            joinColumns = @JoinColumn(name = "RECEITA_ID"),
            inverseJoinColumns = @JoinColumn(name = "MEDICAMENTO_ID")
    )
    @JsonIgnoreProperties("receitas")
    private List<Medicamento> medicamentos;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Receita receita = (Receita) o;
        return Objects.equals(IDReceita, receita.IDReceita) &&
                Objects.equals(paciente, receita.paciente) &&
                Objects.equals(medico, receita.medico) &&
                Objects.equals(farmacia, receita.farmacia) &&
                Objects.equals(medicamentos, receita.medicamentos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(IDReceita, paciente, medico, farmacia, medicamentos);
    }
}
