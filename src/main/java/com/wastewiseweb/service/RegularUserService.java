package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.repository.RegularUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegularUserService {

    private final RegularUserRepository regularUserRepository;

    @Autowired
    public RegularUserService(RegularUserRepository regularUserRepository){
        this.regularUserRepository=regularUserRepository;
    }

    public List<RegularUserDto> getUsers(){
        return regularUserRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public RegularUserDto addUser(RegularUserDto regularUserDto){
        RegularUserEntity userEntity = Transformer.fromDto(regularUserDto);
        RegularUserEntity savedUser = regularUserRepository.save(userEntity);
        return Transformer.toDto(savedUser);
    }
}
