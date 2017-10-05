  [#if content.img??]
<img id="cover" alt="${cmsfn.contentById( content.img?replace("jcr:", "") ,'dam').caption!}" src="${cmsfn.link("dam", content.img?replace("jcr:", "")! )}" />
  [/#if]
  [#if content.overview??]
  <br/>${cmsfn.decode(content).overview}
  [/#if]
  [#if content.info??]
  <br/>${content.info!}
  [/#if]
[#if content.lineup??]
<br/><br/><b>Line Up:</b><br/>
    [#assign first = true]
    [#list content.lineup as item]
    [#if first = false],[/#if][#assign first = false]
    ${item}<br/>
    [/#list]
[/#if]