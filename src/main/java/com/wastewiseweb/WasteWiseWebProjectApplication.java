package com.wastewiseweb;

import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.repository.RegularUserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WasteWiseWebProjectApplication {

	@Autowired
	private RegularUserRepository regularUserRepository;
	public static void main(String[] args) {
		SpringApplication.run(WasteWiseWebProjectApplication.class, args);
	}
//	@PostConstruct
//	public void insertData(){
//		var user = new RegularUserEntity();
//		user.setFirstName("carina");
//		user.setEmail("carina@mail.com");
//		user.setLastName("nistor");
//		user.setPhoneNumber("123456");
//		user.setAddress("caransebes");
//		user.setPassword("parola");
//		regularUserRepository.save(user);
//	}

}
