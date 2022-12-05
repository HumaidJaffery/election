package com.election.election.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Suggestion {

    @Id
    @SequenceGenerator(name = "suggestion_id_sequence",sequenceName = "suggestion_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "suggestion_id_sequence")
    private Long suggestionId;

    private Integer likes;

    private boolean isPublic;

    private String text;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments;
}
