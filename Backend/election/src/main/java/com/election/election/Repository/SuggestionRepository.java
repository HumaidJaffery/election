package com.election.election.Repository;

import com.election.election.Entity.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {
    @Modifying
    @Query(nativeQuery = true, value = "UPDATE suggestion SET likes = :likes WHERE suggestion_id = :id")
    void addOneLike(@Param("id") long id, @Param("likes") int likes);
}
