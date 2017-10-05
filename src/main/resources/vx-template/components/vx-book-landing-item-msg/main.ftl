<div class="book-landing">
<div class="book-spacer"></div>
<script language="javascript">
function openLink (link) {
  document.location.href = link;
}
</script>
<div class="three-up">
	<div class="container">
		<div class="col first">
      <div class="book-three-up-item-image">
        <div class="centered" onclick="openLink('[#if content.firstLink??]${content.firstLink!}[/#if]')" style="cursor: pointer;">


  [#if content.firstImage??]
  <div class="image">
    <img alt="${cmsfn.contentById( content.firstImage?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.firstImage?replace("jcr:", "")! )}" vx-global-image small="145" medium="120" large="145" border="0"/>
    </div>
  [/#if]

          [#if content.firstHeading??]<p class="caption" style="color:${content.firstColor!}">${content.firstHeading!}</p>[/#if]
        </div>
      </div>
		</div>
		<div class="col second">
      <div class="book-three-up-item-image">
          <div class="centered" onclick="openLink('[#if content.secondLink??]${content.secondLink!}[/#if]')" style="cursor: pointer;">
  [#if content.secondImage??]
  <div class="image">
    <img alt="${cmsfn.contentById( content.secondImage?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.secondImage?replace("jcr:", "")! )}" vx-global-image small="145" medium="120" large="145" border="0"/>
    </div>
  [/#if]

            [#if content.secondHeading??]<p class="caption" style="color:${content.secondColor!}">${content.secondHeading!}</p>[/#if]
          </div>
      </div>
		</div>
		<div class="col third">
      <div class="book-three-up-item-image">
          <div class="centered" onclick="openLink('[#if content.thirdLink??]${content.thirdLink!}[/#if]')" style="cursor: pointer;">
            [#if content.thirdImage??]
  <div class="image">
    <img alt="${cmsfn.contentById( content.thirdImage?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.thirdImage?replace("jcr:", "")! )}" vx-global-image small="145" medium="120" large="145" border="0"/>
    </div>
  [/#if]
            [#if content.thirdHeading??]<p class="caption" style="color:${content.thirdColor!}">${content.thirdHeading!}</p>[/#if]
          </div>
      </div>
		</div>
	</div>
</div>
<div class="book-spacer-lined">
  <div class="line"></div>
</div>
<div class="three-up">
  <div class="container">
    <div class="col first">
      <div class="book-three-up-item-image">
          <div class="centered" onclick="openLink('[#if content.fourthLink??]${content.fourthLink!}[/#if]')" style="cursor: pointer;">

                    [#if content.fourthImage??]
  <div class="image">
    <img alt="${cmsfn.contentById( content.fourthImage?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.fourthImage?replace("jcr:", "")! )}" vx-global-image small="145" medium="120" large="145" border="0"/>
    </div>
  [/#if]


            [#if content.fourthHeading??]<p class="caption" style="color:${content.fourthColor!}">${content.fourthHeading!}</p>[/#if]
          </div>
      </div>
    </div>
    <div class="col second">
      <div class="book-three-up-item-image">
          <div class="centered" onclick="openLink('[#if content.fifthLink??]${content.fifthLink!}[/#if]')" style="cursor: pointer;">
                  [#if content.fifthImage??]
  <div class="image">
    <img alt="${cmsfn.contentById( content.fifthImage?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.fifthImage?replace("jcr:", "")! )}" vx-global-image small="145" medium="120" large="145" border="0"/>
    </div>
  [/#if]

            [#if content.fifthHeading??]<p class="caption" style="color:${content.fifthColor!}">${content.fifthHeading!}</p>[/#if]
          </div>
      </div>
    </div>
    <div class="col third">
      <div class="book-three-up-item-image">
          <div class="centered" onclick="openLink('[#if content.sixthLink??]${content.sixthLink!}[/#if]')" style="cursor: pointer;">

                            [#if content.sixthImage??]
  <div class="image">
    <img alt="${cmsfn.contentById( content.sixthImage?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.sixthImage?replace("jcr:", "")! )}" vx-global-image small="145" medium="120" large="145" border="0"/>
    </div>
  [/#if]

            [#if content.sixthHeading??]<p class="caption" style="color:${content.sixthColor!}">${content.sixthHeading!}</p>[/#if]
          </div>
      </div>
    </div>
  </div>
</div>
<div class="book-spacer"></div>
</div>