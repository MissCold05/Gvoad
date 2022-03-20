package com.zyp.gvoad.service;

import com.zyp.gvoad.dao.AffiliationPO;
import com.zyp.gvoad.domain.Affiliation;
import com.zyp.gvoad.domain.ArticleCountry;
import com.zyp.gvoad.repository.AffiliationRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AffiliationServiceImpl implements AffiliationService {

    @Resource
    private AffiliationRepository affiliationRepository;

    @Override
    public Affiliation queryAffiliation() {
        // 调用其他repository
        Long id = 1L;

        AffiliationPO affiliationPO = affiliationRepository.getAffiliationById(id);
        return affiliationPO == null ? null : convertFromPO(affiliationPO);
    }

    @Override
    public List<ArticleCountry> queryMost10ArticleCountry() {
        List<AffiliationPO> affiliationPOList = affiliationRepository.getAllNormalAffiliation();
        return affiliationPOList.stream().map(AffiliationPO::getCountry)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet().stream().sorted(Map.Entry.<String, Long>comparingByValue().reversed()).limit(10)
                .map(x -> new ArticleCountry(x.getKey(), x.getValue())).collect(Collectors.toList());
    }

    private Affiliation convertFromPO(AffiliationPO affiliationPO) {
        Affiliation affiliation = new Affiliation();
        affiliation.setName(affiliationPO.getName());
        //...
        return affiliation;
    }

}
