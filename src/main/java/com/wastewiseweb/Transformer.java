package com.wastewiseweb;

import com.wastewiseweb.dto.CollectorDto;
import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.entity.CollectorEntity;
import com.wastewiseweb.entity.RegularUserEntity;

public class Transformer {

    public static RegularUserDto toDto(RegularUserEntity entity){
        var dto = new RegularUserDto();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setPassword(entity.getPassword());
        dto.setHomeAddress(entity.getAddress());
        return dto;
    }

    public static RegularUserEntity fromDto(RegularUserDto dto){
        var entity = new RegularUserEntity();
        entity.setId(dto.getId());
        entity.setEmail(dto.getEmail());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setPassword(dto.getPassword());
        entity.setAddress(dto.getHomeAddress());
        return entity;
    }

    public static CollectorDto toDto(CollectorEntity entity){
        var dto = new CollectorDto();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setPassword(entity.getPassword());
        dto.setCabID(entity.getCabID());
        return dto;
    }

    public static CollectorEntity fromDto(CollectorDto dto){
        var entity = new CollectorEntity();
        entity.setId(dto.getId());
        entity.setEmail(dto.getEmail());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setPassword(dto.getPassword());
        entity.setCabID(dto.getCabID());
        return entity;
    }

}
