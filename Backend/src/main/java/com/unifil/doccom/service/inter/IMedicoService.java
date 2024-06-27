package com.unifil.doccom.service.inter;

import com.unifil.doccom.model.Medico;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IMedicoService {

    Medico cadastrarMedico(Medico medico);

    List<Medico> listarMedicos();

    Medico buscarMedicoPorId(Long id);

    void excluirMedico(Long id);

    void alterarMedico(Medico farmacia);

    List<Medico> buscarMedicoPorNome(String nome);

}
