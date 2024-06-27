package com.unifil.doccom.controller;

import com.unifil.doccom.model.Receita;
import com.unifil.doccom.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receita")
@CrossOrigin
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    public ReceitaController(ReceitaService receitaService) {
        super();
        this.receitaService = receitaService;
    }

    @GetMapping("/listarReceitas")
    public List<Receita> listarReceitas() {
        return receitaService.listarReceitas();
    }

    @PostMapping("/cadastrarReceita")
    public ResponseEntity<Receita> cadastrarReceita(@RequestBody Receita receita) {
        return new ResponseEntity<>(receitaService.cadastrarReceita(receita), HttpStatus.OK);
    }

    @GetMapping("/buscarReceita/{id}")
    public ResponseEntity<Receita> buscarReceita(@PathVariable Long id) {
        Receita receita = receitaService.buscarReceitaPorId(id);
        if (receita == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(receita, HttpStatus.OK);
    }

    @DeleteMapping("/excluirReceita/{id}")
    public ResponseEntity<Void> excluirReceita(@PathVariable Long id) {
        receitaService.excluirReceita(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/alterarReceita")
    public ResponseEntity<Receita> alterarReceita(@RequestBody Receita receita) {
        receitaService.alterarReceita(receita);
        return new ResponseEntity<>(receita, HttpStatus.OK);
    }

    @GetMapping("/buscarReceitasPorMedicamento/{nomeMedicamento}")
    public ResponseEntity<List<Receita>> buscarReceitasPorMedicamento(@PathVariable String nomeMedicamento) {
        List<Receita> receitas = receitaService.buscarReceitaPorMedicamento(nomeMedicamento);
        if (receitas == null || receitas.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(receitas, HttpStatus.OK);
    }
}
