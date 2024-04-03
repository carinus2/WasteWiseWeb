package com.wastewiseweb.api;

import com.wastewiseweb.dto.CabDto;
import com.wastewiseweb.dto.RecyclableItemsDto;
import com.wastewiseweb.service.RecyclableItemsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recyclable-items")
public class RecyclableItemsController {

    private final RecyclableItemsService recyclableItemsService;

    public RecyclableItemsController(RecyclableItemsService recyclableItemsService) {
        this.recyclableItemsService = recyclableItemsService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RecyclableItemsDto>> getRecyclableItems(){
        return ResponseEntity.ok(recyclableItemsService.getRecyclableItems());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RecyclableItemsDto> addRecyclableItem(@RequestBody RecyclableItemsDto recyclableItemDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(recyclableItemsService.addRecyclableItem(recyclableItemDto));
    }
}
