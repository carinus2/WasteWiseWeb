package com.wastewiseweb.api;

import com.wastewiseweb.dto.CabDto;
import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.service.CabService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cabs")
public class CabController {

    private final CabService cabService;

    public CabController(CabService cabService) {
        this.cabService = cabService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CabDto>> getCabs(){
        return ResponseEntity.ok(cabService.getCabs());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CabDto> addCab(@RequestBody CabDto cabDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(cabService.addCab(cabDto));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CabDto> updateCab(@PathVariable Integer id, @RequestBody CabDto cabDto) {
        return ResponseEntity.ok(cabService.updateCab(id, cabDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCab(@PathVariable Integer id) {
        cabService.deleteCab(id);
        return ResponseEntity.ok().build();
    }
}
