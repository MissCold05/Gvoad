package com.zyp.gvoad.repository;

import com.zyp.gvoad.dao.AffiliationPO;

import java.util.List;

public interface AffiliationRepository {

    AffiliationPO getAffiliationById(Long id);

    List<AffiliationPO> getAllNormalAffiliation();

    List<AffiliationPO> getIdAndLatAndLng();

    List<AffiliationPO> getIdAndLatAndLngByCountry(String country);

    List<AffiliationPO> getIdAndCountry();

    List<AffiliationPO> getLatAndLngByIdList(List<Long> idList);

}
