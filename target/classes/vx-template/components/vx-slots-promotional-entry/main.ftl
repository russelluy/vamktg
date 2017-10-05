<li>
Slots:<br/>
<#assign first="true"><#list content?children as slots><#list slots.getNodes() as pair><#if first="false">,<br/></#if>
<#if pair.hasProperty('subset')>${pair.getProperty('subset').string!}</#if> - <#if pair.hasProperty('selection')>${pair.getProperty('selection').string!}</#if>
<#if pair.hasProperty('id')> - ${pair.getProperty('id').string!}</#if><#assign first="false">
</#list>
</#list>
</li>