package com.zyp.gvoad.service;

import com.zyp.gvoad.domain.CountryData;
import com.zyp.gvoad.domain.Position;

import java.util.List;

public interface CountryService {

    List<CountryData> queryMost20CountryData();

    List<Position> queryPositionListByCountry(String country);

}
