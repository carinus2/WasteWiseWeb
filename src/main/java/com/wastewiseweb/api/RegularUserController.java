package com.wastewiseweb.api;

import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.service.RegularUserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.print.attribute.standard.Media;
import java.util.List;

@RestController
@RequestMapping("/api/regular-users")
public class RegularUserController {
    private final RegularUserService regularUserService;
    public RegularUserController(RegularUserService regularUserService){
        this.regularUserService = regularUserService;
    }

    @RequestMapping(method = RequestMethod.GET)//echivalente asta de sus cu asta de jos
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RegularUserDto>> getRegularUsers(){
        return ResponseEntity.ok(regularUserService.getUsers());
    }

}
