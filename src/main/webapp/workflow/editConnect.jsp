<%@ page language="java" contentType="text/javascript; charset=UTF-8" pageEncoding="UTF-8"%>
<div style='text-aligin:center'>

<div class='tabs'>
	<ul>
		<li><a href="#condition">条        件</a></li>
		<li><a href="#ExtProp">扩展属性</a></li>
		<li><a href="#ConnFuncProp">函数属性</a></li>
	</ul>
	<div id="condition">
	<labe class="ui-widget ui-state-default cheader">转向条件</label>
	<input type='text' name='condition' />
	</div>
	
	<div id='ExtProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addProp'>添加</span>
		</div>
		<div class="propDiv">
		<table cellpadding="0" cellspacing="0"  width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader'  width='65px'>操作</td>
			<td class='ui-widget ui-state-default cheader'>属性名</td>
			<td class='ui-widget ui-state-default cheader'>属性值</td>
			<td class='ui-widget ui-state-default cheader' width='80px'>类型</td>
		</tr>
		</thead>
		<tbody class='propBody'>
		</tbody>
		</table>
		</div>
	</div>
	<div id='ConnFuncProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addFuncProp'>添加</span>
		</div>
		<div class="propDiv">
		<table cellpadding="0" cellspacing="0" width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>操作</td>
			<td class='ui-widget ui-state-default cheader'>类名</td>
			<td class='ui-widget ui-state-default cheader'  width='80px'>方法名</td>
			<td class='ui-widget ui-state-default cheader'  width='45px'>类型</td>
		</tr>
		</thead>
		<tbody class='funcPropsBody'>
		</tbody>
		</table>
		</div>
	</div>
</div>
</div>

