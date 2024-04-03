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

    public RecyclableItemsService(RecyclableItemsRepository recyclableItemsRepository) {
        this.recyclableItemsRepository = recyclableItemsRepository;
    }

    public List<RecyclableItemsDto> getRecyclableItems(){
        return recyclableItemsRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public RecyclableItemsDto addRecyclableItem(RecyclableItemsDto recyclableItemDto){
        RecyclableItemsEntity recyclableItemEntity = Transformer.fromDto(recyclableItemDto);
        RecyclableItemsEntity savedRecyclableItem = recyclableItemsRepository.save(recyclableItemEntity);
        return Transformer.toDto(savedRecyclableItem);
    }
}
