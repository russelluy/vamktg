[#import "../../macros.ftl" as macros/]
<div class="header-normal">
	<div class="wrap">
		[#if content.heading??]<${content.variant!'h1'} class="heading-${content.variant!'h1'}">${content.heading!}</${content.variant!'h1'}>[/#if]
		[#if content.subheading??]<p class="subheading">[@macros.createAnchor content.subheading!/]</p>[/#if]
		[#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
	</div>
</div>