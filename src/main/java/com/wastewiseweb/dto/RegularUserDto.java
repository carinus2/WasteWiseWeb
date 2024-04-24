package com.wastewiseweb.dto;

import lombok.Data;

@Data
public class RegularUserDto {

    private Integer id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String homeAddress;
    private String password;

}
