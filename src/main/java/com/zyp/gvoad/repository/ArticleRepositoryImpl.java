package com.zyp.gvoad.repository;

import com.zyp.gvoad.dao.ArticlePO;
import com.zyp.gvoad.mapper.ArticleMapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class ArticleRepositoryImpl implements ArticleRepository{

    @Resource
    private ArticleMapper articleMapper;

    @Override
    public List<ArticlePO> getJournalAndAffId() {
        return articleMapper.selectJournalAndAffId();
    }

    @Override
    public List<ArticlePO> getJournalAffIdByJournal(String journal) {
        return articleMapper.selectAffIdByJournal(journal);
    }

    @Override
    public Long countArticleIdByAffId(List<Long> idList) {
        return articleMapper.countArticleByAffId(idList);
    }

}
