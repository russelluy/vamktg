[#import "../../macros.ftl" as macros/]
[#assign currentPage = cmsfn.page(content)]

[#macro renderItens pageNode ]
	[#assign childfirst="true"]
	[#list cmsfn.children(pageNode, "mgnl:page") as currPage][#if childfirst="false"],[/#if]
	[#assign childfirst="false"]
	{
		"title":"${currPage.title!}"
		,"heading":"${currPage.title!}"
	[#list currPage?children as properties ]
	[#list properties.getNodes() as pair ][#if pair.hasProperty('subheading')]
		,"subheading":"${pair.getProperty('subheading').string!}"[/#if][#if pair.hasProperty('text')]
		,"text":"${pair.getProperty('text').string?replace("	", "")}"[/#if][#if pair.hasProperty('news_date')]
		,"date":"${pair.getProperty('news_date').string!}"[/#if][#if pair.hasProperty('iframe')]
		,"iframe":"${cmsfn.link("dam", pair.getProperty('iframe').string?replace("jcr:", "")!  )!}"[/#if][#if pair.hasProperty('image')]
		,"image":"${cmsfn.link("dam", pair.getProperty('image').string?replace("jcr:", "")!  )!}"[/#if][#if pair.hasProperty('imageRollover')]
		,"imageRollover":"${cmsfn.link("dam", pair.getProperty('imageRollover').string?replace("jcr:", "")!  )}"[/#if][#if pair.hasProperty('linkText')]
		,"linkText":"${pair.getProperty('linkText').string!}"[/#if]
		[#assign _link=''/]
		[#if pair.hasProperty('link')]
			[#assign _link = pair.getProperty('link').string?trim/]
		[/#if]
		[#if _link == '']
			[#assign _link = cmsfn.link(currPage)?trim/]
		[/#if]
		,"link":"[@macros.createLink _link/]"
	[/#list]
	[/#list]
	}
	[/#list]
[/#macro]

[#macro renderNewsItens pageNode ]
	[#assign childfirst="true"]
	[#list cmsfn.children(pageNode, "mgnl:page") as currPage][#if childfirst="false"],[/#if]
	[#assign childfirst="false"]
	{
		"title":"${currPage.title!}"
		,"heading":"${currPage.title!}"
	[#list currPage?children as properties ]
	[#list properties.getNodes() as pair ][#if pair.hasProperty('subheading')]
		,"subheading":"${pair.getProperty('subheading').string!}"[/#if][#if pair.hasProperty('news_date')]
		,"date":"${pair.getProperty('news_date').string!}"[/#if][#if pair.hasProperty('iframe')]
		,"iframe":"${cmsfn.link("dam", pair.getProperty('iframe').string?replace("jcr:", "")!  )!}"[/#if][#if pair.hasProperty('image')]
		,"image":"${cmsfn.link("dam", pair.getProperty('image').string?replace("jcr:", "")!  )!}"[/#if][#if pair.hasProperty('imageRollover')]
		,"imageRollover":"${cmsfn.link("dam", pair.getProperty('imageRollover').string?replace("jcr:", "")!  )}"[/#if][#if pair.hasProperty('linkText')]
		,"linkText":"${pair.getProperty('linkText').string!}"[/#if]
		[#assign _link=''/]
		[#if pair.hasProperty('link')]
			[#assign _link = pair.getProperty('link').string?trim/]
		[/#if]
		[#if _link == '']
			[#assign _link = cmsfn.link(currPage)?trim/]
		[/#if]
		,"link":"[@macros.createLink _link/]"
	[/#list]
	[/#list]
	}
	[/#list]
[/#macro]

{

[#assign aDateTime = .now]
	"currentDate":"${aDateTime?iso("UTC")}",

	[#assign newsPage = cmsfn.asContentMap( cmsfn.nodeByPath('/news')) ]
	[#if newsPage??]
	"${newsPage.@name}": [ [@renderNewsItens newsPage /] ],
	[/#if]

	[#assign rootPage = cmsfn.root(content, "mgnl:page")!]
	[#assign first="true"]
	[#list cmsfn.children(currentPage, "mgnl:page") as childPage]
		[#if first="false"],[/#if]
		[#assign first="false"]
		[#if childPage.@name != "promotional" ]
			"${childPage.@name}": [ [@renderItens childPage /] ]
		[/#if]

		[#if childPage.@name = "promotional" ]
			"${childPage.@name}": {
				"slots":[
				[#list childPage?children as props ]
				[#if props.name = "slotsPromotional"]
					[#list props.getNodes() as base ]
					[#list base.getNodes() as slots ]
						[#assign slotfirst="true"]
						[#list slots.getNodes() as slot ][#if slotfirst="false"],[/#if][#assign slotfirst="false"]
						{
							"subset": "${slot.getProperty('subset').string!}",
							"selection": "${slot.getProperty('selection').string!}"[#if slot.getProperty('selection').string="specified"],
							"id": "${slot.getProperty('id').string!}"
							[/#if]
						}
						[/#list]
					[/#list]
					[/#list]
				[/#if]
				[/#list]
				],
				"subsets":{
		[#assign itemfirst="true"]
		[#list cmsfn.children(childPage, "mgnl:page") as currItem][#if itemfirst="false"],[/#if]
		[#assign itemfirst="false"]
			"${currItem.@name!}": {
			[#assign propfirst="true"]
			[#list cmsfn.children(currItem, "mgnl:page") as properties][#if propfirst="false"],[/#if]
			[#assign propfirst="false"]
			"${properties.@name!}":{
				"title":"${properties.title!}"
				[#list properties?children as child ]
				[#if child.name = "promotionalItem"]
				[#list child.getNodes() as item ]
					[#if item.hasProperty('iframe')]
						,"iframe":"${cmsfn.link("dam", item.getProperty('iframe').string?replace("jcr:", "")! )!}"
					[/#if]
					[#if item.hasProperty('image')]
						,"image":"${cmsfn.link("dam", item.getProperty('image').string?replace("jcr:", "")! )!}"
					[/#if]
					[#if item.hasProperty('linkText')]
						,"linkText":"${item.getProperty('linkText').string!}"
					[/#if]
					[#if item.hasProperty('link')]
						,"link":"${item.getProperty('link').string!}"
					[/#if]
				[/#list]
				[/#if]
				[/#list]
			}
		[/#list]

	}
	[/#list]

				}
			}
		[/#if]
	[/#list]
}