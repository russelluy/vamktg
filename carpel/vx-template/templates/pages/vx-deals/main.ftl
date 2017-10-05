[#import "../../macros.ftl" as macros/]
[#import "../default.ftl" as base/]
[@base.page content model]
  [#assign _targetPage = cmsfn.page(content)]
  <div class="page-deals" ng-controller="DealsCtrl">
    <section class="page-deals-header">
      <div class="header-selector purple">
        <div id="header-selector-container">
            <p class="header-selector-paragraph" >Great deals from <span class= "container">
                <select id="dealsCombo" name="dealsCombo" class="header-selector-selectbox" data-ng-model="selectedOption">
                  [#list cmsfn.children(_targetPage, "mgnl:page") as childPage]
                  [#assign _airportRelated = childPage.airportRelated!'']
                  [#assign _dropDownLabel = childPage.dropDownLabel!'']
                  [#if _dropDownLabel != '']
                    <option 
                      airport="[@macros.getAirport _airportRelated 'code'/]" 
                      value="[@macros.createLink cmsfn.link(childPage)/]"
                      >${_dropDownLabel}</option>
                    [/#if]
                  [/#list]
                </select>
              </span>
            </p>
        </div>
      </div>
      <a href="javascript:document.location.href=$('#dealsCombo').val();" rel="”nofollow”">Find Deals</a>
    </section>
    <section class="page-deals-body">
      <div class="page-deals-body-container">
        <h2 class="subheading">Our Current Lowest Fares</h2>
        <div class="restrictions"><a href="#textFooter" target="_self">Restrictions Apply</a></div>
        <div class="spacer" style="height:5px"></div>
        [@cms.area name="stripes"/]
      </div>
    </section>
  </div>
[/@base.page]