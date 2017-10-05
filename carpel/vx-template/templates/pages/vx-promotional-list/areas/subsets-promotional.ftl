[#import "../../../macros.ftl" as macros/]
<ul id="subsetsPromotional">
<div id="navigation" role="navigation">
	[#assign currentPage = cmsfn.page(content)]
	[#macro renderNavigation pageNode maxDepth=2 ]
		<h2>${pageNode.title!pageNode.@name}</h2>
		[#list cmsfn.children(pageNode, "mgnl:page") as childSubSet]
			<li><a href="[@macros.createLink cmsfn.link(childSubSet)/]"><span>${childSubSet.title!childSubSet.@name}</span></a></li> 
		[/#list]
	[/#macro]
	<ul>
	[#assign ls = cmsfn.children(currentPage, "mgnl:page") ]
	[#list ls as childPage]
		[@renderNavigation childPage /]
	[/#list]
	</ul>
</div><!-- end "navigation" -->

</ul>