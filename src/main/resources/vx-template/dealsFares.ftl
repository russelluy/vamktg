[#macro createFares placement airport variant]


<script language="javascript">
function openLink (link) {
  document.location.href = link;
}
</script>
<div class="fares">
    <div class="wrap">
        <div class="container">
[#assign _counter = 0]

        [#assign deals = cmsfn.contentById( 'b0ee57e9-1438-4a7b-b9b9-1bbe9e4a640e' ,'website')]
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
        [#assign _info = '<spam class = "label">' + 'NONSTOP' +'</spam><br/>FROM ' + _dep]
      [#else]
        [#assign _info = '<spam class = "label">' + 'NONSTOP' +'</spam><br/>&nbsp;']
      [/#if]
    [/#if]
  [#else]
      [#if _layoverAirport != '']
        [#assign _info = '<spam class = "label">' + 'CONNECTING' +'</spam><br/>FROM ' + _layoverAirport]
      [#else]
        [#assign _info = '<spam class = "label">' + 'CONNECTING' +'</spam><br/>&nbsp;']
      [/#if]
  [/#if]

[#if _counter < variant?number && _placement?index_of(placement) > -1 ]
[#if airport == 'ALL' || airport == 'all' || _dep == airport ]
  [#assign _counter = _counter + 1]
            [#if _counter == 1]
              <div class="col first">
            [#else]
              [#if _counter <= 3]
                <div class="col second">
              [#else]
                <div class="col third">
              [/#if]
            [/#if]
                <div class="yts-trip--lg__yts-summary" onclick="openLink('${_booklink!}')" style="cursor: pointer;">
                    <table class="yts-summary">
                        <tbody>
                            <tr>
                                <td class="image" colspan="3">
                                  <img out="/cms/.resources/vx-template/images/cities/${_des!}-mini-2x.png" vx-global-image small="80" medium="120" large="120"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="fromto is-dest is-from">${_dep!}</td>
                                <td class="fromto is-arr">-</td>
                                <td class="fromto is-dest is-to">${_des!}</td>
                            </tr>
                            <tr>
                                <td class="price" colspan="3">FROM $${_price!}*</td>
                            </tr>
                            <tr>
                                <td class="compare" colspan="3"></td>
                            </tr>
                            <tr>
                                <td class="button" colspan="3"><a rel="nofollow" href="${_booklink!}">Book</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
[/#if]
[/#if]
[/#list]
[/#if]
[/#list]
[/#list]

        </div>
    </div>
</div>

[/#macro]