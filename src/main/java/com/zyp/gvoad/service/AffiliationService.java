package com.zyp.gvoad.service;

import com.zyp.gvoad.domain.Affiliation;
import com.zyp.gvoad.domain.ArticleCountry;

import java.util.List;

public interface AffiliationService {

    Affiliation queryAffiliation();

    List<ArticleCountry> queryMost10ArticleCountry();

}
