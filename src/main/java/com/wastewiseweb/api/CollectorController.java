package com.wastewiseweb.api;

import com.wastewiseweb.dto.CollectorDto;
import com.wastewiseweb.service.CollectorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collectors")
public class CollectorController {
    private final CollectorService collectorService;

    public CollectorController(CollectorService collectorService) {
        this.collectorService = collectorService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CollectorDto>> getCollectors() {
        return ResponseEntity.ok(collectorService.getCollectors());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CollectorDto> addCollector(@RequestBody CollectorDto collectorDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(collectorService.addCollector(collectorDto));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CollectorDto> updateCollector(@PathVariable Integer id, @RequestBody CollectorDto collectorDto) {
        return ResponseEntity.ok(collectorService.updateCollector(id, collectorDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollector(@PathVariable Integer id) {
        collectorService.deleteCollector(id);
        return ResponseEntity.ok().build();
    }
}
