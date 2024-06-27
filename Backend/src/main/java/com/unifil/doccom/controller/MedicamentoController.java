package com.unifil.doccom.controller;

import com.unifil.doccom.model.Medicamento;
import com.unifil.doccom.service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicamento")
@CrossOrigin
public class MedicamentoController {

    @Autowired
    private MedicamentoService medicamentoService;

    public MedicamentoController(MedicamentoService medicamentoService) {
        super();
        this.medicamentoService = medicamentoService;
    }

    @GetMapping(path = "/listarMedicamentos")
    public List<Medicamento> listarMedicamentos() {
        return medicamentoService.listarMedicamentos();
    }

    @PostMapping(path = "/cadastrarMedicamento")
    public ResponseEntity<Medicamento> cadastrarMedicamento(@RequestBody Medicamento medicamento) {
        System.out.println(medicamento.getNomeMedicamento());
        return new ResponseEntity<>(medicamentoService.cadastrarMedicamento(medicamento), HttpStatus.OK);
    }

    @GetMapping("/buscarMedicamento/{id}")
    public ResponseEntity<Medicamento> buscarMedicamento(@PathVariable Long id) {
        Medicamento medicamento = medicamentoService.buscarMedicamentoPorId(id);
        if (medicamento == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicamento, HttpStatus.OK);
    }

    @DeleteMapping("/excluirMedicamento/{id}")
    public ResponseEntity<Void> excluirMedicamento(@PathVariable Long id) {
        medicamentoService.excluirMedicamento(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/alterarMedicamento")
    public ResponseEntity<Medicamento> alterarMedicamento(@RequestBody Medicamento medicamento) {
        medicamentoService.alterarMedicamento(medicamento);
        return new ResponseEntity<>(medicamento, HttpStatus.OK);
    }

    @GetMapping("/buscarMedicamentoPorNome/{nome}")
    public ResponseEntity<List<Medicamento>> buscarMedicamentoPorNome(@PathVariable String nome) {
        List<Medicamento> medicamentos = medicamentoService.buscarMedicamentoPorNome(nome);
        if (medicamentos == null || medicamentos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicamentos, HttpStatus.OK);
    }
}


