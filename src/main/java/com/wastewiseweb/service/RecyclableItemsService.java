package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.RecyclableItemsDto;
import com.wastewiseweb.entity.RecyclableItemsEntity;
import com.wastewiseweb.repository.RecyclableItemsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecyclableItemsService {

    private final RecyclableItemsRepository recyclableItemsRepository;
    private final Transformer transformer;

    public RecyclableItemsService(RecyclableItemsRepository recyclableItemsRepository,Transformer transformer) {
        this.recyclableItemsRepository = recyclableItemsRepository;
        this.transformer = transformer;
    }

    public List<RecyclableItemsDto> getRecyclableItems(){
        return recyclableItemsRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public RecyclableItemsDto addRecyclableItem(RecyclableItemsDto recyclableItemDto){
        RecyclableItemsEntity recyclableItemEntity = transformer.fromDto(recyclableItemDto);
        RecyclableItemsEntity savedRecyclableItem = recyclableItemsRepository.save(recyclableItemEntity);
        return Transformer.toDto(savedRecyclableItem);
    }
}
