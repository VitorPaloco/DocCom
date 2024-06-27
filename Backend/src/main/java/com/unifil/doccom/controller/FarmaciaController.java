package com.unifil.doccom.controller;

import com.unifil.doccom.model.Farmacia;
import com.unifil.doccom.service.FarmaciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farmacia")
@CrossOrigin
public class FarmaciaController {

    @Autowired
    private FarmaciaService farmaciaService;

    public FarmaciaController(FarmaciaService farmaciaService) {
        super();
        this.farmaciaService = farmaciaService;
    }

    @GetMapping(path = "/listarFarmacias")
    public List<Farmacia> listarFarmacias() {
        return farmaciaService.listarFarmacias();
    }

    @PostMapping(path = "/cadastrarFarmacia")
    public ResponseEntity<Farmacia> cadastrarFarmacia(@RequestBody Farmacia farmacia) {
        System.out.println(farmacia.getNomeFarmacia());
        return new ResponseEntity<>(farmaciaService.cadastrarFarmacia(farmacia), HttpStatus.OK);
    }

    @GetMapping("/buscarFarmacia/{id}")
    public ResponseEntity<Farmacia> buscarFarmacia(@PathVariable Long id) {
        Farmacia farmacia = farmaciaService.buscarFarmaciaPorId(id);
        if (farmacia == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(farmacia, HttpStatus.OK);
    }

    @DeleteMapping("/excluirFarmacia/{id}")
    public ResponseEntity<Void> excluirFarmacia(@PathVariable Long id) {
        farmaciaService.excluirFarmacia(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/alterarFarmacia")
    public ResponseEntity<Farmacia> alterarFarmacia(@RequestBody Farmacia farmacia) {
        farmaciaService.alterarFarmacia(farmacia);
        return new ResponseEntity<>(farmacia, HttpStatus.OK);
    }

    @GetMapping("/buscarFarmaciaPorNome/{nome}")
    public ResponseEntity<List<Farmacia>> buscarFarmaciaPorNome(@PathVariable String nome) {
        List<Farmacia> farmacias = farmaciaService.buscarFarmaciaPorNome(nome);
        if (farmacias == null || farmacias.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(farmacias, HttpStatus.OK);
    }
}


