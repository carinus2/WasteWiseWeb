package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.EditUserDto;
import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.repository.RegularUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Ref;
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
    public EditUserDto editUser(EditUserDto editUserDto){
        RegularUserEntity userEntity = regularUserRepository.findById(editUserDto.getId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + editUserDto.getId()));

        userEntity.setFirstName(editUserDto.getFirstName());
        userEntity.setLastName(editUserDto.getLastName());
        userEntity.setAddress(editUserDto.getHomeAddress());
        userEntity.setPhoneNumber(editUserDto.getPhoneNumber());
        userEntity.setEmail(editUserDto.getEmail());

        RegularUserEntity updatedUser = regularUserRepository.save(userEntity);
        return Transformer.toEditDto(updatedUser);
    }
}