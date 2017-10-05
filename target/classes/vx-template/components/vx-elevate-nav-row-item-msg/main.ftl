[#assign _currentPage = cmsfn.page(content)]
<div class="nav-row comp-bg-${content.variant!}" data-vx-elevate-menu>
  <div class="nav-row-container--mobile">
    <form name="navrowmobileform" ng-if="elevateMenu.selectOption">
      <select class="nav-row-selectbox" ng-options="option.name for option in elevateMenu.menuOptions" ng-model="elevateMenu.selectOption" ng-change="elevateMenu.selectMenuOption(elevateMenu.selectOption)"></select>
    </form>
  </div>
  <div class="nav-row-container" ng-class="{'is-expanded': elevateMenu.expandedMenu, 'is-desktop': elevateMenu.desktopView}">
    <a href="#" class="nav-row-container__arrow" data-vx-common-prevent-default ng-click="elevateMenu.expandMenu()"></a>
    <ul class="nav-row-list cf">
      <li ng-show="elevateMenu.elevateLoggedIn">
        <a href="/elevate-frequent-flyer/my-account">My Account</a>
      </li>
      <li ng-show="!elevateMenu.elevateLoggedIn">
        <a href="/elevate-frequent-flyer/sign-up">Join Elevate</a>
      </li>
      <li><a href="/cms/elevate-frequent-flyer">About Elevate</a></li>
      <li><a href="/cms/elevate-frequent-flyer/earn-points">Earn Points</a></li>
      <li><a href="/cms/elevate-frequent-flyer/redeem-points">Redeem Points</a></li>
      <li><a href="/cms/elevate-frequent-flyer/status">Status</a></li>
      <li><a href="/cms/elevate-frequent-flyer/partners">Partners</a></li>
      <li><a href="/elevate-frequent-flyer/buy-gift-points">Buy Points</a></li>
      <li><a href="/elevate-frequent-flyer/credit-card">Credit Card</a></li>
      <li ng-show="elevateMenu.elevateLoggedIn">
        <a href="#" data-vx-common-prevent-default ng-click="elevateMenu.logOut()">SIGN OUT</a>
      </li>
    </ul>
  </div>
</div>