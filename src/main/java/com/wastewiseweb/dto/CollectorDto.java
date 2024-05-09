package com.wastewiseweb.dto;

import com.wastewiseweb.entity.CabEntity;
import lombok.Data;

@Data
public class CollectorDto {

    private Integer id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String password;
    private Integer cabID;


}
