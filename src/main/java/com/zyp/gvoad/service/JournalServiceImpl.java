package com.zyp.gvoad.service;

import com.zyp.gvoad.dao.AffiliationPO;
import com.zyp.gvoad.dao.ArticlePO;
import com.zyp.gvoad.domain.JournalData;
import com.zyp.gvoad.domain.Position;
import com.zyp.gvoad.repository.AffiliationRepository;
import com.zyp.gvoad.repository.ArticleRepository;
import com.zyp.gvoad.util.JSONUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JournalServiceImpl implements JournalService {

    @Resource
    private AffiliationRepository affiliationRepository;

    @Resource
    private ArticleRepository articleRepository;

    @Override
    public List<JournalData> queryMost20JournalData() {
        List<ArticlePO> articlePOList = articleRepository.getJournalAndAffId();
        articlePOList = articlePOList.stream().filter(x -> x.getAffId() > 0).collect(Collectors.toList());


        return articlePOList.stream().map(ArticlePO::getJournal)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet().stream().sorted(Map.Entry.<String, Long>comparingByValue().reversed()).limit(20)
                .map(x -> new JournalData(x.getKey(), x.getValue())).collect(Collectors.toList());
    }

    @Override
    public List<Position> queryPositionListByJournal(String journal) {
        List<ArticlePO> articlePOList = articleRepository.getJournalAffIdByJournal(journal);
        List<Long> affIdList = articlePOList.stream().map(ArticlePO::getAffId).filter(x -> x > 0).collect(Collectors.toList());
        List<AffiliationPO> affiliationPOList = affiliationRepository.getLatAndLngByIdList(affIdList);
        return affiliationPOList.stream().map(x -> new Position(x.getLat(), x.getLng())).collect(Collectors.toList());
    }

}
