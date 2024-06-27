package com.unifil.doccom.controller;

import com.unifil.doccom.model.Paciente;
import com.unifil.doccom.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paciente")
@CrossOrigin
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        super();
        this.pacienteService = pacienteService;
    }

    @GetMapping(path = "/listarPacientes")
    public List<Paciente> listarPacientes() {
        return pacienteService.listarPacientes();
    }

    @PostMapping(path = "/cadastrarPaciente")
    public ResponseEntity<Paciente> cadastrarFarmacia(@RequestBody Paciente paciente) {
        System.out.println(paciente.getNomePaciente());
        return new ResponseEntity<>(pacienteService.cadastrarPaciente(paciente), HttpStatus.OK);
    }

    @GetMapping("/buscarPaciente/{id}")
    public ResponseEntity<Paciente> buscarPaciente(@PathVariable Long id) {
        Paciente paciente = pacienteService.buscarPacientePorId(id);
        if (paciente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(paciente, HttpStatus.OK);
    }

    @DeleteMapping("/excluirPaciente/{id}")
    public ResponseEntity<Void> excluirPaciente(@PathVariable Long id) {
        pacienteService.excluirPaciente(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/alterarPaciente")
    public ResponseEntity<Paciente> alterarPaciente(@RequestBody Paciente paciente) {
        pacienteService.alterarPaciente(paciente);
        return new ResponseEntity<>(paciente, HttpStatus.OK);
    }

    @GetMapping("/buscarPacientePorNome/{nome}")
    public ResponseEntity<List<Paciente>> buscarPacientePorNome(@PathVariable String nome) {
        List<Paciente> pacientes = pacienteService.buscarPacientePorNome(nome);
        if (pacientes == null || pacientes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pacientes, HttpStatus.OK);
    }
}


