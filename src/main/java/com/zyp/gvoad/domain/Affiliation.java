package com.zyp.gvoad.domain;

import lombok.Data;

@Data
public class Affiliation {

    String name;
    String city;
    String country;
    Double lat;
    Double lng;
    String state;
    String stateCode;
    String countryCode;
    Long cityId;

}
