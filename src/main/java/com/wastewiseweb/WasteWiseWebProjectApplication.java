package com.wastewiseweb;

import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.repository.RegularUserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WasteWiseWebProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(WasteWiseWebProjectApplication.class, args);
	}
}
