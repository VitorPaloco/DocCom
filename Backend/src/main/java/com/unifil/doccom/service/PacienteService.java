package com.unifil.doccom.service;

import com.unifil.doccom.model.Paciente;
import com.unifil.doccom.repository.PacienteRepository;
import com.unifil.doccom.service.inter.IPacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService implements IPacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Override
    public Paciente cadastrarPaciente(Paciente paciente) {
        if(paciente.getNomePaciente() == null || paciente.getNomePaciente().isEmpty()){
            return null;
        }

        return pacienteRepository.save(paciente);
    }

    @Override
    public List<Paciente> listarPacientes() {
        return pacienteRepository.findAll();
    }

    @Override
    public Paciente buscarPacientePorId(Long id) {
        if(id <= 0){
            return null;
        }

        return pacienteRepository.getReferenceById(id);
    }

    @Override
    public void excluirPaciente(Long id) {
        if(id <= 0){
            return;
        }

        pacienteRepository.deleteById(id);
    }

    @Override
    public void alterarPaciente(Paciente paciente) {
        if(paciente.getIDPaciente() == null){
            return;
        }
        pacienteRepository.save(paciente);
    }

    @Override
    public List<Paciente> buscarPacientePorNome(String nome) {
        return pacienteRepository.findByNome(nome);
    }
}
