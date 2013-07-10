<%@ page language="java" contentType="text/javascript; charset=UTF-8" pageEncoding="UTF-8"%>
<div style='text-aligin:center'>

<div class='tabs'>
	<ul>
		<li><a href="#baseProp">基本属性</a></li>
		<li><a href="#ExtProp">扩展属性</a></li>
		<li><a href="#MethodProp">整体添加方法</a></li>
	</ul>
	<div id="baseProp">
	<table cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td class='ui-widget ui-state-default lheader'>流程名字</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='name' /></td>
		<td class='ui-widget ui-state-default lheader'>流程描述</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='description' /></td>
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
			<td class='ui-widget ui-state-default cheader' width='45px'>操作</td>
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
	
	<div id='MethodProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addMethod'>添加</span>
		</div>
		<div class="methodDiv">
		<table cellpadding="0" cellspacing="0"  width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>函数类型</td>
			<td class='ui-widget ui-state-default cheader'>类名</td>
			<td class='ui-widget ui-state-default cheader' width='80px'>方法名</td>
			<td class='ui-widget ui-state-default cheader' width='45px'>类型</td>
		</tr>
		</thead>
		<tbody class='methodBody'>
		<tr valign=top>
			<td class='ui-widget ui-widget-content ccontent'>
			<select name='methodType' class='methodType'>
			<option value="1">初始函数</option>
			<option value="2">条件函数</option>
			</select>
			</td>
			<td class='ui-widget ui-widget-content ccontent'>
			<input class='clzName' />
			</td>
			<td class='ui-widget ui-widget-content ccontent'>
			<input class='methodName' />
			</td>
			<td class='ui-widget ui-widget-content ccontent'>
			<select name='type'>
			<option value="class">class</option>
			</select>
			</td>
		</tr>
		</tbody>
		</table>
		</div>
	</div>
</div>
</div>

