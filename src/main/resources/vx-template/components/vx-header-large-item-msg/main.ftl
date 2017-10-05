<div class="header-large [#if content.variant != "none"] comp-bg-${content.variant!}[/#if]">
	<div class="wrap">	
		[#assign logo = ""]
		[#if content.logo??]
			[#if content.logo == ""]
				[#assign logo = ""]
			[#else]
				[#if content.logo != "none"]
					[#assign logo = content.logo]
				[#else]
					[#assign logo = ""]
				[/#if]
			[/#if]
		[#else]
			[#assign logo = ""]
		[/#if]
		[#if logo != ""]
			<div class="centered">
				<img out="/cms/.resources/vx-template/images/${logo!}.png" vx-global-image small="220" medium="270" large="355">
			</div>	
		[#else]
			[#if content.heading??]<h1 class="heading">${content.heading!}</h1>[/#if]
		[/#if]
		[#if content.subheading??]<p class="subheading">${content.subheading!}</p>[/#if]
		[#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
	</div>
</div>