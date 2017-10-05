<#assign first="true"><#list content?children as slots><#list slots.getNodes() as pair><#if first="false">,</#if><#assign first="false">
{
"subset": "${pair.getProperty('subset').string!}",
"selection": "${pair.getProperty('selection').string!}",
"id": "${pair.getProperty('id').string!}"
}
</#list>
</#list>