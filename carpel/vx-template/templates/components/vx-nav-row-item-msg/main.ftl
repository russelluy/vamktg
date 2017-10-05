[#import "../../macros.ftl" as macros/]
[#assign _currentPage = cmsfn.page(content)]
[#assign _targetPage = cmsfn.contentById(content.targetPage ,'website')]

[#macro renderNavigation pageNode]
    <li>
        <a href="[@macros.createLink cmsfn.link(pageNode)/]">${pageNode.title!pageNode.@name}</a>
    </li>
[/#macro]


<div class="nav-row comp-bg-${content.variant!}">
  <div class="nav-row-container--mobile">
    <form name="navrowmobileform">
      <select class="nav-row-selectbox is-trigger">
        [#assign showCurrent = true]
        [#list cmsfn.children(_targetPage, "mgnl:page") as childPage]
          [#assign isSelected = (childPage.@path == _currentPage.@path)!false]
          [#if isSelected ]
            [#assign showCurrent = false]
          [/#if]
        [/#list]
        [#if showCurrent]
        <option value="" selected="selected">${content.heading!_currentPage.title!_currentPage.@name}</option>
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
  <div class="nav-row-container">
    <a href="#" class="nav-row-container__arrow is-trigger"></a>
    <ul class="nav-row-list cf">
    [#list cmsfn.children(_targetPage, "mgnl:page") as childPage]
      [@renderNavigation childPage /]
    [/#list]
    </ul>
  </div>
</div>