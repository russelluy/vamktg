[#import "../default.ftl" as base/]
[@base.page content model]
    <div class="header-normal">
      <div class="wrap">
        <span class="heading">${content.title!content.@name}</span>
        <p class="subheading"></p>
      </div>
    </div>
    <div class="wrap">
    <div class="spacer" style="height:1px; padding-top:0px"><div class="line"></div></div>
    [@cms.area name="navigation"/]
    </div>
[/@base.page]