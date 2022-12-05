package com.election.election.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CandyAvailabilityResponse {
    private int numberOfCandies;
    private boolean moreCandyToClaim;
}
