package org.id.customerservice;

import org.id.customerservice.entities.Customer;
import org.id.customerservice.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class CustomerserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerserviceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(CustomerRepository customerRepository, RepositoryRestConfiguration restConfiguration){
		restConfiguration.exposeIdsFor(Customer.class);
		return args ->{
			customerRepository.save(new Customer(null, "Enset", "contact@enset-media.ma"));
			customerRepository.save(new Customer(null, "FSTM", "contact@fstm.ma"));
			customerRepository.save(new Customer(null, "ENSAM", "contact@ESAM.ma"));
			customerRepository.findAll().forEach(System.out::println);

		};
	}
}
