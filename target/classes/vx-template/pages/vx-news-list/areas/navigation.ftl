[#import "../../../macros.ftl" as macros/]
[#assign currentPage = cmsfn.page(content)]
[#assign rootPage = cmsfn.root(content, "mgnl:page")!]

<script language="javascript">
function openLink (link) {
  document.location.href = link;
}
</script>

[#assign counter = 1]

    [#list cmsfn.children(currentPage, "mgnl:page") as childPage]
[#if counter = 1]
  [#assign type = 'first']
  <div class="news border"><div class="wrap"><div class="container">
[/#if]
[#if counter = 2]
  [#assign type = 'second']
[/#if]
[#if counter = 3]
  [#assign type = 'third']
[/#if]
<div class="col ${type!}">
  <table class="yts-summary">
      <tbody>
          <tr>
            <div class="three-up-item-news" onclick="openLink('[@macros.createLink cmsfn.link(childPage)/]')" style="cursor: pointer;">
              <div class="centered">
                [#assign dt = stkfn.metaDataProperty(childPage,"mgnl:lastModified")?replace('T',' ')?date("yyyy-MM-dd hh:mm")]
                [#assign diff = ( .now?long - dt?long )/ (1000 * 60 * 60 * 24)]
                [#assign _text = dt?string("EEEE, MM/dd/yyyy")]
                [#if diff < 150]
                  [#assign _text = (diff/30)?ceiling?string + ' MONTHS AGO']
                [/#if]
                [#if diff < 30]
                  [#assign _text = (diff/7)?ceiling?string + ' WEEKS AGO']
                [/#if]
                [#if diff < 8]
                  [#assign _text = diff?ceiling?string + ' DAYS AGO']
                [/#if]
                [#if diff < 1]
                  [#assign _text = (diff/24)?ceiling?string + ' HOURS AGO']
                [/#if]
                [#if _text?index_of("1") > -1]
                  [#assign _text = _text?replace('MONTHS','MONTH')]
                  [#assign _text = _text?replace('WEEKS','WEEK')]
                  [#assign _text = _text?replace('DAYS','DAY')]
                  [#assign _text = _text?replace('HOURS','HOUR')]
                [/#if]
                <p class="subheading">${_text}</p>
                <h2 class="heading">${childPage.title!childPage.@name}</h2>
                <a href="[@macros.createLink cmsfn.link(childPage)/]">Read More</a>
              </div>
            </div>
          </tr>
      </tbody>
  </table>
</div>
[#if counter = 3]
  [#assign counter = 1]
  </div></div></div>
  <div class="spacer" style="height:1px; padding-top:0px">
  <div class="line"></div>
  </div>
[#else]
  [#assign counter = counter + 1]
[/#if]
  [/#list]

  [#if counter != 1]
  </div></div></div>
[/#if]

