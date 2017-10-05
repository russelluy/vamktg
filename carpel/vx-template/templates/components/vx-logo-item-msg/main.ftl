[#assign image = (content.image!'')?replace("jcr:", "")]
<div class="wrap">
<div class="logo ${content.variant!}">
	<div class="centered">
		[#if image != '' && cmsfn.contentById( image ,'dam')??]<div class="image"><img alt="${cmsfn.contentById( image ,'dam').caption!}" out="${cmsfn.link("dam", image )}" vx-global-image small="206" medium="268" large="380"/></div>[/#if]
	</div>
</div>
</div>