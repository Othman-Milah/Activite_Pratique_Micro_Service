package org.id.inventoryservice.repositories;

import org.id.inventoryservice.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestController
public interface ProductRepository extends JpaRepository<Product, Long> {
}
