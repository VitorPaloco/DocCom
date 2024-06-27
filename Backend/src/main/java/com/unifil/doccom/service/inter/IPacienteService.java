package com.unifil.doccom.service.inter;

import com.unifil.doccom.model.Paciente;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IPacienteService {

    Paciente cadastrarPaciente(Paciente paciente);

    List<Paciente> listarPacientes();

    Paciente buscarPacientePorId(Long id);

    void excluirPaciente(Long id);

    void alterarPaciente(Paciente paciente);

    List<Paciente> buscarPacientePorNome(String nome);

}
