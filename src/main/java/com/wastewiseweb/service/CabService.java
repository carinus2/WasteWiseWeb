package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.CabDto;
import com.wastewiseweb.entity.CabEntity;
import com.wastewiseweb.repository.CabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public CabDto updateCab(Integer id, CabDto cabDto) {
        CabEntity cabEntity = cabRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cab not found with id: " + id));
        cabEntity.setPlateNumber(cabDto.getPlateNumber());
        cabEntity.setId(cabDto.getCollectorId());
        CabEntity updatedCab = cabRepository.save(cabEntity);

        return transformer.toDto(updatedCab);
    }


    @Transactional
    public void deleteCab(Integer id) {
        cabRepository.deleteById(id);
    }
}
