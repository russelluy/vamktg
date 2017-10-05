[#import "../default.ftl" as base/]
[@base.page content model]
<div class="promotions-accordion" id="promotions-accordion" ng-controller="PromotionsCtrl">
  [@cms.area name="stripes"/]
  <div class="spacer" style="height:1px; padding-top:0px"><div class="line"></div></div>
    <div data-vx-accordion data-content-type="promotion" data-title="What's Onboard" data-template="/cms/.resources/vx-template/app_templates/flying-with-us.tpl.html" data-content="promotions.flyingWithUs" data-expanded="true" data-expandable="false">
  </div>
  <div class="spacer" style="height:1px; padding-top:0px"><div class="line"></div></div>
          <div data-vx-accordion data-content-type="promotion" data-title="Onboard Entertainment" data-template="/cms/.resources/vx-template/app_templates/entertainment.tpl.html" data-content="promotions.onboardEntertainment" data-expanded="true" data-expandable="false" data-header-class="promotion__header--entertainment">
          </div>
  <div class="spacer" style="height:1px; padding-top:0px"><div class="line"></div></div>
          <div data-vx-accordion data-content-type="promotion" data-title="Food &amp; Drinks" data-template="/cms/.resources/vx-template/app_templates/food-and-drinks.tpl.html" data-content="promotions.foodAndDrink" data-expanded="true" data-expandable="false" data-header-class="promotion__header--food">
          </div>
</div>
[/@base.page]