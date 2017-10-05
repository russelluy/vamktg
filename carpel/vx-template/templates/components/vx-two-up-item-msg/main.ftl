[#import "../../macros.ftl" as macros/]
<div class="two-up comp-bg-${content.background!} ${content.side!} ${content.variant!}">
  <div class="wrap">
    <div class="container">
      <div class="col col-text ${content.buttonVariant!'purple'}">
        <div class="centered">
          [#if content.heading??]<h2 class="heading">${content.heading!}</h2>[/#if]
          [#if content.subheading??]<p class="subheading">[@macros.createAnchor content.subheading!/]</p>[/#if]
          [#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
        </div>
      </div>
      <div class="col col-image">
        [#assign image = (content.image!'')?replace("jcr:", "")]
        [#if image != '' && cmsfn.contentById( image ,'dam')??]<img alt="${cmsfn.contentById( image ,'dam').caption!}" out="${cmsfn.link("dam", image)}" vx-global-image small="580" medium="352" large="580">[/#if]
      </div>
    </div>
  </div>
</div>