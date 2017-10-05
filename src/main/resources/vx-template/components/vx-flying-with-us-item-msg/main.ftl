<img id="img"  alt="${cmsfn.contentById( content.image?replace("jcr:", "") ,'dam').caption!}" src="${cmsfn.link("dam", content.image?replace("jcr:", "")! )}" 
onmouseover="document.getElementById('img').src = '${cmsfn.link("dam", content.imageRollover?replace("jcr:", "")!  )}'"
onmouseout="document.getElementById('img').src = '${cmsfn.link("dam", content.image?replace("jcr:", "")! )}'"
/>
${cmsfn.decode(content).text}
<a href="${content.link}" target="_blank">${content.linkText!}</a>
