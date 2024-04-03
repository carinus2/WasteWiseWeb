package com.wastewiseweb.api;

import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.service.RegularUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.util.List;

@RestController
@RequestMapping("/api/regular-users")
public class RegularUserController {
    private final RegularUserService regularUserService;
    public RegularUserController(RegularUserService regularUserService){
        this.regularUserService = regularUserService;
    }

  //  @RequestMapping(method = RequestMethod.GET)//echivalente asta de sus cu asta de jos
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RegularUserDto>> getRegularUsers(){
        return ResponseEntity.ok(regularUserService.getUsers());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RegularUserDto> addUser(@RequestBody RegularUserDto regularUserDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(regularUserService.addUser(regularUserDto));
    }

}
