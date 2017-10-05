[#import "../../macros.ftl" as macros/]
<script language="javascript">
function changeTable(type) {
  document.location.href='#'+type;
}
</script>
<div class="spacer" style="height:60px; padding-top:20">
  <div class="line"></div>
</div>
<section class="accordion__main is-active">
    <div>
    <header class="promotion-select">
      <ul class="tab-list cf">
        <li class="tab-list__item">
            <a href="javascript:changeTable('reservations')">Reservations</a>
        </li>
        <li class="tab-list__item">
            <a href="javascript:changeTable('baggage')">Baggage</a>
        </li>
        <li class="tab-list__item">
            <a href="javascript:changeTable('amenities')">Amenities</a>
        </li>
        <li class="tab-list__item">
            <a href="javascript:changeTable('upgrades')">Upgrades</a>
        </li>
      </ul>
    </header>
    </div>
</section>
<div class="spacer" style="height:60px; padding-top:20">
  <div class="line"></div>
</div>

<div class="wrap" id="reservations">

<div class="header-normal">
  <div class="wrap">
    <h2 class="heading-h2">Reservations</h2>
    <p class="subheading">${content.reservationsSubheading!}</p>
  </div>
</div>

  <div class="table-fees">
    <div class="container">
     <table>
          <thead>
            <tr>
              <th class="col first">&nbsp;<br/>&nbsp;<br/>Fee</th>
              <th class="col second">&nbsp;<br/>&nbsp;<br/>Main Cabin</th>
              <th class="col third">&nbsp;<br/>Main Cabin <br/>Refundable</th>
              <th class="col fourth">&nbsp;<br/>Main Cabin<br/>Select</th>
              <th class="col fifth">Main Cabin<br/>Select<br/>Refundable</th>
              <th class="col sixth">&nbsp;<br/>&nbsp;<br/>First Class</th>
              <th class="col seventh">&nbsp;<br/>First Class<br/>Refundable</th>
            </tr>
          </thead>
          <tbody>
  [#list content?children as columns]
  [#if columns.name = "reservationsColumns"]
  [#list columns.getNodes() as column]
            <tr>
              <td class="col first">
                [#if column.hasProperty('col1')][@macros.createAnchor column.getProperty('col1').string!/][/#if]
              </td>
              <td class="col second">
                [#if column.hasProperty('col2')][@macros.createAnchor column.getProperty('col2').string!/][/#if]
              </td>
              <td class="col third">
                [#if column.hasProperty('col3')][@macros.createAnchor column.getProperty('col3').string!/][/#if]
              </td>
              <td class="col fourth">
                [#if column.hasProperty('col4')][@macros.createAnchor column.getProperty('col4').string!/][/#if]
              </td>
              <td class="col fifth">
                [#if column.hasProperty('col5')][@macros.createAnchor column.getProperty('col5').string!/][/#if]
              </td>
              <td class="col sixth">
                [#if column.hasProperty('col6')][@macros.createAnchor column.getProperty('col6').string!/][/#if]
              </td>
              <td class="col seventh">
                [#if column.hasProperty('col7')][@macros.createAnchor column.getProperty('col7').string!/][/#if]
              </td>
            </tr>
  [/#list]
  [/#if]
  [/#list]
          </tbody>
        </table>
  </div>
  </div>
  <div class="spacer" style="height:20px; padding-top:10">
    <div class="line"></div>
  </div>
  <div class="text-footer">
    <div class="wrap">
      <div class="content">${cmsfn.decode(content).reservationsFooter!}</div>
    </div>
  </div>
</div>

<div class="wrap" id="baggage">

<div class="header-normal">
  <div class="wrap">
    <h2 class="heading-h2">Baggage</h2>
    <p class="subheading">${content.baggageSubheading!}</p>
  </div>
</div>

  <div class="table-fees">
    <div class="container">
     <table>
          <thead>
            <tr>
              <th class="col first">&nbsp;<br/>&nbsp;<br/>Fee</th>
              <th class="col second">&nbsp;<br/>&nbsp;<br/>Main Cabin</th>
              <th class="col third">&nbsp;<br/>Main Cabin <br/>Refundable</th>
              <th class="col fourth">&nbsp;<br/>Main Cabin<br/>Select</th>
              <th class="col fifth">Main Cabin<br/>Select<br/>Refundable</th>
              <th class="col sixth">&nbsp;<br/>&nbsp;<br/>First Class</th>
              <th class="col seventh">&nbsp;<br/>First Class<br/>Refundable</th>
            </tr>
          </thead>
          <tbody>
  [#list content?children as columns]
  [#if columns.name = "baggageColumns"]
  [#list columns.getNodes() as column]
            <tr>
              <td class="col first">
                [#if column.hasProperty('col1')][@macros.createAnchor column.getProperty('col1').string!/][/#if]
              </td>
              <td class="col second">
                [#if column.hasProperty('col2')][@macros.createAnchor column.getProperty('col2').string!/][/#if]
              </td>
              <td class="col third">
                [#if column.hasProperty('col3')][@macros.createAnchor column.getProperty('col3').string!/][/#if]
              </td>
              <td class="col fourth">
                [#if column.hasProperty('col4')][@macros.createAnchor column.getProperty('col4').string!/][/#if]
              </td>
              <td class="col fifth">
                [#if column.hasProperty('col5')][@macros.createAnchor column.getProperty('col5').string!/][/#if]
              </td>
              <td class="col sixth">
                [#if column.hasProperty('col6')][@macros.createAnchor column.getProperty('col6').string!/][/#if]
              </td>
              <td class="col seventh">
                [#if column.hasProperty('col7')][@macros.createAnchor column.getProperty('col7').string!/][/#if]
              </td>
            </tr>
  [/#list]
  [/#if]
  [/#list]
          </tbody>
        </table>
  </div>
  </div>
  <div class="spacer" style="height:20px; padding-top:10">
    <div class="line"></div>
  </div>
  <div class="text-footer">
    <div class="wrap">
      <div class="content">${cmsfn.decode(content).baggageFooter!}</div>
    </div>
  </div>
</div>

<div class="wrap" id="amenities">

<div class="header-normal">
  <div class="wrap">
    <h2 class="heading-h2">Amenities</h2>
    <p class="subheading">${content.amenitiesSubheading!}</p>
  </div>
</div>


  <div class="table-fees">
    <div class="container">
     <table>
          <thead>
            <tr>
              <th class="col first">&nbsp;<br/>&nbsp;<br/>Fee</th>
              <th class="col second">&nbsp;<br/>&nbsp;<br/>Main Cabin</th>
              <th class="col third">&nbsp;<br/>Main Cabin <br/>Refundable</th>
              <th class="col fourth">&nbsp;<br/>Main Cabin<br/>Select</th>
              <th class="col fifth">Main Cabin<br/>Select<br/>Refundable</th>
              <th class="col sixth">&nbsp;<br/>&nbsp;<br/>First Class</th>
              <th class="col seventh">&nbsp;<br/>First Class<br/>Refundable</th>
            </tr>
          </thead>
          <tbody>
  [#list content?children as columns]
  [#if columns.name = "amenitiesColumns"]
  [#list columns.getNodes() as column]
            <tr>
              <td class="col first">
                [#if column.hasProperty('col1')][@macros.createAnchor column.getProperty('col1').string!/][/#if]
              </td>
              <td class="col second">
                [#if column.hasProperty('col2')][@macros.createAnchor column.getProperty('col2').string!/][/#if]
              </td>
              <td class="col third">
                [#if column.hasProperty('col3')][@macros.createAnchor column.getProperty('col3').string!/][/#if]
              </td>
              <td class="col fourth">
                [#if column.hasProperty('col4')][@macros.createAnchor column.getProperty('col4').string!/][/#if]
              </td>
              <td class="col fifth">
                [#if column.hasProperty('col5')][@macros.createAnchor column.getProperty('col5').string!/][/#if]
              </td>
              <td class="col sixth">
                [#if column.hasProperty('col6')][@macros.createAnchor column.getProperty('col6').string!/][/#if]
              </td>
              <td class="col seventh">
                [#if column.hasProperty('col7')][@macros.createAnchor column.getProperty('col7').string!/][/#if]
              </td>
            </tr>
  [/#list]
  [/#if]
  [/#list]
          </tbody>
        </table>
  </div>
  </div>
  <div class="spacer" style="height:20px; padding-top:10">
    <div class="line"></div>
  </div>
  <div class="text-footer">
    <div class="wrap">
      <div class="content">${cmsfn.decode(content).amenitiesFooter!}</div>
    </div>
  </div>
</div>

<div class="wrap" id="upgrades">

<div class="header-normal">
  <div class="wrap">
    <h2 class="heading-h2">Upgrades</h2>
    <p class="subheading">${content.upgradesSubheading!}</p>
  </div>
</div>

  <div class="table-column-two">
    <div class="container">
     <table>
          <thead>
            <tr>
              <th class="col first">Upgrade</th>
              <th class="col second">Fee</th>
            </tr>
          </thead>
          <tbody>
  [#list content?children as columns]
  [#if columns.name = "upgradesColumns"]
  [#list columns.getNodes() as column]
            <tr>
              <td class="col first">
                [#if column.hasProperty('col1')][@macros.createAnchor column.getProperty('col1').string!/][/#if]
              </td>
              <td class="col second">
                [#if column.hasProperty('col2')][@macros.createAnchor column.getProperty('col2').string!/][/#if]
              </td>
            </tr>
  [/#list]
  [/#if]
  [/#list]
          </tbody>
        </table>
  </div>
  </div>
  <div class="spacer" style="height:20px; padding-top:10">
    <div class="line"></div>
  </div>
  <div class="text-footer">
    <div class="wrap">
      <div class="content">${cmsfn.decode(content).upgradesFooter!}</div>
    </div>
  </div>
</div>
