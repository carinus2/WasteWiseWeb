package com.wastewiseweb.auth.authentication.api;

import com.wastewiseweb.auth.JwtUtil;
import com.wastewiseweb.auth.authentication.model.AuthenticationRequest;
import com.wastewiseweb.auth.authentication.model.AuthenticationResponse;
import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.service.RegularUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;


@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final RegularUserService regularUserService;

    private final JwtUtil jwtUtils;

    public AuthenticationController(AuthenticationManager authenticationManager, JwtUtil jwtUtils, RegularUserService regularUserService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.regularUserService = regularUserService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticateUser(@RequestBody AuthenticationRequest request) {

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        if ("admin@email.com".equals(request.getUsername()) && "admin".equals(request.getPassword())) {
            var jwt = jwtUtils.generateAdminJwtToken(authentication);
            return ResponseEntity.ok(new AuthenticationResponse(jwt, Collections.emptyList()));
        } else{
            var jwt = jwtUtils.generateJwtToken(authentication);
            return ResponseEntity.ok(new AuthenticationResponse(jwt, Collections.emptyList()));
        }

    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegularUserDto request) {
        try {
            regularUserService.addUser(request);
            return ResponseEntity.ok().body("User registered successfully");
        } catch (Error e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}