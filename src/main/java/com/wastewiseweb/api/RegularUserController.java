package com.wastewiseweb.api;

import com.wastewiseweb.dto.EditUserDto;
import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.service.RegularUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/regular-users")
public class RegularUserController {
    private final RegularUserService regularUserService;
    public RegularUserController(RegularUserService regularUserService){
        this.regularUserService = regularUserService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RegularUserDto>> getRegularUsers(){
        return ResponseEntity.ok(regularUserService.getUsers());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RegularUserDto> addUser(@RequestBody RegularUserDto regularUserDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(regularUserService.addUser(regularUserDto));
    }
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EditUserDto> editUser(@PathVariable Integer id, @RequestBody EditUserDto editUserDto){
        editUserDto.setId(id);
        EditUserDto updatedUser = regularUserService.editUser(editUserDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        regularUserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


}
