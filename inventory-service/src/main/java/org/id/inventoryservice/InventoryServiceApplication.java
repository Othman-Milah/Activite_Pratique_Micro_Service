package org.id.inventoryservice;

import org.id.inventoryservice.entities.Product;
import org.id.inventoryservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class InventoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(ProductRepository productRepository, RepositoryRestConfiguration restConfiguration){
		restConfiguration.exposeIdsFor(Product.class);
		return args->{
			productRepository.save(new Product(null, "Computer desk top hp", 900.00));
			productRepository.save(new Product(null, "printer Epson", 80.00));
			productRepository.save(new Product(null, "MacBook pro lab top", 1800.00));
			productRepository.findAll().forEach(System.out::println);

		};
	}

}
