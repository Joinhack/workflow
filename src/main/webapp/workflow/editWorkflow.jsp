<%@ page language="java" contentType="text/javascript; charset=GBK" pageEncoding="GBK"%>
<div style='text-aligin:center'>

<div class='tabs'>
	<ul>
		<li><a href="#baseProp">��������</a></li>
		<li><a href="#ExtProp">��չ����</a></li>
		<li><a href="#MethodProp">������ӷ���</a></li>
	</ul>
	<div id="baseProp">
	<table cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td class='ui-widget ui-state-default lheader'>��������</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='name' /></td>
		<td class='ui-widget ui-state-default lheader'>��������</td>
		<td class="ui-widget ui-widget-content lcontent"><input type='text' name='description' /></td>
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
			<td class='ui-widget ui-state-default cheader' width='45px'>����</td>
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
	
	<div id='MethodProp' style='VERTICAL-ALIGN:top'>
		<div>
		<span class='rbutton addMethod'>���</span>
		</div>
		<div class="methodDiv">
		<table cellpadding="0" cellspacing="0"  width="100%">
		<thead>
		<tr valign=top>
			<td class='ui-widget ui-state-default cheader' width='65px'>��������</td>
			<td class='ui-widget ui-state-default cheader'>����</td>
			<td class='ui-widget ui-state-default cheader' width='80px'>������</td>
			<td class='ui-widget ui-state-default cheader' width='45px'>����</td>
		</tr>
		</thead>
		<tbody class='methodBody'>
		<tr valign=top>
			<td class='ui-widget ui-widget-content ccontent'>
			<select name='methodType' class='methodType'>
			<option value="1">��ʼ����</option>
			<option value="2">��������</option>
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

