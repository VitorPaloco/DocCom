package com.unifil.doccom.service;

import com.unifil.doccom.model.Medicamento;
import com.unifil.doccom.repository.MedicamentoRepository;
import com.unifil.doccom.service.inter.IMedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicamentoService implements IMedicamentoService {

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Override
    public Medicamento cadastrarMedicamento(Medicamento medicamento) {
        if(medicamento.getNomeMedicamento() == null || medicamento.getNomeMedicamento().isEmpty()){
            return null;
        }

        return medicamentoRepository.save(medicamento);
    }

    @Override
    public List<Medicamento> listarMedicamentos() {
        return medicamentoRepository.findAll();
    }

    @Override
    public Medicamento buscarMedicamentoPorId(Long id) {
        if(id <= 0){
            return null;
        }

        return medicamentoRepository.getReferenceById(id);
    }

    @Override
    public void excluirMedicamento(Long id) {
        if(id <= 0){
            return;
        }

        medicamentoRepository.deleteById(id);
    }

    @Override
    public void alterarMedicamento(Medicamento medicamento) {
        if(medicamento.getIDMedicamento() == null){
            return;
        }
        medicamentoRepository.save(medicamento);
    }

    @Override
    public List<Medicamento> buscarMedicamentoPorNome(String nome) {
        return medicamentoRepository.findByNome(nome);
    }
}
