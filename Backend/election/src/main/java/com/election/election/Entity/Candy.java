package com.election.election.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Candy {
    @Id
    @Column(length = 4)
    private Integer locker;

    private String firstCandyType;

    private String secondCandyType;

    private String contactInfo;

    private String name;

    private String grade;
}
