package com.unifil.doccom.service;

import com.unifil.doccom.model.Receita;
import com.unifil.doccom.repository.ReceitaRepository;
import com.unifil.doccom.service.inter.IReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceitaService implements IReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    @Override
    public Receita cadastrarReceita(Receita receita) {
        if (receita.getPaciente() == null || receita.getMedico() == null || receita.getFarmacia() == null) {
            return null;
        }

        return receitaRepository.save(receita);
    }

    @Override
    public List<Receita> listarReceitas() {
        return receitaRepository.findAll();
    }

    @Override
    public Receita buscarReceitaPorId(Long id) {
        if (id <= 0) {
            return null;
        }

        return receitaRepository.getReferenceById(id);
    }

    @Override
    public void excluirReceita(Long id) {
        if (id <= 0) {
            return;
        }

        receitaRepository.deleteById(id);
    }

    @Override
    public void alterarReceita(Receita receita) {
        if (receita.getIDReceita() == null) {
            return;
        }
        receitaRepository.save(receita);
    }

    @Override
    public List<Receita> buscarReceitaPorMedicamento(String nome) {
        return receitaRepository.findReceitasByMedicamento(nome);
    }
}
