<li>
<b>${content.code_from!}_${content.code_to!}</b> -
<#assign first="true">
<#if content.weekDays??>
	<#list content.weekDays as week>
		<#if first="false">,</#if>
			${week!}
		<#assign first="false">
	</#list>
</#if>
<#if first="true">None</#if>
</li>