package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.CollectorDto;
import com.wastewiseweb.entity.CollectorEntity;
import com.wastewiseweb.repository.CollectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectorService {

    private final CollectorRepository collectorRepository;

    @Autowired
    public CollectorService(CollectorRepository collectorRepository){
        this.collectorRepository=collectorRepository;
    }

    public List<CollectorDto> getCollectors(){
        return collectorRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public CollectorEntity findCollectorById(Integer id) {
        return collectorRepository.findById(id).orElse(null);
    }

    public CollectorDto addCollector(CollectorDto collectorDto){
        CollectorEntity collectorEntity = Transformer.fromDto(collectorDto);
        CollectorEntity savedCollector = collectorRepository.save(collectorEntity);
        return Transformer.toDto(savedCollector);
    }
}
