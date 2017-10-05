[#import "../../macros.ftl" as macros/]
<div class="table-column-three">
  <div class="container">
	 <table>
[#assign first="true"]
[#list content?children as columns]
[#if columns.name = "columns"]
[#list columns.getNodes() as column]
  [#if first="true"]
  [#assign first="false"]
    <thead>
      <tr>
        <th class="col first">[#if column.hasProperty('one')][@macros.createAnchor column.getProperty('one').string!/][/#if]</th>
        <th class="col second">[#if column.hasProperty('two')][@macros.createAnchor column.getProperty('two').string!/][/#if]</th>
        <th class="col third">[#if column.hasProperty('three')][@macros.createAnchor column.getProperty('three').string!/][/#if]</th>
      </tr>
    </thead>
    <tbody>
  [#else]
    <tr>
      <td class="col first">[#if column.hasProperty('one')][@macros.createAnchor column.getProperty('one').string!/][/#if]</td>
      <td class="col second">[#if column.hasProperty('two')][@macros.createAnchor column.getProperty('two').string!/][/#if]</td>
      <td class="col third">[#if column.hasProperty('three')][@macros.createAnchor column.getProperty('three').string!/][/#if]</td>
    </tr>
  [/#if]
[/#list]
[/#if]
[/#list]
        </tbody>
      </table>
</div>
</div>