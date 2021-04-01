package edu.curso;



import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controlador {
	@Autowired
	ApplicationContext ctx ;	
	@RequestMapping(
			value="/pets", 
			method=RequestMethod.GET,
			produces = {"application/JSON"})
			
	public List<Pet> listarTodos(){

		List<Pet> lista = (List<Pet>)ctx.getBean("produzLista");

		return lista;	
	}
	
	@RequestMapping(
			value="/adicionarPet", 
			method=RequestMethod.POST,
			consumes = {"application/JSON"})
	public ResponseEntity<String> adicionarPet(@RequestBody Pet a) {
		List<Pet> lista = (List<Pet>)ctx.getBean("produzLista");
		lista.add(a);
		return ResponseEntity.ok("OK");
	}
}
