
function copyToInput(ps,d,s) {
	for(var i = 0; i < ps.length; i++) {
		if(s[ps[i]])
			d.find("input[name='" + ps[i] + "']").val(s[ps[i]]());
	}
}

var objUp = function(props,o) {
	var index = 0;
	for(var i = 0; i < props.length; i++) {
		if(props[i] == o) {
			index = i;
			break;
		}
	}
	if(index == 0)
		return false;
	var temp = props[index];
	props[index] = props[index - 1];
	props[index - 1] = temp;
	return true;
};
var objDown = function(props,o) {
	var index = props.length - 1;
	for(var i = 0; i < props.length; i++) {
		if(props[i] == o) {
			index = i;
			break;
		}
	}
	if(index == props.length - 1)
		return false;
	var temp = props[index];
	props[index] = props[index + 1];
	props[index + 1] = temp;
	return true;
};

var addOrderButton = function(td,o,up,down){
	var span = $("<span />");
	span.attr('class','rbutton');
	td.append(span.append("∧"));
	
	span.click((function(o){
		return function(){
			if(up && typeof(up) == 'function') {
				up(o);
			}
		};
	})(o));
	
	span = $("<span />");
	span.attr('class','rbutton');
	td.append(span.append("∨"));
	
	span.click((function(o){
		return function(){
			if(down && typeof(down) == 'function') {
				down(o);
			}
		};
	})(o));
};

function procFuncPropRow(funcTypes,obj) {
	var tr = $("<tr/>");
	tr.data("save",true);
	o = obj.o;
	target = obj.target;
	
	if(o) {
		tr.data("save",false);
		tr.data('editData',o);
	}
	target.append(tr);
	var td = $("<td class='ui-widget ui-widget-content ccontent' nowrap/>");
	tr.append(td);
	var span = $("<span />").text("删");
	span.click((function(tr){
		return function(){
			tr.find("input[name='clzName']").autocomplete("destroy");
			tr.find("input[name='methodName']").autocomplete("destroy");
			ep = tr.data("editData");
			tr.remove();
			if(obj.removeFunc)
				obj.removeFunc(ep);
		};
	})(tr));
	span.appendTo(td);
	span.attr('class','rbutton');
	span = $("<span  />").text("存");
	span.attr('class','rbutton');
	if(o) {
		span.text('改');
	}
	span.appendTo(td);
	var clzNameTd = $("<td class='ui-widget ui-widget-content ccontent clzName'/>");
	tr.append(clzNameTd);
	var methodTd = $("<td class='ui-widget ui-widget-content ccontent methodName'/>");
	tr.append(methodTd);
	var typeTd = $("<td class='ui-widget ui-widget-content ccontent type'/>");
	tr.append(typeTd);
	var showRow = function(o) {
		clzNamespan = $('<span/>').append(o.clzName());
		clzNameTd.append(clzNamespan);
		clzNamespan.mouseover(function(){
			var that = this;
			if($(that).attr('title') == "") {
				$.ajax({'url':ctx + '/classInfoShow.wf',
					'data':{value:o.clzName()},
					type:'post',
					async: false,
					dataType: "json",
					'success':function(data){
						if(data.name) {
							$(that).attr('title',data.name + "\n" + data.usage);
						}
					}
				});
			}
		});
		methodNameSpan = $('<span/>').append(o.methodName());
		methodNameSpan.mouseover(function(){
			var that = this;
			if($(that).attr('title') == "") {
				$.ajax({'url':ctx + '/methodInfoShow.wf',
					'data':{'className':o.clzName(),'methodName':o.methodName()},
					type:'post',
					dataType: "json",
					async: false,
					'success':function(data){
						if(data.name) {
							$(that).attr('title',data.name + "\n" + data.usage);
						}
					}
				});
			}
		});
		methodTd.append(methodNameSpan);
		typeTd.append($('<span/>').append(o.type()).attr('title',o.type()));
	};
	var editRow = function(tr,o) {
		var clzNameTd = tr.find('td.clzName');
		var methodNameTd = tr.find('td.methodName');
		var typeTd = tr.find('td.type');
		var clzNameInput = $("<input type='text' style='width:310px' name='clzName' />"); 
		clzNameTd.append(clzNameInput);
		var methodNameInput = $("<input type='text' style='width:60px' name='methodName' />");
		methodNameTd.append(methodNameInput);
		var type = $("<select name='type' style='width:40px'/>");
		$(funcTypes).each(function(){
			type.append($("<option value='" + this + "'>" + this + "</option>"));
		});
		typeTd.append(type);
		methodNameInput.autocomplete({
			source:function(request, response) {
				$.ajax({'url':'methodAutoComplete.wf',
					'data':{value:request.term,className:clzNameInput.val()},
					type:'post',
					dataType: "json",
					'success':function(data){
						response($(data).map(function(){
							return {label:this.data + "<br/><span style='color:red;font-size:9px'>" + this.usage + "</span>",value:this.data};
						}));
					}
				});
			}
		});
		clzNameInput.autocomplete({
			source:function(request, response) {
				$.ajax({'url':'classAutoComplete.wf',
					'data':{value:request.term},
					type:'post',
					dataType: "json",
					'success':function(data){
						response($(data).map(function(){
							return {label:this.data + "<br/><span style='color:red;font-size:9px'>" + this.usage + "</span>",value:this.data};
						}));
					}
				});
			}
		});
		if(o) {
			tr.find("input[name='clzName']").val(o.clzName());
			tr.find("input[name='methodName']").val(o.methodName());
			tr.find("select[name='type'] option[value='" + o.type() + "']").
				attr('selected','true');
		}
	};
	if(o) {
		showRow(o);
	} else {
		editRow(tr);
	}
	
	var editAction = function(tr){
		o = tr.data("editData");
		var clzNameTd = tr.find('td.clzName');
		var methodNameTd = tr.find('td.methodName');
		var typeTd = tr.find('td.type');
		clzNameTd.children().remove();
		methodNameTd.children().remove();
		typeTd.children().remove();
		span.text('存');
		editRow(tr,o);
	};
	
	var saveAction = function(tr){
		var n = tr.find("input[name='clzName']").val();
		var v = tr.find("input[name='methodName']").val();
		var t = tr.find("select[name='type']").val();
		if(n == '' || /[ ]+/.test(n)) {
			$.showErr("类名为空或有非法字符");
			return false;
		}
		if(v == '' || /[ ]+/.test(v)) {
			$.showErr("方法名为空或有非法字符");
			return false;
		}
		tr.find("input[name='clzName']").autocomplete("destroy");
		tr.find("input[name='methodName']").autocomplete("destroy");
		var clzNameTd = tr.find('td.clzName');
		var valtd = tr.find('td.methodName');
		var typetd = tr.find('td.type');
		clzNameTd.children().remove();
		valtd.children().remove();
		typetd.children().remove();
		var o = tr.data("editData");
		if(o == null) {
			o = new FuncProp();
			if(obj.addFunc)
				obj.addFunc(o);
			addOrderButton(td,o,obj.funcUp,obj.funcDown);
			tr.render();
		}
		o.clzName(n);
		o.methodName(v);
		o.type(t);
		showRow(o);
		tr.data("editData",o);
		span.text('改');
		return true;
	};
	
	span.click((function(t){
		return function(){
			if(t.data("save")) {
				if(saveAction(t))
					t.data("save",false);
			} else {
				editAction(t);
				t.data("save",true);
			}
		};
	})(tr));
	
	
	if(tr.data("editData")) {
		addOrderButton(td,tr.data("editData"),obj.funcUp,obj.funcDown);
	}
	tr.render();
}

function procPropRow(that,o) {
	var tr = $("<tr/>");
	tr.data("save",true);
	if(o) {
		tr.data("save",false);
		tr.data('editData',o);
	}
	$('.propBody').append(tr);
	var td = $("<td class='ui-widget ui-widget-content ccontent' nowrap/>");
	tr.append(td);
	var span = $("<span />").text("删");
	span.click((function(tr){
		return function(){
			var dv = tr.find("input[name='propDisplayValue']");
			dv.trigger('unload',tr.find("input[name='propValue']"));
			dv.unbind();
			ep = tr.data("editData");
			tr.remove();
			that.removeProp(ep);
		};
	})(tr));
	span.appendTo(td);
	span.attr('class','rbutton');
	span = $("<span  />").text("存");
	if(o) {
		span.text('改');
	}
	span.appendTo(td);
	span.attr('class','rbutton');
	var nametd = $("<td class='ui-widget ui-widget-content ccontent name'/>");
	tr.append(nametd);
	var valtd = $("<td class='ui-widget ui-widget-content ccontent value'/>");
	tr.append(valtd);
	var typetd = $("<td class='ui-widget ui-widget-content ccontent type'/>");
	tr.append(typetd);
	
	var propUp = function(p) {
		objUp(that.getProps(), p);
		that.props2Html();
	};
	
	var propDown = function(p) {
		objDown(that.getProps(), p);
		that.props2Html();
	};
	
	var saveAction = function(tr){
		var n = tr.find("input[name='propName']").val();
		var displayValInput = tr.find("input[name='propDisplayValue']");
		var valueInput = tr.find("input[name='propValue']");
		var v = valueInput.val();
		var dv = displayValInput.val();
		var t = tr.find("select[name='propType']").val();
		var checkVal = function(n,v,dv,input) {
			var propType = null;
			for(var i = 0; i < that.propTypes.length; i++) {
				if(that.propTypes[i].value == t) {
					if(that.propTypes[i].check)
						return that.propTypes[i].check(n,v,dv,
								input);
				}
			}
			return false;
		};
		if(!checkVal(n,v,dv,tr.find("input[name='propDisplayValue']")))
			return false;
		var nametd = tr.find('td.name');
		var valtd = tr.find('td.value');
		var typetd = tr.find('td.type');
		nametd.children().remove();
		valtd.children().remove();
		typetd.children().remove();
		displayValInput.trigger('unload',valueInput);
		displayValInput.unbind();
		var o = tr.data("editData");
		if(o == null) {
			o = new Property();
			that.addProp(o);
			addOrderButton(td,o,propUp,propDown);
			tr.render();
		}
		o.name(n);
		o.value(v);
		o.displayVal(dv);
		o.type(t);
		showRow(o);
		tr.data("editData",o);
		span.text('改');
		return true;
	};
	var showRow = function(o) {
		nametd.append($('<span/>').append(o.name()).attr('title',o.name()));
		typetd.append($('<span/>').append(o.type()).attr('title',o.type()));
		valtd.append($('<span/>').append(o.displayVal()).attr('title',o.displayVal()));
	};
	
	var bindEvents = function(varNameInput,displayValInput,valueInput,val) {
		displayValInput.trigger('unload',valueInput);
		displayValInput.unbind();
		if(val == null && that.propTypes.length > 1) {
			index = that.propTypes[0];
			if(this.varName) {
				$(varNameInput).val(index.varName);
			}
			bindEvent(displayValInput,index.events,valueInput);
		}
		$(that.propTypes).each(function(){
			if(val == this.value) {
				if(this.varName) {
					$(varNameInput).val(this.varName);
				}
				bindEvent(displayValInput,this.events,valueInput);
			}
		});
	};
	
	var editRow = function(tr,o) {
		var nametd = tr.find('td.name');
		var valtd = tr.find('td.value');
		var typetd = tr.find('td.type');
		var varNameInput = $("<input type='text' style='width:120px' name='propName' />");
		nametd.append(varNameInput);
		var displayInput = $("<input type='text' style='width:120px' name='propDisplayValue' />");
		valtd.append(displayInput);
		var valueInput = $("<input type='text' style='width:120px' name='propValue' />");
		valtd.append(valueInput);
		valueInput.hide();
		var type = $("<select name='propType'/>");
		$(that.propTypes).each(function(){
			type.append($("<option value='" + this.value + "'>" + this.name + "</option>"));
		});
		type.change(function(){
			var val = $(this).val();
			bindEvents(varNameInput,displayInput,valueInput,val);
			valueInput.val('');
			displayInput.val('');
			displayInput.trigger('load',valueInput);
		});
		typetd.append(type);
		bindEvents(varNameInput,displayInput,valueInput);
		if(o) {
			tr.find("input[name='propName']").val(o.name());
			tr.find("input[name='propDisplayValue']").val(o.displayVal());
			tr.find("input[name='propValue']").val(o.value());
			tr.find("select[name='propType'] option[value='" + o.type() + "']").
				attr('selected','true');
			bindEvents(varNameInput,displayInput,valueInput,o.type());
		}
		displayInput.trigger('load',valueInput);
	};
	if(o)
		showRow(o);
	else
		editRow(tr);
	var editAction = function(tr){
		o = tr.data("editData");
		var nametd = tr.find('td.name');
		var valtd = tr.find('td.value');
		var typetd = tr.find('td.type');
		nametd.children().remove();
		valtd.children().remove();
		typetd.children().remove();
		span.text('存');
		editRow(tr,o);
	};
	span.click((function(t){
			return function(){
				if(t.data("save")) {
					if(saveAction(t))
						t.data("save",false);
				} else {
					editAction(t);
					t.data("save",true);
				}
			};
	})(tr));
	
	if(tr.data("editData")) {
		addOrderButton(td,tr.data("editData"),propUp,propDown);
	}
	tr.render();
}

function copyToNode(ps,d,s) {
	for(var i = 0; i < ps.length; i++) {
		if(d[ps[i]]) {
			v = s.find("input[name='" + ps[i] + "']");
			d[ps[i]](v.val());
		}
	}
}

function EditNodeDlg() {
	this.editNode = null;
	this.items = ['text','description','id',
	              'top','left','width','height'];
};

var propTypes = [];

var registerPropType = function(o) {
	propTypes.push(o);
};

function registerRegPropType(o) {
	o.events = {
		"change":function(e) {
			if(e.data) 
				e.data.val($(this).val());
		}
	};
	o.check = function(n,v,dv,input) {
		if(n == '' || !/^[a-zA-Z]+$/.test(n)) {
			$.showErr("无效属性名，属性名只能是字符串");
			return false;
		}
		if(v == '') {
			$.showErr("属性值不能为空");
			return false;
		}
		if(o.reg.test(v)) {
			return true;
		} else {
			$.showErr(o.msg);
			input.select();
			return false;
		}
	};
	registerPropType(o);
}

registerRegPropType({name:'字符串',value:'chars',reg:/.*/});

registerRegPropType({
	name:'数字',
	value:'digits',
	msg: '请输入数字',
	reg:/^[0-9]+(.[0-9]{1,3})?$/});

function registerDatePropType() {
	o = {
		name:'时间日期',
		value:'datetime',
		events : {
			"blur":function(e) {
				if(e.data) 
					e.data.val($(this).val());
			},
			'load': function() {
				$(this).attr("readonly","readonly");
				$(this).datetimepicker({'dateFormat':'yy-mm-dd','timeFormat': 'hh:mm:ss'});
			},
			'unload': function() {
				$(this).removeAttr("readonly");
				$(this).datepicker("destroy");
			}
		},
		check: function(n,v,dv,input) {
			if(n == '' || !/^[a-zA-Z]+$/.test(n)) {
				$.showErr("无效属性名，属性名只能是字符串");
				return false;
			}
			if(v == '') {
				$.showErr("属性值不能为空");
				return false;
			}
			return true;
		}
	};
	registerPropType(o);
}
registerDatePropType();

var editNodePlugin = null;

var setEditNodePlugin = function(c) {
	editNodePlugin = c;
};

EditNodeDlg.prototype = {
	setEditNode: function(node) {
		this.editNode = node;
	},
	propTypes: propTypes,
	funcTypes: ['class'],
	propsEditReload: function() {
		this.props2Html();
		this.funcProps2Html();
	},
	props2Html: function() {
		$('.propBody').children().remove();
		if(this.editNode && this.editNode.props()) {
			var that = this;
			$(this.editNode.props()).each(function(){
				that.propRowProc(this);
			});
		}
	},
	funcProps2Html: function(){
		$("#PreFuncProp .funcPropsBody").children().remove();
		$("#ConditionFuncProp .funcPropsBody").children().remove();
		if(this.editNode) {
			var that = this;
			$(this.editNode.preFuncs()).each(function(){
				var obj = this;
				that.funcPropRowProc({
					target: $('#PreFuncProp .funcPropsBody'),
					o:obj,
					addFunc:function(o) {
						that.editNode.addPreFunc(o);
					},
					removeFunc:function(o) {
						that.editNode.removePreFunc(o);
					},
					funcDown: function(o) {
						if(objDown(that.editNode.preFuncs(), o))
							that.funcProps2Html();
					},
					funcUp: function(o) {
						if(objUp(that.editNode.preFuncs(), o))
							that.funcProps2Html();
					}
				});
			});
			$(this.editNode.conditionFuncs()).each(function(){
				var obj = this;
				that.funcPropRowProc({
					target:$("#ConditionFuncProp .funcPropsBody"),
					o:obj,
					addFunc:function(o) {
						sthat.editNode.addConditionFunc(o);
					},
					removeFunc:function(o) {
						that.editNode.removeConditionFunc(o);
					},
					funcDown: function(o) {
						if(objDown(that.editNode.conditionFuncs(), o))
							that.funcProps2Html();
					},
					funcUp: function(o) {
						if(objUp(that.editNode.conditionFuncs(), o))
							that.funcProps2Html();
					}
				});
			});
		}
	},
	propRowProc: function(o){
		procPropRow(this,o);
	},
	funcPropRowProc: function(o){
		procFuncPropRow(this.funcTypes,o);
	},
	getProps: function() {
		return this.editNode.props();
	},
	removeProp: function(p) {
		this.editNode.removeProp(p);
	},
	addProp: function(p) {
		return this.editNode.addProp(p);
	},
	bindDlgEvent: function() {
		var that = this;
		$('.addProp').click(function(){
			that.propRowProc();
		});
		
		var plugin = editNodePlugin;
		if(plugin != null) {
			if(plugin.bindDlgEvent != null && typeof(plugin.bindDlgEvent) == 'function' ) {
				plugin.bindDlgEvent(this);
			}
		}
		
		$('#PreFuncProp .addFuncProp').click(function(){
			that.funcPropRowProc({
				target: $('#PreFuncProp .funcPropsBody'),
				o:null,
				addFunc:function(o) {
					that.editNode.addPreFunc(o);
				},
				removeFunc:function(o) {
					that.editNode.removePreFunc(o);
				},
				funcDown: function(o) {
					if(objDown(that.editNode.preFuncs(), o))
						that.funcProps2Html();
				},
				funcUp: function(o) {
					if(objUp(that.editNode.preFuncs(), o))
						that.funcProps2Html();
				}
			});
		});
		$('#ConditionFuncProp .addFuncProp').click(function(){
			that.funcPropRowProc({
				target:$("#ConditionFuncProp .funcPropsBody"),
				addFunc:function(o) {
					that.editNode.addConditionFunc(o);
				},
				removeFunc:function(o) {
					that.editNode.removeConditionFunc(o);
				},
				funcDown: function(o) {
					if(objDown(that.editNode.conditionFuncs(), o))
						that.funcProps2Html();
				},
				funcUp: function(o) {
					if(objUp(that.editNode.conditionFuncs(), o))
						that.funcProps2Html();
				}
			});
		});
	},
	create: function() {
		$.loadHTML(editNodePage,{},(function(that){
			return function(html){
				that.protoObj = $(html);
				that.protoObj.hide();
				$("body").append(that.protoObj);
				that.bindDlgEvent();
				that.protoObj.render();
				that.protoObj.dialog({
					'modal':true,
					'resizable':false,
					'width': '600px',
					'title': '节点编辑',
					'autoOpen': false,
					'buttons': {
						'取消':function(){
							that.show(false);
						},
						'确定':function(){
							if(!that.editOk()) 
								return;
							that.show(false);
						}
					}
				});
				that.protoObj.bind( "dialogclose", function() {
					that.destroyUI();
				});
			};
		})(this),{async: false});
	},
	editOk: function() {
		//this is used for check node callback.
		var plugin = editNodePlugin;
		if(plugin != null && plugin.checkNode != null)
			if(!plugin.checkNode(this.editNode))
				return false;
		
		copyToNode(this.items,this.editNode,this.protoObj);
		this.editNode.type($('select[name="nodeType"]',this.protoObj).val());
		return true;
	},
	destroyUI: function() {
		if(this.protoObj != null) {
			this.protoObj.dialog("destroy");
			this.protoObj.remove();
		}
	},
	show: function(b) {
		if(b) {
			this.destroyUI();
			this.create();
			copyToInput(this.items,this.protoObj,this.editNode);
			$('select[name="nodeType"] option[value="' + this.editNode.type() + '"]',this.protoObj).attr('selected','true');
			this.protoObj.dialog("open");
			this.propsEditReload();
		} else {
			this.protoObj.dialog("close");
			this.destroyUI();
		}
	}
};

var editNodeEvent = {
	"dblclick": function(node,e){
		dlg = $(document).data("editNodeDlg");
		if(dlg == null) {
			dlg = new EditNodeDlg();
		}
		dlg.setEditNode(node);
		dlg.show(true);
		$(document).data("editNodeDlg",dlg);
	}
};

function EditConnectDlg() {
	this.editConnect = null;
};

EditConnectDlg.prototype = {
	setEditConnect: function(conn) {
		this.editConnect = conn;
	},
	propTypes: propTypes,
	funcTypes: ['class'],
	propsEditReload: function() {
		this.props2Html();
		this.funcProps2Html();
	},
	props2Html: function() {
		$('.propBody').children().remove();
		if(this.editConnect && this.editConnect.props()) {
			var that = this;
			$(this.editConnect.props()).each(function(){
				that.propRowProc(this);
			});
		}
	},
	funcProps2Html: function(){
		$('.funcPropsBody').children().remove();
		if(this.editConnect && this.editConnect.funcProps()) {
			var that = this;
			$(this.editConnect.funcProps()).each(function(){
				obj = this;
				that.funcPropRowProc({
					target:$("#ConnFuncProp .funcPropsBody"),
					o:obj,
					addFunc:function(o) {
						that.editConnect.addFunc(o);
					},
					removeFunc:function(o) {
						that.editConnect.removeFunc(o);
					},
					funcDown: function(o) {
						if(objDown(that.editConnect.funcProps(), o))
							that.funcProps2Html();
					},
					funcUp: function(o) {
						if(objUp(that.editConnect.funcProps(), o))
							that.funcProps2Html();
					}
				});
			});
		}
	},
	propRowProc: function(o){
		procPropRow(this,o);
	},
	funcPropRowProc: function(o){
		procFuncPropRow(this.funcTypes,o);
	},
	getProps: function() {
		return this.editConnect.props();
	},
	removeProp: function(p) {
		this.editConnect.removeProp(p);
	},
	addProp: function(p) {
		return this.editConnect.addProp(p);
	},
	bindDlgEvent: function() {
		that = this;
		$('.addProp').click(function(){
			that.propRowProc();
		});
		$('.addFuncProp').click(function(){
			that.funcPropRowProc({
				target:$("#ConnFuncProp .funcPropsBody"),
				addFunc:function(o) {
					that.editConnect.addFunc(o);
				},
				removeFunc:function(o) {
					that.editConnect.removeFunc(o);
				},
				funcDown: function(o) {
					if(objDown(that.editConnect.funcProps(), o))
						that.funcProps2Html();
				},
				funcUp: function(o) {
					if(objUp(that.editConnect.funcProps(), o))
						that.funcProps2Html();
				}
			});
		});
	},
	create: function() {
		$.loadHTML(editConnPage,{},(function(that){
			return function(html){
				that.protoObj = $(html);
				that.protoObj.hide();
				$("body").append(that.protoObj);
				that.bindDlgEvent();
				that.protoObj.render();
				that.protoObj.dialog({
					'modal':true,
					'resizable':false,
					'width': '600px',
					'title': '连接编辑',
					'autoOpen': false,
					'buttons': {
						'取消':function(){
							that.show(false);
						},
						'确定':function(){
							that.editOk();
							that.show(false);
						}
					}
				});
				that.protoObj.bind( "dialogclose", function() {
					that.destroyUI();
				});
			};
		})(this),{async: false});
	},
	editOk: function() {
		copyToNode(['condition'],this.editConnect,this.protoObj);
	},
	destroyUI: function() {
		if(this.protoObj != null) {
			this.protoObj.dialog("destroy");
			this.protoObj.remove();
		}
	},
	show: function(b) {
		if(b) {
			this.destroyUI();
			this.create();
			copyToInput(['condition'],this.protoObj,this.editConnect);
			this.protoObj.dialog("open");
			this.propsEditReload();
		} else {
			this.protoObj.dialog("close");
			this.destroyUI();
		}
	}
};

var editConnEvent = {
	"dblclick": function(conn,e){
		var dlg = $(document).data("editConnDlg");
		if(dlg == null) {
			dlg = new EditConnectDlg();
		}
		dlg.setEditConnect(conn);
		dlg.show(true);
		$(document).data("editConnDlg",dlg);
	}
};


function EditWorkflowDlg() {
	this.workflow = null;
};

EditWorkflowDlg.prototype = {
	setWorkflow: function(wf) {
		this.workflow = wf;
	},
	propTypes: propTypes,
	propsEditReload: function() {
		$('.propBody').children().remove();
		if(this.workflow && this.workflow.props()) {
			var that = this;
			$(this.workflow.props()).each(function(){
				that.propRowProc(this);
			});
		}
	},
	propRowProc: function(o){
		procPropRow(this,o);
	},
	removeProp: function(p) {
		this.workflow.removeProp(p);
	},
	addProp: function(p) {
		return this.workflow.addProp(p);
	},
	bindDlgEvent: function() {
		that = this;
		$('.addProp').click(function(){
			that.propRowProc();
		});
		$('.addMethod').click(function(){
			var methodType = $('.methodType').val();
			var funcs = null;
			var clzName = $('.clzName').val();
			var methodName = $('.methodName').val();
			var type = $('select[name="type"]').val();
			if(clzName == '' || /[ ]+/.test(clzName)) {
				$.showErr("类名为空或有非法字符");
				return false;
			}
			if(methodName == '' || /[ ]+/.test(methodName)) {
				$.showErr("方法名为空或有非法字符");
				return false;
			}
			
			$(that.workflow.children()).each(function(){
				if(methodType == 1) {
					funcs = this.preFuncs();
				} else {
					funcs = this.conditionFuncs();
				}
				var func = new FuncProp();
				func.clzName(clzName);
				func.methodName(methodName);
				func.type(type);
				funcs.push(func);
			});
			$('.clzName').val('');
			$('.methodName').val('');
			$.showMsg("为所有节点添加方法成功");
		});
		$('.methodBody .clzName').autocomplete({
				source:function(request, response) {
				$.ajax({'url':'classAutoComplete.wf',
					'data':{value:request.term},
					type:'post',
					dataType: "json",
					'success':function(data){
						response($(data).map(function(){
							return {label:this.data + "<br/><span style='color:red;font-size:9px'>" + this.usage + "</span>",value:this.data};
						}));
					}
				});
			}
		});
		$('.methodBody .methodName').autocomplete({
			source:function(request, response) {
				$.ajax({'url':'methodAutoComplete.wf',
					'data':{value:request.term,className:$('.methodBody .clzName').val()},
					type:'post',
					dataType: "json",
					'success':function(data){
						response($(data).map(function(){
							return {label:this.data + "<br/><span style='color:red;font-size:9px'>" + this.usage + "</span>",value:this.data};
						}));
					}
				});
			}
		});
	},
	create: function() {
		$.loadHTML(editWorkflowPage,{},(function(that){
			return function(html){
				that.protoObj = $(html);
				that.protoObj.hide();
				$("body").append(that.protoObj);
				that.bindDlgEvent();
				that.protoObj.render();
				that.protoObj.dialog({
					'modal':true,
					'resizable':false,
					'width': '600px',
					'title': '工流程编辑',
					'autoOpen': false,
					'buttons': {
						'取消':function(){
							that.show(false);
						},
						'确定':function(){
							that.editOk();
							that.show(false);
						}
					}
				});
				that.protoObj.bind( "dialogclose", function() {
					that.destroyUI();
				});
			};
		})(this),{async: false});
	},
	editOk: function() {
		copyToNode(['name','width','height','description'],this.workflow,this.protoObj);
	},
	destroyUI: function() {
		if(this.protoObj != null) {
			this.protoObj.dialog("destroy");
			this.protoObj.remove();
		}
	},
	show: function(b) {
		if(b) {
			this.destroyUI();
			this.create();
			copyToInput(['name','width','height','description'],this.protoObj,this.workflow);
			this.protoObj.dialog("open");
			this.propsEditReload();
		} else {
			this.protoObj.dialog("close");
			this.destroyUI();
		}
	}
};
