package com.unifil.doccom.service.inter;

import com.unifil.doccom.model.Medicamento;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IMedicamentoService {

    Medicamento cadastrarMedicamento(Medicamento medicamento);

    List<Medicamento> listarMedicamentos();

    Medicamento buscarMedicamentoPorId(Long id);

    void excluirMedicamento(Long id);

    void alterarMedicamento(Medicamento medicamento);

    List<Medicamento> buscarMedicamentoPorNome(String nome);

}
