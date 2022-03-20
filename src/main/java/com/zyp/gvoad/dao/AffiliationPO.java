package com.zyp.gvoad.dao;

import lombok.Data;

/**
 * Created by YipengZhang on 2022/02/28
 */
@Data
public class AffiliationPO {

    Long id;
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
