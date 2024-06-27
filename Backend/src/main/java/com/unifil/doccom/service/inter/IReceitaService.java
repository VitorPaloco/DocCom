package com.unifil.doccom.service.inter;

import com.unifil.doccom.model.Receita;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IReceitaService {

    Receita cadastrarReceita(Receita receita);

    List<Receita> listarReceitas();

    Receita buscarReceitaPorId(Long id);

    void excluirReceita(Long id);

    void alterarReceita(Receita medicamento);

    List<Receita> buscarReceitaPorMedicamento(String nome);

}
