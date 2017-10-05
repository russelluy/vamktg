[#import "../../../macros.ftl" as macros/]
<div id="navigation" role="navigation">
	[#assign currentPage = cmsfn.page(content)]
	[#macro renderNavigation pageNode maxDepth=2 ]
		[#assign isSelected = (pageNode.@path == currentPage.@path)!false]
		[#if isSelected ]
			<li class="selected"><span>${pageNode.title!pageNode.@name}</span></li>
		[#else]
			<li><a href="[@macros.createLink cmsfn.link(pageNode)/]"><span>${pageNode.title!pageNode.@name}</span></a></li>
		[/#if]
		[#if pageNode.@depth <  maxDepth]
			[#list cmsfn.children(pageNode, "mgnl:page") as childPage]
			[@renderNavigation childPage /]
			[/#list]
		[/#if]
	[/#macro]
	<ul>
	[#assign rootPage = cmsfn.root(content, "mgnl:page")!]
	[#list cmsfn.children(currentPage, "mgnl:page") as childPage]
		[@renderNavigation childPage /]
	[/#list]
	</ul>
</div><!-- end "navigation" -->