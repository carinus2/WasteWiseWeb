package com.wastewiseweb.api;

import com.wastewiseweb.dto.CollectorDto;
import com.wastewiseweb.service.CollectorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.util.List;

@RestController
@RequestMapping("/api/collectors")
public class CollectorController {
    private final CollectorService collectorService;
    public CollectorController(CollectorService collectorService){
        this.collectorService = collectorService;
    }

    //  @RequestMapping(method = RequestMethod.GET)//echivalente asta de sus cu asta de jos
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CollectorDto>> getCollectors(){
        return ResponseEntity.ok(collectorService.getCollectors());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CollectorDto> addCollector(@RequestBody CollectorDto collectorDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(collectorService.addCollector(collectorDto));
    }

}
