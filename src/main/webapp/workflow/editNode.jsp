<%@ page language="java" contentType="text/javascript; charset=GBK" pageEncoding="GBK"%>
<div style='text-aligin:center'>

<div class='tabs'>
	<ul>
		<li><a href="#baseProp">��������</a></li>
		<li><a href="#ExtProp">��չ����</a></li>
		<li><a href="#PreFuncProp">��ʼ����</a></li>
		<li><a href="#ConditionFuncProp">��������</a></li>
	</ul>
	<div id="baseProp">
	<table cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td class='ui-widget ui-state-default lheader'>�ڵ�����</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='text' /></td>
		<td class='ui-widget ui-state-default lheader'>�ڵ�����</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='description' /></td>
	</tr>
	<tr>
		<td class='ui-widget ui-state-default lheader'>����</td>
		<td class="ui-widget ui-widget-content lcontent">
			<select name='nodeType'>
				<option value='start'>��ʼ</option>
				<option value='node' SELECTED="SELECTED">�ڵ�</option>
				<option value='end'>����</option>
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
		<td class='ui-widget ui-state-default lheader'>��</td>
		<td class="ui-widget ui-widget-content lcontent">
		<input class='digits' type='text' name='width' />
		</td>
		<td class='ui-widget ui-state-default lheader'>��</td>
		<td class="ui-widget ui-widget-content lcontent">
		<input class='digits' type='text' name='height' />
		</td>
	</tr>
	</table>
	</div>
	
	<div id='ExtProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addProp'>���</span>
		</div>
		<div class="propDiv">
		<table cellpadding="0" cellspacing="0"  width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>����</td>
			<td class='ui-widget ui-state-default cheader'>������</td>
			<td class='ui-widget ui-state-default cheader'>����ֵ</td>
			<td class='ui-widget ui-state-default cheader' width='80px'>����</td>
		</tr>
		</thead>
		<tbody class='propBody'>
		</tbody>
		</table>
		</div>
	</div>
	<div id='PreFuncProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addFuncProp'>���</span>
		</div>
		<div class="propDiv">
		<table cellpadding="0" cellspacing="0" width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>����</td>
			<td class='ui-widget ui-state-default cheader'>����</td>
			<td class='ui-widget ui-state-default cheader' width='80px'>������</td>
			<td class='ui-widget ui-state-default cheader'  width='45px'>����</td>
		</tr>
		</thead>
		<tbody class='funcPropsBody'>
		</tbody>
		</table>
		</div>
	</div>
	<div id='ConditionFuncProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addFuncProp'>���</span>
		</div>
		<div class="propDiv">
		<table cellpadding="0" cellspacing="0" width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>����</td>
			<td class='ui-widget ui-state-default cheader'>����</td>
			<td class='ui-widget ui-state-default cheader' width='80px'>������</td>
			<td class='ui-widget ui-state-default cheader' width='45px'>����</td>
		</tr>
		</thead>
		<tbody class='funcPropsBody'>
		</tbody>
		</table>
		</div>
	</div>
</div>
</div>

