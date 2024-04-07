package com.wastewiseweb.auth.authentication.api;

import com.wastewiseweb.auth.JwtUtil;
import com.wastewiseweb.auth.authentication.model.AuthenticationRequest;
import com.wastewiseweb.auth.authentication.model.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.GrantedAuthority;


@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtils;

    public AuthenticationController(AuthenticationManager authenticationManager, JwtUtil jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticateUser( @RequestBody AuthenticationRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        var roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        var jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new AuthenticationResponse(jwt, roles));
    }
}
