<%@ page language="java" contentType="text/javascript; charset=UTF-8" pageEncoding="UTF-8"%>
function $importJs(url) {
	document.write("<" + "script src=\"" + url + "\"></" + "script>");
}
function $importCss(url) {
	document.write('<link href="' + url + '" rel="stylesheet" type="text/css" /> ');
}
$importJs("${ctx}/media/script/jquery.js");
$importJs("${ctx}/media/script/jquery.uuid.js");
$importJs("${ctx}/media/script/jquery-ui-1.8.2.custom.min.js");
$importJs("${ctx}/media/script/jquery.ui.datepicker-zh-CN.js");
$importJs("${ctx}/media/script/jquery-ui-timepicker-addon-0.5.js");
$importJs("${ctx}/media/script/jqueryext.js");
$importJs("${ctx}/media/script/box.js");
var isIE = (/msie/i.test(navigator.userAgent));
if(isIE) {
	$importJs("${ctx}/media/script/workflow.vml.js");
} else {
	$importJs("${ctx}/media/script/workflow.svg.js");
}
$importJs("${ctx}/media/script/workflow.js");
$importJs("${ctx}/media/script/serialize.js");
$importJs("${ctx}/media/script/workflowEdit.js");
$importCss("${ctx}/media/style/start/jquery-ui-1.8.2.custom.css");
$importCss("${ctx}/media/style/box/box.css");
var ctx = '${ctx}';
var editNodePage = ctx + "${jspPath}editNode.jsp";
var editConnPage = ctx + "${jspPath}editConnect.jsp";
var editWorkflowPage = ctx + "${jspPath}editWorkflow.jsp";