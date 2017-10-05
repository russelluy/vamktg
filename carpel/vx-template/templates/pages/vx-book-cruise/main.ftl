[#import "../default.ftl" as base/]
[@base.page content model]

<div class="header-normal">
  <div class="wrap">
    <h1 class="heading">Book a Cruise</h1>
    <p class="subheading">Earn one point per dollar spent on your cruise</p>
  </div>
</div>
<div class="wrap" style="max-width:800px">
<form name="search_form" action="http://www.res99.com/nexres/start-pages/gateway.cgi" target="_blank">
  <input name="engine" type="hidden" value="cruise">
  <input name="Service" type="hidden" value="WCT">
  <input name="src" type="hidden" value="10026571">
  <input name="subAffiliateId" type="hidden" value="">
  <input name="action" type="hidden" value="search">
  <input name="geographicRegion" type="hidden" value="">
  <input name="cruiseLength" type="hidden" value="">
  <input name="selectCruiseVendor" type="hidden" value="">
  <input name="fromMonthYear" type="hidden" value="">
</form>
<script language="javascript">
  function searchCruise(){
    var _continue = true;
    /*
    if($('select[name=geographicRegion]').val() === ''){
      _continue = false;
    }
    if($('select[name=cruiseLength]').val() === ''){
      _continue = false;
    }
    if($('select[name=selectCruiseVendor]').val() === ''){
      _continue = false;
    }
    if($('select[name=fromMonthYear]').val() === ''){
      _continue = false;
    }
    */
    if (_continue) {
      $('input[name=geographicRegion]').val( $('select[name=geographicRegion]').val() );
      $('input[name=cruiseLength]').val( $('select[name=cruiseLength]').val() );
      $('input[name=selectCruiseVendor]').val( $('select[name=selectCruiseVendor]').val() );
      $('input[name=fromMonthYear]').val( $('select[name=fromMonthYear]').val() );
      $('form[name=search_form]').submit();
    }
  }
</script>
<div style="float:left; width:50%; padding:0px 0px 20px 20px;">
<div class="calculator-footer">
    Destination:
</div>
<div class="drop-down" style="width:100%">
  <div class="drop-down-container">
    <form name="navform">
      <select name="geographicRegion" class="drop-down-selectbox">
<option selected="selected" value="">Any Destination</option><option value="1201">Africa</option><option value="184">Alaska - All</option><option value="2050">» Alaska</option><option value="2048">» Alaska Cruise Tours</option><option value="2007">Antarctica</option><option value="2059">Asia - all</option><option value="1704">» Asia</option><option value="2052">» Asia Cruise Tours</option><option value="2058">» India</option><option value="2060">Australia/New Zealand - all</option><option value="89">» Australia/New Zealand</option><option value="2053">» Australia/New Zealand Cruise Tours</option><option value="1295">Bahamas</option><option value="1035">Bermuda</option><option value="2063">Canada/New England - all</option><option value="1294">» Canada/New England</option><option value="2056">» Canada/New England Cruise Tours</option><option value="24">Caribbean - All</option><option value="186">» Eastern Caribbean</option><option value="189">» Southern Caribbean</option><option value="187">» Western Caribbean</option><option value="23">Europe - All</option><option value="2049">» Europe Cruise Tours</option><option value="407">» Mediterranean</option><option value="795">» Northern Europe</option><option value="793">» Transatlantic</option><option value="1465">» Western Europe</option><option value="26">Hawaii</option><option value="7">Mexico - All</option><option value="56">» Baja California</option><option value="411">» Mexican Riviera</option><option value="2062">Middle East - all</option><option value="2054">» Middle East</option><option value="2055">» Middle East Cruise Tours</option><option value="2017">Nowhere</option><option value="240">Panama Canal</option><option value="2061">South America - parent</option><option value="2057">» Galapagos Islands</option><option value="1296">» South America</option><option value="2051">» South America Cruise Tours</option><option value="579">Tahiti</option><option value="1896">U.S. Pacific Coast</option><option value="2047">World</option>
      </select>
    </form>
  </div>
</div>
<div class="calculator-footer">
    <u><a href="http://go.travelpn.com/ecruise/CruiseSearchForm.do?&affiliateId=10026571&subAffiliateId=&Service=WCT" target="_blank">See Virgin America destinations</a></u>
</div>
</div>

<div style="float:left; width:50%; padding:0px 0px 20px 20px;">
<div class="calculator-footer">
    Cruise Length:
</div>
<div class="drop-down" style="width:100%">
  <div class="drop-down-container">
    <form name="navform">
      <select name="cruiseLength" class="drop-down-selectbox">
<option selected="selected" value="">Any Length</option><option value="1-2">1-2 Nights</option><option value="3-6">3-6 Nights</option><option value="7-9">7-9 Nights</option><option value="10-14">10-14 Nights</option><option value="14-">Over 14 Nights</option>
      </select>
    </form>
  </div>
</div>
<div class="calculator-footer">
    &nbsp;
</div>
</div>
<div class="spacer" style="height:20px;">
</div>
<div style="float:left; width:50%; padding:0px 0px 20px 20px;">
<div class="calculator-footer">
    Cruise Line:
</div>
<div class="drop-down" style="width:100%">
  <div class="drop-down-container">
    <form name="navform">
      <select name="selectCruiseVendor" class="drop-down-selectbox">
<option selected="selected" value="">All Cruise Lines</option><option value="57">Azamara Club Cruises</option><option value="9">Carnival Cruise Lines</option><option value="14">Celebrity Cruises</option><option value="52">Costa Cruises</option><option value="24">Disney Cruise Line</option><option value="15">Holland America Line</option><option value="51">MSC Cruises</option><option value="7">Norwegian Cruise Line</option><option value="48">Oceania Cruises</option><option value="28">Princess Cruises</option><option value="46">Regent Seven Seas Cruises</option><option value="5">Royal Caribbean Int'l</option><option value="60">Seabourn</option>
      </select>
    </form>
  </div>
</div>
<div class="calculator-footer">
    <u><a href="http://go.travelpn.com/ecruise/CruiseSearchForm.do?&affiliateId=10026571&subAffiliateId=&Service=WCT" target="_blank">Find special rates based on residency, age or past cruises</a></u>
</div>
</div>
<div style="float:left; width:50%; padding:0px 0px 20px 20px;">
<div class="calculator-footer">
    Month:
</div>
<div class="drop-down" style="width:100%">
  <div class="drop-down-container">
    <form name="navform">
      <select name="fromMonthYear" class="drop-down-selectbox">
<option selected="selected" value="">Select Month</option><option value="2014-01">January-2014</option><option value="2014-02">February-2014</option><option value="2014-03">March-2014</option><option value="2014-04">April-2014</option><option value="2014-05">May-2014</option><option value="2014-06">June-2014</option><option value="2014-07">July-2014</option><option value="2014-08">August-2014</option><option value="2014-09">September-2014</option><option value="2014-10">October-2014</option><option value="2014-11">November-2014</option><option value="2014-12">December-2014</option><option value="2015-01">January-2015</option><option value="2015-02">February-2015</option><option value="2015-03">March-2015</option><option value="2015-04">April-2015</option><option value="2015-05">May-2015</option><option value="2015-06">June-2015</option><option value="2015-07">July-2015</option><option value="2015-08">August-2015</option><option value="2015-09">September-2015</option><option value="2015-10">October-2015</option><option value="2015-11">November-2015</option><option value="2015-12">December-2015</option>
      </select>
    </form>
  </div>
</div>
<div class="calculator-footer">
    &nbsp;
</div>
</div>
</div>
<div class="button-cmp purple" style="padding:0px">
  <a href="javascript:searchCruise()" style="margin-top:0px; max-width:300px">Search Cruises</a>
</div>
<div class="calculator-footer" id="endPage" name="endPage"></div>
    [@cms.area name="stripes"/]
[/@base.page]