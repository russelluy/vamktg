<div class="masterhead">
<figure>
  [#if content.image??]
    <img alt="${cmsfn.contentById( content.image?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.image?replace("jcr:", "")! )}" vx-global-image small="320" medium="768" large="2000">
  [/#if]
</figure>
</div>