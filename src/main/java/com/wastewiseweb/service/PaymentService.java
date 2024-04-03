package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.CabDto;
import com.wastewiseweb.dto.PaymentDto;
import com.wastewiseweb.entity.CabEntity;
import com.wastewiseweb.entity.PaymentEntity;
import com.wastewiseweb.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final Transformer transformer;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, Transformer transformer){
        this.paymentRepository = paymentRepository;
        this.transformer = transformer;
    }

    public List<PaymentDto> getPayments(){
        return paymentRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public PaymentDto addPayment(PaymentDto paymentDto){
        PaymentEntity paymentEntity = transformer.fromDto(paymentDto);
        PaymentEntity savedPayment = paymentRepository.save(paymentEntity);
        return Transformer.toDto(savedPayment);
    }
}
