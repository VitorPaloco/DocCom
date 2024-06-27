package com.unifil.doccom.service.inter;

import com.unifil.doccom.model.Farmacia;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IFarmaciaService {

    Farmacia cadastrarFarmacia(Farmacia farmacia);

    List<Farmacia> listarFarmacias();

    Farmacia buscarFarmaciaPorId(Long id);

    void excluirFarmacia(Long id);

    void alterarFarmacia(Farmacia farmacia);

    List<Farmacia> buscarFarmaciaPorNome(String nome);

}
