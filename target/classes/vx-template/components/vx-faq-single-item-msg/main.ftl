<div>
[#if content.heading??]<h2>${content.heading!}</h2>[/#if]
[#if content.text??]<p>${cmsfn.decode(content).text!}</p>[/#if]
</div>