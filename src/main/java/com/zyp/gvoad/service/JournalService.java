package com.zyp.gvoad.service;

import com.zyp.gvoad.domain.JournalData;
import com.zyp.gvoad.domain.Position;

import java.util.List;

public interface JournalService {

    List<JournalData> queryMost20JournalData();

    List<Position> queryPositionListByJournal(String journal);

}
