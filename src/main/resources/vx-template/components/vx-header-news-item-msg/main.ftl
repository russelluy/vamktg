<div class="header-news">
  <div class="wrap">
    <div class="content">
      <h1 class="heading" itemprop="name">${content.heading!}</h1>
      <h2 class="subheading" itemprop="description">${content.subheading!}</h2>
      [#if content.news_date??]<span style="display:none" itemprop="datePublished" content="YYY-MM-DD">${content.news_date?string("yyyy-MM-dd")!}</span>[/#if]
      [#if content.news_date??]<p class="header-news-date">${content.news_date?string("EEEE, MM/dd/yyyy")!}</p>[/#if]
      [#if content.image??]<img alt="${cmsfn.contentById( content.image?replace("jcr:", "") ,'dam').caption!}"  src="${cmsfn.link("dam", content.image?replace("jcr:", "")! )}"/>[/#if]
    </div>
  </div>
</div>