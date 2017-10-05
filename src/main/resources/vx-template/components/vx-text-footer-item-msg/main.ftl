<div class="text-footer" id="textFooter">
	<div class="wrap">
		[#assign _placement = content.placement!'']
		[#if _placement != '']
			[#assign term = '']
			[#assign _deals = cmsfn.contentById( 'b0ee57e9-1438-4a7b-b9b9-1bbe9e4a640e' ,'website')]
			[#list _deals?children as _terms]
			[#if _terms.name = "terms"]
			[#list _terms.getNodes() as _term]
			[#if (_term.getProperty('placementIds').string)?index_of(_placement) > -1 ]
			[#assign term = _term.getProperty('text').string]
			[/#if]
			[/#list]
			[/#if]
			[/#list]
			[#assign term = term?replace("\n", "<br/>",'r')]
			<div class="content">
			<p><strong>Terms and Conditions:</strong></p>
			<p>${term}</p>
			</div>
		[#else]
		<div class="content">${cmsfn.decode(content).text}</div>
		[/#if]
	</div>
</div>
