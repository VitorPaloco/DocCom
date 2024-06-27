package com.unifil.doccom.controller;

import com.unifil.doccom.model.Medico;
import com.unifil.doccom.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medico")
@CrossOrigin
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        super();
        this.medicoService = medicoService;
    }

    @GetMapping(path = "/listarMedicos")
    public List<Medico> listarMedicos() {
        return medicoService.listarMedicos();
    }

    @PostMapping(path = "/cadastrarMedico")
    public ResponseEntity<Medico> cadastrarMedico(@RequestBody Medico medico) {
        System.out.println(medico.getNomeMedico());
        return new ResponseEntity<>(medicoService.cadastrarMedico(medico), HttpStatus.OK);
    }

    @GetMapping("/buscarMedico/{id}")
    public ResponseEntity<Medico> buscarMedico(@PathVariable Long id) {
        Medico medico = medicoService.buscarMedicoPorId(id);
        if (medico == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medico, HttpStatus.OK);
    }

    @DeleteMapping("/excluirMedico/{id}")
    public ResponseEntity<Void> excluirMedico(@PathVariable Long id) {
        medicoService.excluirMedico(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/alterarMedico")
    public ResponseEntity<Medico> alterarMedico(@RequestBody Medico medico) {
        medicoService.alterarMedico(medico);
        return new ResponseEntity<>(medico, HttpStatus.OK);
    }

    @GetMapping("/buscarMedicoPorNome/{nome}")
    public ResponseEntity<List<Medico>> buscarMedicoPorNome(@PathVariable String nome) {
        List<Medico> medicos = medicoService.buscarMedicoPorNome(nome);
        if (medicos == null || medicos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicos, HttpStatus.OK);
    }
}


