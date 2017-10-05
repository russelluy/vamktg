[#macro createFaresTable placement airport]

        [#assign deals = cmsfn.contentById( 'b0ee57e9-1438-4a7b-b9b9-1bbe9e4a640e' ,'website')]

<div class="table-fares">

    <!-- this is breaking styling, we need to move it out of the template -->
    <script language="javascript">
        function showColumn(type){
            var colPrices = $('span[name=colPrices]');
            for (var i = 0; i < colPrices.length; i++) {
                colPrices[i].style.display = (type === 'colPrices')?'block':'none';
            }
            var colPoints = $('span[name=colPoints]');
            for (var i = 0; i < colPoints.length; i++) {
                colPoints[i].style.display = (type === 'colPoints')?'block':'none';
            }
        }
    </script>

<div class="table-fares-container--mobile">

                        <div class="fares-table-mobile__toggle-points">
                            <span name="colPrices" style="display: block">US Dollars&nbsp;&nbsp;<a href="javascript:showColumn('colPoints')" class="link-underline">Elevate Points</a></span>
                            <span name="colPoints" class="medium-grey" style="display: none"><a href="javascript:showColumn('colPrices')" class="link-underline">US Dollars</a>&nbsp;&nbsp;Elevate Points</span>
                        </div>
        <ul class="fare-cards">



[#list deals?children as dep]
[#list dep.getNodes() as fares]
[#if fares.name == "fares"]
[#list fares.getNodes() as dest]

  [#assign _dep = dep.name!]
  [#assign _des = dest.getProperty('destination').string!]
  [#assign _placement = dest.getProperty('placementIds').string!]
  [#assign _layoverAirport = dest.getProperty('layoverAirport').string!]
  [#assign _nonstop = dest.getProperty('nonstop').string!]

  [#assign _bookby = dest.getProperty('bookBy').string!]
  [#if _bookby != '']
    [#assign _bookByDt = _bookby?replace('T',' ')?date("yyyy-MM-dd hh:mm")]
    [#assign _bookby = _bookByDt?string("MMM d")]
  [/#if]

  [#assign _booklink = dest.getProperty('bookLink').string!]
  [#assign _points = dest.getProperty('points').string!]
  [#assign _price = dest.getProperty('price').string!]
  [#assign _purchase = dest.getProperty('ap').string!]
  [#if _purchase != '']
    [#assign _purchase = _purchase + ' Days']
  [/#if]
  [#assign _period = dest.getProperty('period').string!]

  [#assign _info = '']
  [#if _nonstop == 'true']
    [#if content.variant != 'both']
      [#if _dep != '']
        [#assign _info = '<spam class = "label">' + 'NONSTOP' +'<br/> FROM ' + _dep + '</spam>']
      [#else]
        [#assign _info = '<spam class = "label">' + 'NONSTOP' +'</spam>']
      [/#if]
    [/#if]
  [#else]
      [#if _layoverAirport != '']
        [#assign _info = '<spam class = "label">' + 'CONNECTING' +'<br/> FROM ' + _layoverAirport + '</spam>']
      [#else]
        [#assign _info = '<spam class = "label">' + 'CONNECTING' +'</spam>']
      [/#if]
  [/#if]

[#if _placement?index_of(placement) > -1 ]
[#if airport == 'ALL' || airport == 'all' || _dep == airport ]



        
            <li class="fare-card">
                <ul class="fare-card__destinations">
                    <li>[@macros.getAirport _dep 'name'/]</li>
                    <li>[@macros.getAirport _des 'name'/]</li>
                </ul>
                <dl class="fare-card__details cf">
                    <dt>Book By</dt>
                    <dd>[@macros.createAnchor _bookby!/]</dd>
                    <dt>Adv. Purchase</dt>
                    <dd>[@macros.createAnchor _purchase!/]</dd>
                    <dt>Travel Period</dt>
                    <dd>[@macros.createAnchor _period!/]</dd>
                </dl>

                <div class="fare-card__fare-deal">
                    <div class="fare-deal__from">From</div>
                    <div class="fare-deal__price"><span name="colPrices" style="display: block"><span class="dollar">$</span>${_price!}<span class="ast">*</span></span></div>
                    <div class="fare-deal__price"><span name="colPoints" style="display: none"><span class="points"></span>${_points!}<span class="ast"><sup>†</sup></span></span></div>
                    <div class="fare-deal__text">[@macros.createAnchor _info!/]</div>
                </div>

                <div class="fare-card__btn">
                    <a href="#" rel="nofollow">Book</a>
                </div>
            </li>



[/#if]
[/#if]
[/#list]
[/#if]
[/#list]
[/#list]


        </ul>
    </div>

    <div class="table-fares-container">
        <table class="fares-table">
            <thead>
                <tr>
                    <th>
                    [#if content.variant == 'both']
                    Between
                    [#else]
                    To
                    [/#if]
                    </th>
                    <th>
                        <div class="fares-table__toggle-points">
                            <span name="colPrices" style="display: block">US Dollars&nbsp;&nbsp;<a href="javascript:showColumn('colPoints')" class="link-underline">Elevate Points</a></span>
                            <span name="colPoints" class="medium-grey" style="display: none"><a href="javascript:showColumn('colPrices')" class="link-underline">US Dollars</a>&nbsp;&nbsp;Elevate Points</span>
                        </div>
                        Prices <span>Start At</span>
                    </th>
                    <th>Book By</th>
                    <th>Advance Purchase</th>
                    <th>Travel Period</th>
                    <th><a href="#textFooter" target="_self" class="fares-table__restrictions link-underline">Restrictions apply</a></th>
                </tr>
            </thead>
            <tbody>

[#list deals?children as dep]
[#list dep.getNodes() as fares]
[#if fares.name == "fares"]
[#list fares.getNodes() as dest]

  [#assign _dep = dep.name!]
  [#assign _des = dest.getProperty('destination').string!]
  [#assign _placement = dest.getProperty('placementIds').string!]
  [#assign _layoverAirport = dest.getProperty('layoverAirport').string!]
  [#assign _nonstop = dest.getProperty('nonstop').string!]

  [#assign _bookby = dest.getProperty('bookBy').string!]
  [#if _bookby != '']
    [#assign _bookByDt = _bookby?replace('T',' ')?date("yyyy-MM-dd hh:mm")]
    [#assign _bookby = _bookByDt?string("MMM d")]
  [/#if]

  [#assign _booklink = dest.getProperty('bookLink').string!]
  [#assign _points = dest.getProperty('points').string!]
  [#assign _price = dest.getProperty('price').string!]
  [#assign _purchase = dest.getProperty('ap').string!]
  [#if _purchase != '']
    [#assign _purchase = _purchase + ' Days']
  [/#if]
  [#assign _period = dest.getProperty('period').string!]

  [#assign _info = '']
  [#if _nonstop == 'true']
    [#if content.variant != 'both']
      [#if _dep != '']
        [#assign _info = '<spam class = "label">' + 'NONSTOP' +'</spam>FROM ' + _dep]
      [#else]
        [#assign _info = '<spam class = "label">' + 'NONSTOP' +'</spam>']
      [/#if]
    [/#if]
  [#else]
      [#if _layoverAirport != '']
        [#assign _info = '<spam class = "label">' + 'CONNECTING' +'</spam>FROM ' + _layoverAirport]
      [#else]
        [#assign _info = '<spam class = "label">' + 'CONNECTING' +'</spam>']
      [/#if]
  [/#if]

[#if _placement?index_of(placement) > -1 ]
[#if airport == 'ALL' || airport == 'all' || _dep == airport ]

                <tr>
                    <td>
                      [#if content.variant == 'both']
                        [@macros.getAirport _dep 'name'/]<span> [@macros.getAirport _dep 'state'/]</span>
                        <br/>
                      [/#if]
                      [@macros.getAirport _des 'name'/]<span> [@macros.getAirport _des 'state'/]</span>
                        <div class="label"><span class="trip">[@macros.createAnchor _info!/]</div>
                    </td>
                    <td>
                        <span name="colPrices" style="display: block">$${_price!}<sup>*</span>
                        <span name="colPoints" style="display: none">${_points!}<sup>†</sup></span>
                    </td>
                    <td>[@macros.createAnchor _bookby!/]</td>
                    <td>[@macros.createAnchor _purchase!/]</td>
                    <td>[@macros.createAnchor _period!/]</td>
                    <td><a href="#" rel="nofollow">Book</a></td>

          </tr>

[/#if]
[/#if]
[/#list]
[/#if]
[/#list]
[/#list]
            </tbody>
        </table>
    </div>
</div>

[/#macro]