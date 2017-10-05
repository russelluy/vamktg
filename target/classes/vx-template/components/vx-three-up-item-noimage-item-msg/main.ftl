[#import "../../macros.ftl" as macros/]
<div class="three-up-item-no-image ${content.buttonVariant!'purple'}">
	<div class="centered">
		[#if content.heading??]<h2 class="heading">${content.heading!}</h2>[/#if]
		[#if content.subheading??]<p class="subheading">[@macros.createAnchor content.subheading!/]</p>[/#if]
		[#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
	</div>
</div>