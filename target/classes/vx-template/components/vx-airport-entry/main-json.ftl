	"${content.code!}":{
		"name":"${content.name!}",
    	[#if content.msaCode?? ]"msaCode":"${content.msaCode!}",[/#if]
		[#if content.state?? ]"state":"${content.state!}",[/#if]
		[#if content.country?? ]"country":"${content.country!}",[/#if]
		[#if content.destinationMsg?? ]"destinationMsg":"${content.destinationMsg!}",[/#if]
    "mainInState":${content.mainInState!'false'},
    "international":${content.international!'false'}
	}[#if (content?parent?children?last.path != content.@path)],[/#if]
