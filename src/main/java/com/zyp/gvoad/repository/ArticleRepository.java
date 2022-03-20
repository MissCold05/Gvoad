package com.zyp.gvoad.repository;

import com.zyp.gvoad.dao.ArticlePO;

import java.util.List;

public interface ArticleRepository {

    List<ArticlePO> getJournalAndAffId();

    List<ArticlePO> getJournalAffIdByJournal(String journal);

    Long countArticleIdByAffId(List<Long> idList);

}
