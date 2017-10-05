<div class="image-teaser">
	<div class="wrap">
		[#if content.heading??]<h3 class="heading">${content.heading!}</h3>[/#if]
		<div class="container">
			<div class="col first">
				<div class="centered">
					[#assign image = (content.image_left!'')?replace("jcr:", "")]
					[#if image != '' && cmsfn.contentById( image ,'dam')??]
						<img alt="${cmsfn.contentById( image ,'dam').caption!}" out="${cmsfn.link("dam", image )}" vx-global-image small="284" medium="228" large="380"/>
					[/#if]
				</div>
			</div>
			<div class="col second">
				<div class="centered">
					[#assign image = (content.image_center!'')?replace("jcr:", "")]
					[#if image != '' && cmsfn.contentById( image ,'dam')??]
						<img alt="${cmsfn.contentById( image ,'dam').caption!}" out="${cmsfn.link("dam", image )}" vx-global-image small="284" medium="228" large="380"/>
					[/#if]
				</div>
			</div>
			<div class="col third">
				<div class="centered">
					[#assign image = (content.image_right!'')?replace("jcr:", "")]
					[#if image != '' && cmsfn.contentById( image ,'dam')??]
						<img alt="${cmsfn.contentById( image ,'dam').caption!}" out="${cmsfn.link("dam", image )}" vx-global-image small="284" medium="228" large="380"/>
					[/#if]
				</div>
			</div>
		</div>
		[#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
	</div>
</div>