<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if IE]><!-->
 <STYLE>v\:*{behavior:url(#default#VML);}</STYLE>
<!--<![endif]-->
<script type="text/javascript" src="workflow.js"></script>
<link href="media/style/workflow.css" type="text/css" rel="stylesheet" />
<style type="text/css">

.ui-button-text-only .ui-button-text {
	padding: 0px;
}
.ui-tabs-nav  {
	padding: 0px;
	margin: 0px;
}

ui-tabs-nav li {
	padding: 0px;
	margin: 0px;
}
</style>
</head>
<body>
<table width="100%" height="100%" cellpadding="0" cellspacing="0" class='unselect' >	
	<tr valign="top">
		<td width="1" nowrap="nowrap">
		<div id='container' >
		</div>
		</td>
		<td>
		<div id='panel' style="width:160px"  >
		</div>
		</td>
	</tr>
</table>
</body>
</html>
<script>
var fileName = '${fileName}';
$(document).ready(function(){
	if(fileName) {
		$.loadData('workflowGet.wf',{'fileName':fileName},function(xml){
			reloadWorkflow(xml);
		});
	}
});
</script>
