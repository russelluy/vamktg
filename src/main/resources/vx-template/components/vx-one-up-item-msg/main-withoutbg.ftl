<div class="one-up">
<figure>
  [#if content.image??]
    <img alt="${cmsfn.contentById( content.image?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.image?replace("jcr:", "")! )}" vx-global-image small="320" medium="768" large="2000">
  [/#if]
  <figcaption>
    <div class="centered">
      [#if content.heading??]<h3 class="heading">${content.heading!}</h3>[/#if]
      [#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
    </div>
  </figcaption>
</figure>
</div>