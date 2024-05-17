package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.CollectorDto;
import com.wastewiseweb.entity.CabEntity;
import com.wastewiseweb.entity.CollectorEntity;
import com.wastewiseweb.repository.CabRepository;
import com.wastewiseweb.repository.CollectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectorService {

    private final CollectorRepository collectorRepository;
    private final CabRepository cabRepository;

    @Autowired
    public CollectorService(CollectorRepository collectorRepository, CabRepository cabRepository) {
        this.collectorRepository = collectorRepository;
        this.cabRepository = cabRepository;
    }

    public List<CollectorDto> getCollectors() {
        return collectorRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public CollectorEntity findCollectorById(Integer id) {
        return collectorRepository.findById(id).orElse(null);
    }

    public CollectorDto addCollector(CollectorDto collectorDto) {
        CollectorEntity collectorEntity = Transformer.fromDto(collectorDto);
        CollectorEntity savedCollector = collectorRepository.save(collectorEntity);
        return Transformer.toDto(savedCollector);
    }

    public CollectorDto updateCollector(Integer id, CollectorDto collectorDto) {
        CollectorEntity existingCollector = collectorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collector not found with id " + id));

        existingCollector.setFirstName(collectorDto.getFirstName());
        existingCollector.setLastName(collectorDto.getLastName());
        existingCollector.setPhoneNumber(collectorDto.getPhoneNumber());
        existingCollector.setEmail(collectorDto.getEmail());

        if (collectorDto.getCabID() != null) {
            CabEntity cabEntity = cabRepository.findById(collectorDto.getCabID())
                    .orElseThrow(() -> new RuntimeException("Cab not found with id " + collectorDto.getCabID()));
            existingCollector.setCabID(cabEntity);
        }

        CollectorEntity updatedCollector = collectorRepository.save(existingCollector);
        return Transformer.toDto(updatedCollector);
    }

    public void deleteCollector(Integer id) {
        collectorRepository.deleteById(id);
    }
}
