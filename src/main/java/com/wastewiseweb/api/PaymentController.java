package com.wastewiseweb.api;

import com.wastewiseweb.dto.CabDto;
import com.wastewiseweb.dto.PaymentDto;
import com.wastewiseweb.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PaymentDto>> getPayments(){
        return ResponseEntity.ok(paymentService.getPayments());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PaymentDto> addCab(@RequestBody PaymentDto paymentDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.addPayment(paymentDto));
    }
}
