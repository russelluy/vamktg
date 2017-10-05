[#import "../../macros.ftl" as macros/]
<div class="wrap">
<header class="promotion__header">
    <h2>
      <span>Cabins</span>
    </h2>
</header>
<script language="javascript">
function changeAccordion(){
  if(document.getElementById('cabinsAccordion').className == 'accordion__main'){
    document.getElementById('cabinsAccordion').className = 'accordion__main is-active';
    document.getElementById('cabinsTitle').className = 'is-active';
  }else{
    document.getElementById('cabinsAccordion').className = 'accordion__main';
    document.getElementById('cabinsTitle').className = '';
  }
}
function changeCabin(type) {
  document.getElementById('cabins_main').style.display = 'none';
  document.getElementById('cabins_main_bt').className  = 'tab-list__item';
  document.getElementById('cabins_select').style.display = 'none';
  document.getElementById('cabins_select_bt').className  = 'tab-list__item';
  document.getElementById('cabins_first').style.display = 'none';
  document.getElementById('cabins_first_bt').className  = 'tab-list__item';
  document.getElementById(type).style.display = 'block';
  document.getElementById(type + '_bt').className  = 'tab-list__item is-selected';
}
</script>
<section id="cabinsAccordion" class="accordion__main is-active">
    <div>
    <header class="promotion-select">
      <ul class="tab-list cf">
        <li class="tab-list__item is-selected" id="cabins_main_bt">
            <a href="javascript:changeCabin('cabins_main')">Main Cabin</a>
        </li>
        <li class="tab-list__item" id="cabins_select_bt">
            <a href="javascript:changeCabin('cabins_select')">Main Cabin Select</a>
        </li>
        <li class="tab-list__item" id="cabins_first_bt">
            <a href="javascript:changeCabin('cabins_first')">First Class</a>
        </li>
      </ul>
    </header>


    <!----- cabins_main ----->
      <div class="fare-info cf is-selected" id="cabins_main">
          <ul class="fare-info__image-list">
          [#list content?children as columns]
          [#if columns.name = "tabMainImages"]
          [#list columns.getNodes() as column]
            <li>
                <figure>
                    [#if column.hasProperty('image')]
                      [#assign img = cmsfn.content("dam", column.getProperty('image').string)]
                      [#assign link = cmsfn.link("dam", img.UUID)]
                      <img out="${link!}" vx-global-image small="284" medium="476" large="714"/>
                    [/#if]
                    <figcaption>[#if column.hasProperty('desc')]${column.getProperty('desc').string!}[/#if]</figcaption>
                </figure>
            </li>
          [/#list]
          [/#if]
          [/#list]
          </ul>
          <div class="fare-info__details-wrap">
              <ul class="fare-info__highlights">
                  <li>
                      <div class="img-wrap">
                      [#if content.tabMainImageOne??]<img alt="${cmsfn.contentById( content.tabMainImageOne?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabMainImageOne?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabMainHeadingOne!}</h3>
                          <p class="desc ng-binding">${content.tabMainSubheadingOne!}</p>
                      </div>
                  </li>
                  <li>
                      <div class="img-wrap">
                      [#if content.tabMainImageTwo??]<img alt="${cmsfn.contentById( content.tabMainImageTwo?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabMainImageTwo?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabMainHeadingTwo!}</h3>
                          <p class="desc ng-binding">${content.tabMainSubheadingTwo!}</p>
                      </div>
                  </li>
                  <li>
                      <div class="img-wrap">
                      [#if content.tabMainImageThree??]<img alt="${cmsfn.contentById( content.tabMainImageThree?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabMainImageThree?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabMainHeadingThree!}</h3>
                          <p class="desc ng-binding">${content.tabMainSubheadingThree!}</p>
                      </div>
                  </li>
              </ul>
              <table class="fare-info__details-table" style="width:100%">
                  <tbody>


                  [#list content?children as columns]
                  [#if columns.name = "tabMainTable"]
                  [#list columns.getNodes() as column]

                  <tr>
                      <td>[#if column.hasProperty('c1')]${column.getProperty('c1').string!}[/#if]</td>
                      <td>[#if column.hasProperty('c2')]${column.getProperty('c2').string!}[/#if]</td>
                  </tr>
                  [/#list]
                  [/#if]
                  [/#list]
                  </tbody>
              </table>
          </div>
      </div>



    <!----- cabins_select ----->
      <div class="fare-info cf" id="cabins_select" style="display:none">
          <ul class="fare-info__image-list">
          [#list content?children as columns]
          [#if columns.name = "tabSelectImages"]
          [#list columns.getNodes() as column]
            <li>
                <figure>
                    [#if column.hasProperty('image')]
                      [#assign img = cmsfn.content("dam", column.getProperty('image').string)]
                      [#assign link = cmsfn.link("dam", img.UUID)]
                      <img out="${link!}" vx-global-image small="284" medium="476" large="714"/>
                    [/#if]
                    <figcaption>[#if column.hasProperty('desc')]${column.getProperty('desc').string!}[/#if]</figcaption>
                </figure>
            </li>
          [/#list]
          [/#if]
          [/#list]
          </ul>
          <div class="fare-info__details-wrap">
              <ul class="fare-info__highlights">
                  <li>
                      <div class="img-wrap">
                      [#if content.tabSelectImageOne??]<img alt="${cmsfn.contentById( content.tabSelectImageOne?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabSelectImageOne?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabSelectHeadingOne!}</h3>
                          <p class="desc ng-binding">${content.tabSelectSubheadingOne!}</p>
                      </div>
                  </li>
                  <li>
                      <div class="img-wrap">
                      [#if content.tabSelectImageTwo??]<img alt="${cmsfn.contentById( content.tabSelectImageTwo?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabSelectImageTwo?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabSelectHeadingTwo!}</h3>
                          <p class="desc ng-binding">${content.tabSelectSubheadingTwo!}</p>
                      </div>
                  </li>
                  <li>
                      <div class="img-wrap">
                      [#if content.tabSelectImageThree??]<img alt="${cmsfn.contentById( content.tabSelectImageThree?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabSelectImageThree?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabSelectHeadingThree!}</h3>
                          <p class="desc ng-binding">${content.tabSelectSubheadingThree!}</p>
                      </div>
                  </li>
              </ul>
              <table class="fare-info__details-table" style="width:100%">
                  <tbody>


                  [#list content?children as columns]
                  [#if columns.name = "tabSelectTable"]
                  [#list columns.getNodes() as column]

                  <tr>
                      <td>[#if column.hasProperty('c1')]${column.getProperty('c1').string!}[/#if]</td>
                      <td>[#if column.hasProperty('c2')]${column.getProperty('c2').string!}[/#if]</td>
                  </tr>
                  [/#list]
                  [/#if]
                  [/#list]
                  </tbody>
              </table>
          </div>
      </div>

    <!----- cabins_first ----->
      <div class="fare-info cf" id="cabins_first" style="display:none">
          <ul class="fare-info__image-list">
          [#list content?children as columns]
          [#if columns.name = "tabFirstImages"]
          [#list columns.getNodes() as column]
            <li>
                <figure>
                    [#if column.hasProperty('image')]
                      [#assign img = cmsfn.content("dam", column.getProperty('image').string)]
                      [#assign link = cmsfn.link("dam", img.UUID)]
                      <img out="${link!}" vx-global-image small="284" medium="476" large="714"/>
                    [/#if]
                    <figcaption>[#if column.hasProperty('desc')]${column.getProperty('desc').string!}[/#if]</figcaption>
                </figure>
            </li>
          [/#list]
          [/#if]
          [/#list]
          </ul>
          <div class="fare-info__details-wrap">
              <ul class="fare-info__highlights">
                  <li>
                      <div class="img-wrap">
                      [#if content.tabFirstImageOne??]<img alt="${cmsfn.contentById( content.tabFirstImageOne?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabFirstImageOne?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabFirstHeadingOne!}</h3>
                          <p class="desc ng-binding">${content.tabFirstSubheadingOne!}</p>
                      </div>
                  </li>
                  <li>
                      <div class="img-wrap">
                      [#if content.tabFirstImageTwo??]<img alt="${cmsfn.contentById( content.tabFirstImageTwo?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabFirstImageTwo?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabFirstHeadingTwo!}</h3>
                          <p class="desc ng-binding">${content.tabFirstSubheadingTwo!}</p>
                      </div>
                  </li>
                  <li>
                      <div class="img-wrap">
                      [#if content.tabFirstImageThree??]<img alt="${cmsfn.contentById( content.tabFirstImageThree?replace("jcr:", "") ,'dam').caption!}" out="${cmsfn.link("dam", content.tabFirstImageThree?replace("jcr:", "")! )}" vx-global-image small="186" medium="188" large="300"/>[/#if]
                      </div>
                      <div class="copy-wrap">
                          <h3 class="title ng-binding">${content.tabFirstHeadingThree!}</h3>
                          <p class="desc ng-binding">${content.tabFirstSubheadingThree!}</p>
                      </div>
                  </li>
              </ul>
              <table class="fare-info__details-table" style="width:100%">
                  <tbody>


                  [#list content?children as columns]
                  [#if columns.name = "tabFirstTable"]
                  [#list columns.getNodes() as column]

                  <tr>
                      <td>[#if column.hasProperty('c1')][@macros.createAnchor column.getProperty('c1').string!/][/#if]</td>
                      <td>[#if column.hasProperty('c2')][@macros.createAnchor column.getProperty('c2').string!/][/#if]</td>
                  </tr>
                  [/#list]
                  [/#if]
                  [/#list]
                  </tbody>
              </table>
          </div>
      </div>
      <div class="spacer" style="height:20px;"></div>
    </div>
</section>
</div>