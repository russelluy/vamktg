<li>
<b>${content.code_from!}</b><br/>
<b>To:</b><br/>
<#assign first="true">
<#list content?children as to>
	<#if to.name = "to">
		<#list to.getNodes() as to_pair><#if first="false">,<br/></#if>
			&nbsp;&nbsp;&nbsp;&nbsp;${to_pair.getProperty('code').string!} ( ${to_pair.getProperty('type').string!} )<#assign first="false">
		</#list>
	</#if>
</#list>
<br/>
<b>Promoted:</b><br/>
<#assign first="true">
<#list content?children as promoted>
	<#if promoted.name = "promoted">
		<#list promoted.getNodes() as promo_pair><#if first="false">,<br/></#if>
			&nbsp;&nbsp;&nbsp;&nbsp;${promo_pair.getProperty('code').string!} - Fare: ${promo_pair.getProperty('fare').string!}<#assign first="false">
		</#list>
	</#if>
</#list>
</li>