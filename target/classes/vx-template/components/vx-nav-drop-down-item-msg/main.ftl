[#import "../../macros.ftl" as macros/]
[#assign _currentPage = cmsfn.page(content)]
[#assign _targetPage = cmsfn.contentById(content.targetPage ,'website')]
<div class="nav-drop-down ">
	<div class="nav-drop-down-container-${content.variant!'red'}">
		<form name="navform">
			<select name="nav-drop-down-select" class="nav-drop-down-selectbox">
				[#assign showCurrent = true]
	      [#list cmsfn.children(_targetPage, "mgnl:page") as childPage]
					[#assign isSelected = (childPage.@path == _currentPage.@path)!false]
					[#if isSelected ]
						[#assign showCurrent = false]
					[/#if]
	      [/#list]
	      [#if showCurrent]
	      <option value="" selected="selected" disabled="disabled">${content.heading!_currentPage.title!_currentPage.@name}</option>
	      [/#if]
	      [#list cmsfn.children(_targetPage, "mgnl:page") as childPage]
					[#assign isSelected = (childPage.@path == _currentPage.@path)!false]
					[#if isSelected ]
						<option value="[@macros.createLink cmsfn.link(childPage)/]" selected="selected" disabled="disabled" >${childPage.title!childPage.@name}</option>
					[#else]
						<option value="[@macros.createLink cmsfn.link(childPage)/]">${childPage.title!childPage.@name}</option>
					[/#if]
	      [/#list]
			</select>
		</form>
	</div>
</div>