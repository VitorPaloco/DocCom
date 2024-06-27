package com.unifil.doccom.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "MEDICAMENTO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Medicamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDMedicamento;

    @Column(name = "NOME_MEDICAMENTO")
    private String nomeMedicamento;

    @Column(name = "DOSAGEM_MEDICAMENTO")
    private double dosagem;

    @Column(name = "QUANTIDADE_MEDICAMENTO")
    private double quantidade;

    @Column(name = "OBSERVACAO_MEDICAMENTO")
    private String observacao;

    @ManyToMany(mappedBy = "medicamentos")
    @JsonIgnoreProperties("medicamentos")
    private List<Receita> receitas;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Medicamento that = (Medicamento) o;
        return Double.compare(dosagem, that.dosagem) == 0 && Double.compare(quantidade, that.quantidade) == 0 && Objects.equals(IDMedicamento, that.IDMedicamento) && Objects.equals(nomeMedicamento, that.nomeMedicamento) && Objects.equals(observacao, that.observacao) && Objects.equals(receitas, that.receitas);
    }

    @Override
    public int hashCode() {
        return Objects.hash(IDMedicamento, nomeMedicamento, dosagem, quantidade, observacao, receitas);
    }
}
