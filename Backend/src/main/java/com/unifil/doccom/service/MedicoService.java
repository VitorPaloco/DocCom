package com.unifil.doccom.service;

import com.unifil.doccom.model.Medico;
import com.unifil.doccom.repository.MedicoRepository;
import com.unifil.doccom.service.inter.IMedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoService implements IMedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Override
    public Medico cadastrarMedico(Medico farmacia) {
        if (farmacia.getNomeMedico() == null || farmacia.getNomeMedico().isEmpty()) {
            return null;
        }

        return medicoRepository.save(farmacia);
    }

    @Override
    public List<Medico> listarMedicos() {
        return medicoRepository.findAll();
    }

    @Override
    public Medico buscarMedicoPorId(Long id) {
        if (id <= 0) {
            return null;
        }

        return medicoRepository.getReferenceById(id);
    }

    @Override
    public void excluirMedico(Long id) {
        if (id <= 0) {
            return;
        }

        medicoRepository.deleteById(id);
    }

    @Override
    public void alterarMedico(Medico pessoa) {
        if (pessoa.getIDMedico() == null) {
            return;
        }
        medicoRepository.save(pessoa);
    }

    @Override
    public List<Medico> buscarMedicoPorNome(String nome) {
        return medicoRepository.findByNome(nome);
    }
}
