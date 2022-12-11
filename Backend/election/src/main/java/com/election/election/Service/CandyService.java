package com.election.election.Service;

import com.election.election.Entity.Candy;
import com.election.election.Model.CandyAvailabilityResponse;
import com.election.election.Repository.CandyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CandyService {

    @Autowired
    private CandyRepository candyRepository;

    public CandyAvailabilityResponse CheckCandyAvailability(int locker, boolean hasContactInfo) {
        //Second Time
        if(candyRepository.existsById(locker)){
            //Already claimed second
            if(candyRepository.findById(locker).get().getSecondCandyType() != null) {
                return new CandyAvailabilityResponse(0, false);
            }
            //Doesn't have contact info
            if (!hasContactInfo) {
                return new CandyAvailabilityResponse(0, true);
            }
            //has contact info
            return new CandyAvailabilityResponse(1, false);
        }
        //First time
        if (!hasContactInfo){
            return new CandyAvailabilityResponse(1, true);
        } else {
            return new CandyAvailabilityResponse(2, false
            );
        }
    }

    public Candy addCandy(Candy candy) {
        if(candyRepository.existsById(candy.getLocker())){
                Candy AlreadyCandy = candyRepository.findById(candy.getLocker()).get();
                AlreadyCandy.setSecondCandyType(candy.getSecondCandyType());
                AlreadyCandy.setContactInfo(candy.getContactInfo());
                candyRepository.save(AlreadyCandy);
        } else {
            candyRepository.save(candy);
        }
        return candyRepository.findById(candy.getLocker()).get();
    }

}
