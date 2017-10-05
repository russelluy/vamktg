[#import "../../macros.ftl" as macros/]
[#assign image = (content.image!'')?replace("jcr:", "")]
<div class="three-up-item-image ${content.buttonVariant!'purple'}">
	<div class="centered">
		[#if image != '' && cmsfn.contentById( image ,'dam')??]<div class="image"><img alt="${cmsfn.contentById( image ,'dam').caption!}" out="${cmsfn.link("dam", image )}" vx-global-image small="264" medium="228" large="380"/></div>[/#if]
		[#if content.subheading??]<p class="caption">[@macros.createAnchor content.subheading!/]</p>[/#if]
		[#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
	</div>
</div>