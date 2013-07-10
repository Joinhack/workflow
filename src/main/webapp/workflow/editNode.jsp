<%@ page language="java" contentType="text/javascript; charset=UTF-8" pageEncoding="UTF-8"%>
<div style='text-aligin:center'>

<div class='tabs'>
	<ul>
		<li><a href="#baseProp">基本属性</a></li>
		<li><a href="#ExtProp">扩展属性</a></li>
		<li><a href="#PreFuncProp">初始函数</a></li>
		<li><a href="#ConditionFuncProp">条件函数</a></li>
	</ul>
	<div id="baseProp">
	<table cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td class='ui-widget ui-state-default lheader'>节点名字</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='text' /></td>
		<td class='ui-widget ui-state-default lheader'>节点描述</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='description' /></td>
	</tr>
	<tr>
		<td class='ui-widget ui-state-default lheader'>类型</td>
		<td class="ui-widget ui-widget-content lcontent">
			<select name='nodeType'>
				<option value='start'>开始</option>
				<option value='node' SELECTED="SELECTED">节点</option>
				<option value='end'>结束</option>
			</select>
		</td>
		<td class='ui-widget ui-state-default lheader'>id</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='id' /></td>
	</tr>
	<tr>
		<td class='ui-widget ui-state-default lheader'>TOP</td>
		<td class="ui-widget ui-widget-content lcontent">
		<input class='digits' type='text' name='top' />
		</td>
		<td class='ui-widget ui-state-default lheader'>LEFT</td>
		<td class="ui-widget ui-widget-content lcontent">
		<input class='digits' type='text' name='left' />
		</td>
	</tr>
	<tr>
		<td class='ui-widget ui-state-default lheader'>宽</td>
		<td class="ui-widget ui-widget-content lcontent">
		<input class='digits' type='text' name='width' />
		</td>
		<td class='ui-widget ui-state-default lheader'>高</td>
		<td class="ui-widget ui-widget-content lcontent">
		<input class='digits' type='text' name='height' />
		</td>
	</tr>
	</table>
	</div>
	
	<div id='ExtProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addProp'>添加</span>
		</div>
		<div class="propDiv">
		<table cellpadding="0" cellspacing="0"  width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>操作</td>
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
	<div id='PreFuncProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addFuncProp'>添加</span>
		</div>
		<div class="propDiv">
		<table cellpadding="0" cellspacing="0" width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>操作</td>
			<td class='ui-widget ui-state-default cheader'>类名</td>
			<td class='ui-widget ui-state-default cheader' width='80px'>方法名</td>
			<td class='ui-widget ui-state-default cheader'  width='45px'>类型</td>
		</tr>
		</thead>
		<tbody class='funcPropsBody'>
		</tbody>
		</table>
		</div>
	</div>
	<div id='ConditionFuncProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addFuncProp'>添加</span>
		</div>
		<div class="propDiv">
		<table cellpadding="0" cellspacing="0" width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>操作</td>
			<td class='ui-widget ui-state-default cheader'>类名</td>
			<td class='ui-widget ui-state-default cheader' width='80px'>方法名</td>
			<td class='ui-widget ui-state-default cheader' width='45px'>类型</td>
		</tr>
		</thead>
		<tbody class='funcPropsBody'>
		</tbody>
		</table>
		</div>
	</div>
</div>
</div>

