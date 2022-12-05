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
public class Comment {
    @Id
    @SequenceGenerator(name = "comment_id_sequence", sequenceName = "comment_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_id_sequence")
    private Long commentId;

    private String text;

    @ManyToOne
    @JoinColumn(name = "suggestion_id")
    private Suggestion suggestion;

}
