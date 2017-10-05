	[#if content.hasProperty('cover')]
  "cover":"${cmsfn.link("dam", content.cover?replace("jcr:", "")! )}", 
  [/#if]
  [#if content.hasProperty('overview')]
  "overview":"${content.overview!}"
  [/#if]
  [#if content.hasProperty('info')]
	"info":"${content.info!}"
  [/#if]
