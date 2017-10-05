<div>
  [#if content.htmlFile??]
    ${cmsfn.contentById(content.htmlFile,"dam")}
  [#else]
    ${cmsfn.decode(content).html}
  [/#if]
</div>