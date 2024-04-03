package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.CabDto;
import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.entity.CabEntity;
import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.repository.CabRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CabService {

    private final CabRepository cabRepository;

    @Autowired
    public CabService(CabRepository cabRepository) {
        this.cabRepository = cabRepository;
    }

    public List<CabDto> getCabs(){
        return cabRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public CabDto addCab(CabDto cabDto){
        CabEntity cabEntity = Transformer.fromDto(cabDto);
        CabEntity savedCab = cabRepository.save(cabEntity);
        return Transformer.toDto(savedCab);
    }
}
