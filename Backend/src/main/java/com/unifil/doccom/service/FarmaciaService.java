package com.unifil.doccom.service;

import com.unifil.doccom.model.Farmacia;
import com.unifil.doccom.repository.FarmaciaRepository;
import com.unifil.doccom.service.inter.IFarmaciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmaciaService implements IFarmaciaService {

    @Autowired
    private FarmaciaRepository farmaciaRepository;

    @Override
    public Farmacia cadastrarFarmacia(Farmacia farmacia) {
        if(farmacia.getNomeFarmacia() == null || farmacia.getNomeFarmacia().isEmpty()){
            return null;
        }

        return farmaciaRepository.save(farmacia);
    }

    @Override
    public List<Farmacia> listarFarmacias() {
        return farmaciaRepository.findAll();
    }

    @Override
    public Farmacia buscarFarmaciaPorId(Long id) {
        if(id <= 0){
            return null;
        }

        return farmaciaRepository.getReferenceById(id);
    }

    @Override
    public void excluirFarmacia(Long id) {
        if(id <= 0){
            return;
        }

        farmaciaRepository.deleteById(id);
    }

    @Override
    public void alterarFarmacia(Farmacia farmacia) {
        if(farmacia.getIDFarmacia() == null){
            return;
        }
        farmaciaRepository.save(farmacia);
    }

    @Override
    public List<Farmacia> buscarFarmaciaPorNome(String nome) {
        return farmaciaRepository.findByNome(nome);
    }
}
