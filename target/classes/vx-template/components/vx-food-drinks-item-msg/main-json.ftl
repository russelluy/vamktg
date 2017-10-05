	"image":"${cmsfn.link("dam", content.image?replace("jcr:", "")! )}", 
	"text":"${content.text!}", 
	"availableOnLongerThan2H":${content.availableOnLongerThan2H!},
  "list":[
    [#assign first = true]
    [#list content.list as item]
    [#if first = true],[/#if][#assign first = false]
    {"item":"${item}"}
    [/#list]
  ]