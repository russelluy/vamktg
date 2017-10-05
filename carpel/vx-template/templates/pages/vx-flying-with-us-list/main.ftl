[#import "../default.ftl" as base/]
[@base.page content model]
    <h2>${content.title!content.@name}</h2>
    [@cms.area name="navigation"/]
[/@base.page]