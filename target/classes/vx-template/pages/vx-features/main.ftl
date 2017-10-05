[#import "../default.ftl" as base/]
[@base.page content model]
    <h1>${content.title!content.@name}</h1>
    [@cms.area name="featureItem"/]
[/@base.page]