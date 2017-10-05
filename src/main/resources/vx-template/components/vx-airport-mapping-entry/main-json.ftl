	"${content.code_from!}": {
		"to":{<#assign first="true"><#list content?children as to><#if to.name = "to">
			<#list to.getNodes() as to_pair><#if first="false">,
			</#if>"${to_pair.getProperty('code').string!}":"${to_pair.getProperty('type').string!}"<#assign first="false"></#list>
			</#if></#list>
		},
		"promoted":{<#assign first="true"><#list content?children as promoted><#if promoted.name = "promoted">
			<#list promoted.getNodes() as pair><#if first="false">,
			</#if>"${pair.getProperty('code').string!}":{"fare": "${pair.getProperty('fare').string!}"}<#assign first="false"></#list>
			</#if></#list>
		}
	}
	<#if (content?parent?children?last.path != content.@path)>,</#if>
