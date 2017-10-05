[#if content.image??]
<img id="image" alt="${cmsfn.contentById( content.image?replace("jcr:", "") ,'dam').caption!}" src="${cmsfn.link("dam", content.image?replace("jcr:", "")! )}" />
[/#if]<br/>
${content.text!}<br/>
Available On Longer Than 2Hours: ${content.availableOnLongerThan2H!}<br/>
<br/>
[#if content.list??]
<b>List:</b><br/>
    [#assign first = true]
    [#list content.list as item]
    [#if first = false],[/#if][#assign first = false]
    ${item}"<br/>
    [/#list]
[/#if]