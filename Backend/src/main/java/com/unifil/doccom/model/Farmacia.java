package com.unifil.doccom.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "FARMACIA")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Farmacia implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDFarmacia;

    @Column(name = "NOME_FARMACIA")
    private String nomeFarmacia;

    @Column(name = "CNPJ_FARMACIA")
    private String cnpjFarmacia;

    @Column(name = "SENHA_FARMACIA")
    private String senhaFarmacia;

    @Column(name = "LOCAL_FARMACIA")
    private String localFarmacia;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Farmacia farmacia = (Farmacia) o;
        return Objects.equals(IDFarmacia, farmacia.IDFarmacia) &&
                Objects.equals(nomeFarmacia, farmacia.nomeFarmacia) &&
                Objects.equals(cnpjFarmacia, farmacia.cnpjFarmacia) &&
                Objects.equals(senhaFarmacia, farmacia.senhaFarmacia) &&
                Objects.equals(localFarmacia, farmacia.localFarmacia);
    }

    @Override
    public int hashCode() {
        return Objects.hash(IDFarmacia, nomeFarmacia, cnpjFarmacia, senhaFarmacia, localFarmacia);
    }
}
