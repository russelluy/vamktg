[#assign icon = (content.icon!'')?replace("jcr:", "")]
<script language="javascript">
function openLink (link) {
  document.location.href = link;
}
</script>
<div class="three-up-item-no-body"[#if content.link??] onclick="openLink('${content.link!}')" style="cursor: pointer;"[/#if]>
	<div class="centered">
		[#if  icon != '' && cmsfn.contentById( icon ,'dam')??]
    <div class="icon">
    <img alt="${cmsfn.contentById( icon ,'dam').caption!}" out="${cmsfn.link("dam", icon )}"  vx-global-image small="90" medium="110" large="190"/>
    </div>
    [/#if]
		[#if content.heading??]<h2 class="heading">${content.heading!}</h2>[/#if]
	</div>
</div>