[#import "../../macros.ftl" as macros/]
[#assign icon = (content.icon!'')?replace("jcr:", "")]
<div class="three-up-item-icon ${content.buttonVariant!'purple'}">
	<div class="centered">
		[#if icon != '' && cmsfn.contentById( icon ,'dam')??]<div class="icon"><img alt="${cmsfn.contentById( icon ,'dam').caption!}" out="${cmsfn.link("dam", icon )}" vx-global-image small="90" medium="80" large="130"/></div>[/#if]
		[#if content.heading??]<h2 class="heading">${content.heading!}</h2>[/#if]
		[#if content.subheading??]<p class="subheading">[@macros.createAnchor content.subheading!/]</p>[/#if]
		[#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
	</div>
</div>