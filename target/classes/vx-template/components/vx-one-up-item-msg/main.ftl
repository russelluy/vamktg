[#assign image = (content.image!'')?replace("jcr:", "")]
<div class="one-up"[#if image!= ''] style="background-image: url('${cmsfn.link("dam", image )}');"[/#if]>
  <div class="centered">
    [#if content.heading??]<h3 class="heading">${content.heading!}</h3>[/#if]
	[#if content.subheading??]<p class="subheading">${content.subheading!}</p>[/#if]
    [#if content.buttonLabel??]<a href="${content.buttonLink!}">${content.buttonLabel!}</a>[/#if]
  </div>
</div>