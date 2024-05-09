package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.CabDto;
import com.wastewiseweb.entity.CabEntity;
import com.wastewiseweb.entity.CollectorEntity;
import com.wastewiseweb.repository.CabRepository;
import com.wastewiseweb.repository.CollectorRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CabService {

    private final CabRepository cabRepository;
    private final CollectorRepository collectorRepository;
    private final Transformer transformer;

    @Autowired
    public CabService(CabRepository cabRepository, CollectorRepository collectorRepository, Transformer transformer) {
        this.cabRepository = cabRepository;
        this.collectorRepository = collectorRepository;
        this.transformer = transformer;
    }

    public List<CabDto> getCabs() {
        return cabRepository.findAll()
                .stream()
                .map(cabEntity -> transformer.toDto(cabEntity))
                .collect(Collectors.toList());
    }

    public CabDto addCab(CabDto cabDto) {
        CabEntity cabEntity = transformer.fromDto(cabDto);
        CabEntity savedCab = cabRepository.save(cabEntity);
        return transformer.toDto(savedCab);
    }

    public CabDto updateCab(Integer id, CabDto cabDto) {
        CabEntity existingCab = cabRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cab not found with id " + id));

        existingCab.setPlateNumber(cabDto.getPlateNumber());

        if (cabDto.getCollectorId() != null) {
            CollectorEntity collector = collectorRepository.findById(cabDto.getCollectorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Collector not found with id " + cabDto.getCollectorId()));
            existingCab.setCollector(collector);
        }

        CabEntity updatedCab = cabRepository.save(existingCab);
        return transformer.toDto(updatedCab);
    }

    @Transactional
    public void deleteCab(Integer id) {
        cabRepository.deleteById(id);
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
