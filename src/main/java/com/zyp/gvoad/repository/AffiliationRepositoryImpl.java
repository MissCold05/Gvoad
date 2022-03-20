package com.zyp.gvoad.repository;

import com.zyp.gvoad.dao.AffiliationPO;
import com.zyp.gvoad.mapper.AffiliationMapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class AffiliationRepositoryImpl implements AffiliationRepository{

    @Resource
    private AffiliationMapper affiliationMapper;

    @Override
    public AffiliationPO getAffiliationById(Long id) {
        return affiliationMapper.selectById(id);
    }

    @Override
    public List<AffiliationPO> getAllNormalAffiliation() {
        return affiliationMapper.selectNormal();
    }

    @Override
    public List<AffiliationPO> getIdAndLatAndLng() {
        return affiliationMapper.selectIdAndLatAndLng();
    }

    @Override
    public List<AffiliationPO> getIdAndLatAndLngByCountry(String country) {
        return affiliationMapper.selectIdAndLatAndLngByCountry(country);
    }

    @Override
    public List<AffiliationPO> getIdAndCountry() {
        return affiliationMapper.selectIdAndCountry();
    }

    @Override
    public List<AffiliationPO> getLatAndLngByIdList(List<Long> idList) {
        return affiliationMapper.selectLatAndLngByIdList(idList);
    }

}
