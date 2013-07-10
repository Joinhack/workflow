<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
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
<div id='container' >
</div>
</body>
</html>
<script>
var id = '${id}';
$(document).ready(function(){
	if(id) {
		simpleNodeInfo = function (node) {
			var root = $("<div />");
			var div = $("<div />");
			root.append(div);
			div.append($("<lable/>").text("节点名:"));
			div.append(node.text());
			div = $("<div />");
			root.append(div);
			div.append($("<lable/>").text("节点状态:"));
			div.append(node.status());
			return root;
		};
		$.loadData('workflowShowGet.wf',{'id':id},function(xml){
			simpleShowWorkflow(xml,simpleNodeInfo);
		});
	}
});
</script>
