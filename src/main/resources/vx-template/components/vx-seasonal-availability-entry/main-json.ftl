	"${content.code_from!}_${content.code_to!}":{
		"from":"${content.from?string("yyyy-MM-dd")!}", 
		"to":"${content.to?string("yyyy-MM-dd")!}"
	}
	[#if (content?parent?children?last.path != content.@path)],[/#if]
