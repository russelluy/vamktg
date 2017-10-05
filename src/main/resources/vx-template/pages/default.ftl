[#macro page content model]
<!doctype html>
<!--[if IE 8]> <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if IE 9]> <html class="no-js ie9" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimal-ui">

        <link rel="shortcut icon" href="/cms/.resources/vx-template/images/favicon.ico">

        <!--[if lte IE 8]>
            <link rel="stylesheet" href="/cms/.resources/vx-template/styles/main-ie8.css">
        <![endif]-->
        <!--[if gt IE 8]><!-->
            <link rel="stylesheet" href="/cms/.resources/vx-template/styles/main.css">
        <!--<![endif]-->

        [#assign domain = state.originalBrowserURL?replace('http://','')?replace('https://','')?split('/')[0]][#if domain == 'rogerioworkco:8080' || domain == 'magnolia.work.co']<link rel='stylesheet' type='text/css' href='/cms/.resources/vx-template/images/fonts.css'>[#else]<link rel='stylesheet' type='text/css' href='//cloud.typography.com/6612472/695864/css/fonts.css'>[/#if]

        <script src="/cms/.resources/vx-template/scripts/vx-cms-head.min.js"></script>

    
<!-- build: Tagging -->
<script language="javascript">
// Data Layer
var pageSlug = "${content.pageSlug!}";
var webData ={
[#if content.pageSlug??]pageName: "cms: " + pageSlug // Page Name (Page slug variable assumed)[/#if]
[#list content?children as to]
[#if to.name = "pairValues"]
[#list to.getNodes() as to_pair]
,${to_pair.getProperty('n').string!}: "${to_pair.getProperty('v').string!}"
[/#list]
[/#if]
[/#list]
[#if content.siteArea??],siteSection: "${content.siteArea!}" // Site Area (page groupings still to be confirmed / entered on page)[/#if]
};
// TagMan Container
window.tmParam = {};
(function(d,s){
var client = 'virginamerica';
var siteId = 20;
//  do not edit
var a=d.createElement(s),b=d.getElementsByTagName(s)[0];
a.async=true;a.type='text/javascript';
a.src='//sec.levexis.com/clients/'+client+'/'+siteId+'.js';
a.tagman='st='+(+new Date())+'&c='+client+'&sid='+siteId;
b.parentNode.insertBefore(a,b);
})(document,'script');
</script>
<!-- endbuild -->

<!-- build: Carpel/Magnolia -->
[@cms.init /]
<meta http-equiv='cache-control' content='no-cache'>
<meta http-equiv='expires' content='0'>
<meta http-equiv='pragma' content='no-cache'>
<link rel="canonical" href="${content.canonical!state.originalBrowserURL?replace(".html","")}"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="keywords" content="${content.keywords!content.title!content.@name}" />
<meta name="description" content="${content.description!content.abstract!}" />
<!-- FACEBOOK SOCIAL MEDIA SHARE -->
<meta property="og:title" content="${content.face_title!}"/>
<meta property="og:url" content="${content.face_url!}"/>
<meta property="og:site_name" content="${content.face_site_name!}"/>
<meta property="og:admins" content="${content.face_admins!}"/>
<meta property="og:description" content="${content.face_description!content.description!content.abstract!}"/>
<meta property="og:type" content="${content.face_type!}"/>
<meta property="og:image" content="${content.face_image!}"/>
<!-- END FACEBOOK -->
<!-- TWITTER -->
<meta name="twitter:site" content="@VirginAmerica" />
<meta name="twitter:card" content="${content.twitter_summary!}" />
<!-- END TWITTER -->
<meta name="author" content="${content.author!}" />
<meta name="robots" content="${content.robots!'all'}" />
[#assign pageModel = model.root!]
[#assign contentPageTitle = content.windowTitle!content.title!content.@name]
<title>${contentPageTitle} | Virgin America</title>
<!-- endbuild -->
</head>

    <body data-vx-common-window="">
        

        <header data-ng-cloak="" data-vx-common-header="" role="banner" class="banner" ng-class="{'is-nav-expanded-active': header.dropdown.navActive, 'is-nav-elevate-active': header.elevateLogin}" ng-show="header.visible">
            <h3 class="navbar__logo">
                <a href="/" target="_self">Virgin America</a>
            </h3>
            <nav class="navbar__main cf">
                <ul class="navlist--main cf" ng-hide="header.breakpoint === 'small'">
                    <li><a href="/cms/book-travel" target="_self">Book</a></li>
                    <li><a href="/flight-check-in">Check In</a></li>
                    <li><a href="/manage-itinerary">Manage</a></li>
                </ul>
                <ul class="navlist--sub cf" ng-hide="header.breakpoint === 'small' || header.breakpoint === 'medium'">
                    <li><a href="/cms/travel-deals" target="_self">Deals</a></li>
                    <li><a href="/cms/fly-with-us" target="_self">Flying With Us</a></li>
                    <li><a href="/cms/airport-destinations" target="_self">Where We Fly</a></li>
                    <li><a href="/cms/vx-fees" target="_self">Fees</a></li>
                    <li><a href="/check-flight-status">Flight Status</a></li>
                    <li><a href="/get-flight-alerts">Flight Alerts</a></li>
                </ul>
            </nav>
            <div class="navbar__right cf">
                <div class="navbar__expand-nav">
                    <a href="#" data-vx-common-prevent-default="" class="expand-nav icon-nav-toggle" ng-click="header.toggleDropdown()">Nav</a>
                </div>
                <div class="navbar__elevate-nav" ng-switch="header.mustShowElevateTicker">
                    <span class="elevate-nav--logged-out cf" ng-switch-when="false">
                        <a href="/cms/elevate-frequent-flyer" class="elevate-nav__link elevate-nav__link--about icon-elevate-small">About Elevate</a>
                        <a href="/elevate-frequent-flyer" class="elevate-nav__link elevate-nav__link--sign-in icon-elevate-small">Sign In</a>
                        <a href="/elevate-frequent-flyer/sign-up" class="elevate-nav__link" ng-show="header.breakpoint !== 'small'">Sign Up</a>
                    </span>
                    <a ng-href="{{(header.elevateLoggedIn) ? '/elevate-frequent-flyer/landing': '/elevate-frequent-flyer'}}" data-vx-common-prevent-default="" class="elevate-nav--logged-in" ng-switch-when="true">
                        <div class="navbar-avatar">
                            <span class="icon-avatar-{{header.memberAvatar}}-sm"></span>
                        </div>
                        <span>{{header.elevateUser.firstName}} {{header.elevateUser.lastName}}</span>
                        <span>{{header.elevateUser.numOfPointsAvailable || '0' | number}} Points</span>
                    </a>
                </div>
            </div>
            <nav class="nav-dropdown js-dropdown" ng-hide="!header.dropdown.navActive || header.breakpoint === 'large'">
                <div class="nav-expanded">
                    <ul class="nav-expanded__list">
                        <li>
                            <a href="/" ng-click="header.toggleDropdown()">Home</a>
                        </li>
                        <li>
                            <a href="/cms/book-travel" ng-click="header.toggleDropdown()" target="_self">Book</a>
                        </li>
                        <li>
                            <a href="/flight-check-in" ng-click="header.toggleDropdown()">Check In</a>
                        </li>
                        <li>
                            <a href="/manage-itinerary" ng-click="header.toggleDropdown()">Manage</a>
                        </li>
                    </ul>
                    <ul class="nav-expanded__list--sub">
                        <li><a href="/cms/travel-deals" target="_self" ng-click="header.toggleDropdown()">Deals</a></li>
                        <li><a href="/cms/fly-with-us" target="_self" ng-click="header.toggleDropdown()">Flying With Us</a></li>
                        <li><a href="/cms/airport-destinations" target="_self" ng-click="header.toggleDropdown()">Where We Fly</a></li>
                        <li><a href="/cms/vx-fees" target="_self" ng-click="header.toggleDropdown()">Fees</a></li>
                        <li><a href="/check-flight-status" target="_self" ng-click="header.toggleDropdown()">Flight Status</a></li>
                        <li><a href="/get-flight-alerts" target="_self" ng-click="header.toggleDropdown()">Flight Alerts</a></li>
                    </ul>
                </div>
            </nav>

            <!--<div data-vx-common-saved-choices-bar></div>-->
        </header>

        <div role="main" class="content">
            [#nested/]

        </div>

        <footer role="contentinfo" data-ng-cloak="" data-vx-common-footer="">
            <div bindonce="" class="wrap">
                <div class="footer-wrap" ng-switch="footer.breakpoint">
                    <div data-ng-cloak="" ng-switch-when="small">
                        <nav class="footer-nav cf">
                            <ul class="footer-nav__list" ng-repeat="linkGroup in footer.links[0]">
                                <li class="footer-nav__item" ng-repeat="link in linkGroup">
                                    <a ng-href="{{link.url}}" ng-bind="link.name" target="_self"></a>
                                </li>
                            </ul>
                            <ul class="footer-nav__list" ng-repeat="linkGroup in footer.links[5]">
                                <li class="footer-nav__item" ng-repeat="link in linkGroup">
                                    <a ng-href="{{link.url}}" ng-bind="link.name" target="_self" rel="me"></a>
                                </li>
                            </ul>
                            <div class="footer-nav__select">
                                <a href="#" class="btn--select" ng-click="footer.openFooterModal()">More Options</a>
                            </div>
                        </nav>
                    </div>
                    <div data-ng-cloak="" ng-switch-when="medium">
                        <nav class="footer-nav cf">
                            <div class="footer-nav__list-wrap">
                                <ul ng-repeat="linkGroup in footer.links[0]">
                                    <li class="footer-nav__item" ng-repeat="link in linkGroup">
                                        <a ng-href="{{link.url}}" ng-bind="link.name" target="_self"></a>
                                    </li>
                                </ul>
                                <ul ng-repeat="linkGroup in footer.links[4]">
                                    <li class="footer-nav__item" ng-repeat="link in linkGroup">
                                        <a ng-href="{{link.url}}" ng-bind="link.name" target="_self"></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="footer-nav__list-wrap">
                                <ul ng-repeat="linkGroup in footer.links[1]">
                                    <li class="footer-nav__item" ng-repeat="link in linkGroup">
                                        <a ng-href="{{link.url}}" ng-bind="link.name" target="_self"></a>
                                    </li>
                                </ul>
                                <ul ng-repeat="linkGroup in footer.links[3]">
                                    <li class="footer-nav__item" ng-repeat="link in linkGroup">
                                        <a ng-href="{{link.url}}" ng-bind="link.name" target="_self"></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="footer-nav__list-wrap">
                                <ul ng-repeat="linkGroup in footer.links[2]">
                                    <li class="footer-nav__item" ng-repeat="link in linkGroup">
                                        <a ng-href="{{link.url}}" ng-bind="link.name" target="_self"></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="footer-nav__list-wrap">
                                <ul ng-repeat="linkGroup in footer.links[5]">
                                    <li class="footer-nav__item" ng-repeat="link in linkGroup">
                                        <a ng-href="{{link.url}}" ng-bind="link.name" target="_self" rel="me"></a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <nav class="footer-nav cf" ng-switch-when="large">
                        <ul class="footer-nav__list">
                            <li class="footer-nav__item"><a href="/cms/sitemap" target="_self">Sitemap</a></li>
                            <li class="footer-nav__item"><a href="http://virginamerica.custhelp.com/">Contact Us/FAQs</a></li>
                            <li class="footer-nav__item"><a href="/cms/about-our-airline" target="_self">About Us</a></li>
                            <li class="footer-nav__item"><a href="/cms/about-our-airline/press" target="_self">Press</a></li>
                        </ul>
                        <ul class="footer-nav__list">
                            <li class="footer-nav__item"><a href="/blog">Blog</a></li>
                            <li class="footer-nav__item"><a href="/cms/airline-jobs" target="_self">Careers</a></li>
                            <li class="footer-nav__item"><a href="/cms/corporate-travel" target="_self">Corporate &amp; Group Travel</a></li>
                            <li class="footer-nav__item"><a href="/cms/corporate-travel/travel-agents" target="_self">Travel Agents</a></li>
                        </ul>
                        <ul class="footer-nav__list">
                            <li class="footer-nav__item"><a href="/cms/legal/guest-service-commitment" target="_self">Guest Service Commitment</a></li>
                            <li class="footer-nav__item"><a href="/cms/dam/vx-pdf/contract-of-carriage.pdf" target="_self">Contract of Carriage</a></li>
                            <li class="footer-nav__item"><a href="/cms/dam/vx-pdf/international-contract-of-carriage.pdf" target="_self">Int’l Contract of Carriage</a></li>
                            <li class="footer-nav__item"><a href="/cms/corporate-responsibility" target="_self">Corporate Responsibility</a></li>
                        </ul>
                        <ul class="footer-nav__list">
                            <li class="footer-nav__item"><a href="http://elevate.virginamerica.com/pub/sf/ResponseForm?_ri_=X0Gzc2X%3DWQpglLjHJlYQGmAt9ur9biu27Jh9e9uzfeDcCi8SonfVXMtX%3DWQpglLjHJlYQGruK1w1EzbazdUdEGG6gmlazdJwoNGDzbf&_ei_=EmSL9xUrhFrGHt6VuHz0Fpo">Email Unsubscribe</a></li>
                            <li class="footer-nav__item"><a href="/cms/legal/privacy-policy" target="_self">Privacy Policy</a></li>
                            <li class="footer-nav__item"><a href="/cms/travel-guard" target="_self">Travel Insurance</a></li>
                            <li class="footer-nav__item"><a href="/cms/news" target="_self">All News &amp; Updates</a></li>
                        </ul>
                        <ul class="footer-nav__list">
                            <li class="footer-nav__item"><a href="/cms/elevate-frequent-flyer" target="_self">What Is Elevate?</a></li>
                            <li class="footer-nav__item"><a href="/elevate-frequent-flyer/credit-card" target="_self">Virgin America Credit Card</a></li>
                            <li class="footer-nav__item"><a href="/cms/advertise-onboard" target="_self">Advertise Onboard</a></li>
                            <li class="footer-nav__item"><a href="https://plus.google.com/+VirginAmerica/" target="_blank" rel="publisher">Google+</a></li>
                        </ul>
                        <ul class="footer-nav__list is-omega">
                            <li class="footer-nav__item"><a rel="me" href="http://instagram.com/virginamerica" target="_blank" rel="me">Instagram</a></li>
                            <li class="footer-nav__item"><a rel="me" href="https://twitter.com/VirginAmerica" target="_blank" rel="me">Twitter</a></li>
                            <li class="footer-nav__item"><a rel="me" href="https://www.facebook.com/VirginAmerica" target="_blank" rel="me">Facebook</a></li>
                            <li class="footer-nav__item"><a href="https://www.youtube.com/user/VirginAmerica" target="_blank" rel="me">YouTube</a></li>
                        </ul>
                    </nav>
                    <div class="footer-copy">
                        &copy; <span ng-bind="footer.year | date:'yyyy'"></span> Virgin America
                    </div>
                </div>
            </div>
        </footer>

    <script src="/cms/.resources/vx-template/scripts/vx-cms.min.js"></script>

    <!--[if lt IE 10]>
        <script src="/cms/.resources/vx-template/scripts/shims/css3-multi-column.min.js"></script>
    <![endif]-->

        <!--[if lte IE 8]>
            <div class="modal__window--ie8">
                <div class="modal__bkgd">&nbsp;</div>
                <div class="modal__dialog">
                    <div class="modal__header">
                        <h3 class="modal__title">Your browser is not currently supported</h3>
                    </div>
                    <div class="modal__content is-generic">
                        <p>But there’s an easy fix! The Virgin America site works on a wide range of browsers. Click one of the icons below and follow the instructions. You’ll be flying in no time.</p>

                        <p>Find the latest versions of our supported browsers below:</p>

                        <ul class="supported-browsers">
                            <li class="supported-browsers__chrome">
                                <a href="https://www.google.com/intl/en-US/chrome/browser/‎">
                                    <span class="btn btn-normal btn-primary btn-block">Download Google Chrome</span>
                                </a>
                            </li>
                            <li class="supported-browsers__firefox">
                                <a href="http://www.mozilla.org/en-US/firefox/new/‎">
                                    <span class="btn btn-normal btn-primary btn-block">Download Firefox</span>
                                </a>
                            </li>
                            <li class="supported-browsers__ie is-omega">
                                <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">
                                    <span class="btn btn-normal btn-primary btn-block">Download Internet Explorer</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        <![endif]-->
    </body>
</html>
[/#macro]
