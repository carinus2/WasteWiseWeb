package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.CabDto;
import com.wastewiseweb.entity.CabEntity;
import com.wastewiseweb.repository.CabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CabService {

    private final CabRepository cabRepository;
    private final Transformer transformer;

    @Autowired
    public CabService(CabRepository cabRepository, Transformer transformer) {
        this.cabRepository = cabRepository;
        this.transformer = transformer;
    }

    public List<CabDto> getCabs(){
        return cabRepository.findAll()
                .stream()
                .map(cabEntity -> transformer.toDto(cabEntity))
                .collect(Collectors.toList());
    }

    public CabDto addCab(CabDto cabDto){
        CabEntity cabEntity = transformer.fromDto(cabDto);
        CabEntity savedCab = cabRepository.save(cabEntity);
        return Transformer.toDto(savedCab);
    }
}
