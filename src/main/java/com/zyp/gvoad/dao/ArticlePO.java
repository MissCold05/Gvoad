package com.zyp.gvoad.dao;

import lombok.Data;
import org.springframework.stereotype.Service;

@Data
public class ArticlePO {

    Long id;
    String author;
    String title;
    Long year;
    String journal;
    String doi;
    Long affId;
    String affiliation;

}
