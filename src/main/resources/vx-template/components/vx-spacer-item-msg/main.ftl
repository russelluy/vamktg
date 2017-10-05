[#assign half = content.varheight?replace("px", "")?replace(" ", "")?number / 2]
<div class="wrap">
<div class="spacer" style="height:${content.varheight!}; padding-top:${(half)!}">
  <div class="line"></div>
</div>
</div>