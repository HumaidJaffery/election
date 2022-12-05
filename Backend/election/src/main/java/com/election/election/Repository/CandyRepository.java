package com.election.election.Repository;

import com.election.election.Entity.Candy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CandyRepository extends JpaRepository<Candy, Integer> {
    @Modifying
    @Query(nativeQuery = true, value = "UPDATE candy SET second_candy_type = :second WHERE locker = :locker")
    void addSecondCandy(@Param("second") String typeCandy, @Param("locker") int locker);

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE candy SET contact_info = :contactInfo WHERE locker = :locker")
    void addContactInfo(@Param("contactInfo") String contactInfo, @Param("locker") int locker);
}

