[#assign final_text=cmsfn.decode(content).text]
[#assign final_text=final_text?replace("(\r\n)+","","r")?replace('<span style="font-family:span"(.+)</span>','<span class="heading"$1</span>','ir')]
[#assign final_text=final_text?replace("(\r\n)+","","r")?replace('<span style="font-family:header"(.+)</span>','<h2 class="subheading"$1</h2>','ir')]
[#assign final_text=final_text?replace("(\r\n)+","","r")?replace('<span style="font-family:paragraph"(.+)</span>','<p$1</p>','ir')]

[#assign final_text=final_text?replace("(\r\n)+","","r")?replace('<span style="font-family:subheading"(.+)</span>','<span class="subheading"$1</span>','ir')]
[#assign final_text=final_text?replace("(\r\n)+","","r")?replace('<span style="font-family:heading"(.+)</span>','<h2 class="heading"$1</h2>','ir')]
[#assign final_text=final_text?replace("(\r\n)+","","r")?replace('<span style="font-family:text"(.+)</span>','<p$1</p>','ir')]


[#assign final_text=final_text?replace('color: rgb(123, 123, 123); outline: none;','')]
[#assign final_text=final_text?replace('<table','<div class="table-text-body"><table')]
[#assign final_text=final_text?replace('</table>','</table></div>')]
[#assign final_text=final_text?replace('<td>','<td class="col">')]

<div class="text-body ${content.variant!}">
  <div class="wrap">
    <div class="content">
      ${final_text}
    </div>
  </div>
</div>