package com.wastewiseweb.entity;

import jakarta.persistence.*;

@Entity
@Table(name="CABS")
public class CabEntity {

    @Id
    @SequenceGenerator(name = "cabsGenerator", sequenceName = "sq_cabs_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cabsGenerator")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collector_id")
    private CollectorEntity collector;

    @Column(name = "plate_number")
    private String plateNumber;

    public CabEntity() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CollectorEntity getCollector() {
        return collector;
    }

    public void setCollector(CollectorEntity collector) {
        this.collector = collector;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }
}
