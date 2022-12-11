package com.election.election.Controller;

import com.election.election.Entity.Candy;
import com.election.election.Model.CandyAvailabilityResponse;
import com.election.election.Service.CandyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class CandyController {

    @Autowired
    private CandyService candyService;

    @GetMapping("/candyAvailability")
    public CandyAvailabilityResponse candyAvailability(@RequestParam(name = "locker") int locker, @RequestParam(name = "hasContactInfo") boolean hasContactInfo) {
        System.out.println(locker + " " + hasContactInfo);
        return candyService.CheckCandyAvailability(locker, hasContactInfo);
    }

    @PostMapping("/addCandy")
    public Candy addCandy(@RequestBody Candy candy){
        return candyService.addCandy(candy);
    }

}
