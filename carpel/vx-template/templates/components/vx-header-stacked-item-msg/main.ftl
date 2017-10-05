<div class="header-stacked">
	<div class="container">
		<div class="col first comp-bg-${content.variant_left!}">
			<div class="wrap">

		[#assign logo_left = ""]
		[#if content.logo_left??]
			[#if content.logo_left == ""]
				[#assign logo_left = ""]
			[#else]
				[#if content.logo_left != "none"]
					[#assign logo_left = content.logo_left]
				[#else]
					[#assign logo_left = ""]
				[/#if]
			[/#if]
		[#else]
			[#assign logo_left = ""]
		[/#if]
		[#if logo_left != ""]
			<div class="centered">
				<img out="/cms/.resources/vx-template/images/${logo_left!}.png" vx-global-image small="260" medium="320" large="450">
			</div>	
		[#else]
			[#if content.heading_left??]<h2 class="heading">${content.heading_left!}</h2>[/#if]
		[/#if]


				[#if content.subheading_left??]<p class="subheading">${content.subheading_left!}</p>[/#if]
				[#if content.buttonLabel_left??]<a href="${content.buttonLink_left!}">${content.buttonLabel_left!}</a>[/#if]
			</div>
		</div>
		<div class="col second comp-bg-${content.variant_right!}">
			<div class="wrap">

		[#assign logo_right = ""]
		[#if content.logo_right??]
			[#if content.logo_right == ""]
				[#assign logo_right = ""]
			[#else]
				[#if content.logo_right != "none"]
					[#assign logo_right = content.logo_right]
				[#else]
					[#assign logo_right = ""]
				[/#if]
			[/#if]			
		[#else]
			[#assign logo_right = ""]
		[/#if]
		[#if logo_right != ""]
			<div class="centered">
				<img out="/cms/.resources/vx-template/images/${logo_right!}.png" vx-global-image small="260" medium="320" large="450">
			</div>	
		[#else]
			[#if content.heading_right??]<h2 class="heading">${content.heading_right!}</h2>[/#if]
		[/#if]


				[#if content.subheading_right??]<p class="subheading">${content.subheading_right!}</p>[/#if]
				[#if content.buttonLabel_right??]<a href="${content.buttonLink_right!}">${content.buttonLabel_right!}</a>[/#if]
			</div>
		</div>
	</div>
</div>