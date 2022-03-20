package com.zyp.gvoad.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.zyp.gvoad.dao.AffiliationPO;
import com.zyp.gvoad.dao.ArticlePO;
import com.zyp.gvoad.domain.CountryData;
import com.zyp.gvoad.domain.Position;
import com.zyp.gvoad.repository.AffiliationRepository;
import com.zyp.gvoad.repository.ArticleRepository;
import com.zyp.gvoad.util.StringUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {

    @Resource
    private ArticleRepository articleRepository;

    @Resource
    private AffiliationRepository affiliationRepository;

    @Override
    public List<CountryData> queryMost20CountryData() {
        List<ArticlePO> articlePOList = articleRepository.getJournalAndAffId();
        List<AffiliationPO> affiliationPOList = affiliationRepository.getIdAndCountry();

        Map<Long, String> affIdToCountryMap = Maps.newHashMap();
        Map<String, Long> countryToCountMap = Maps.newHashMap();
        affiliationPOList.forEach(x -> {
            affIdToCountryMap.put(x.getId(), x.getCountry());
            countryToCountMap.put(x.getCountry(), 0L);
        });

        articlePOList.forEach(x -> {
            String country = affIdToCountryMap.getOrDefault(x.getAffId(), "");
            if (StringUtil.isNotEmpty(country)) {
                countryToCountMap.put(country, countryToCountMap.get(country) + 1);
            }
        });

        return countryToCountMap.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed()).limit(20)
                .map(x -> new CountryData(x.getKey(), x.getValue())).collect(Collectors.toList());
    }

    @Override
    public List<Position> queryPositionListByCountry(String country) {
        // 国家为 country 的全部机构从 affId 到位置的映射
        List<AffiliationPO> affiliationPOList = affiliationRepository.getIdAndLatAndLngByCountry(country);
        Map<Long, Position> affIdToPositionMap = Maps.newHashMap();
        affiliationPOList.forEach(x -> affIdToPositionMap.put(x.getId(), new Position(x.getLat(), x.getLng())));

        // 遍历全部国家，如果在映射表内，加到答案集合
        List<Position> positionList = Lists.newArrayList();
        List<ArticlePO> articlePOList = articleRepository.getJournalAndAffId();
        articlePOList.forEach(x -> {
            Long affId = x.getAffId();
            if (affIdToPositionMap.containsKey(affId)) {
                positionList.add(affIdToPositionMap.get(affId));
            }
        });

        return positionList;
    }
}
