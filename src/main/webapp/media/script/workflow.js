
Component = function() {
};

function bindEvent(o,e,data){
	for(s in e) {
		if(data == null)
			$(o).bind(s,e[s]);
		else
			$(o).bind(s,data,e[s]);
	}
}

function fixPos(s,e) {
	var offset = $(s).offset();
	var sl = $(document).scrollLeft();
	var st = $(document).scrollTop();
	return new point(e.clientX + sl - offset.left,e.clientY + st - offset.top);
}

var _Prop = {
	_access: function(n,v) {
		var prefix = this.PropPrefix;
		if(v != null) {
			this[prefix + n] = v;
			if(this.fireProperty != null)
				this.fireProperty(n,  this[prefix + n], v);
		} else {
			return this[prefix + n];
		}
	}
};

function Property()
{
}

Property.prototype = $.extend({
	PropPrefix: "_P_",
	name: function(n) {
		return this._access("name",n);
	},
	value: function(v) {
		return this._access("value",v);
	},
	displayVal: function(v) {
		return this._access("displayVal",v);
	},
	type: function(t) {
		return this._access("type",t);
	}	
},_Prop);

function FuncProp()
{
}

FuncProp.prototype = $.extend({
	PropPrefix: "_P_",
	clzName: function(n) {
		return this._access("clzName",n);
	},
	methodName: function(m) {
		return this._access("methodName",m);
	},
	type: function(t) {
		return this._access("type",t);
	}	
},_Prop);

function Color(r,g,b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

Color.prototype = {
	hex: function() {
		return this.r.toString(16) + 
			this.g.toString(16) +
			this.b.toString(16);
	},
	hashCode: function() {
		return (this.r<<16)+(this.g<<8)+(this.b);
	},
	toString: function() {
		return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	}
};

Component.prototype = $.extend({
	PropPrefix: "_attr_",
	fireProperty: function(n,o,v) {
		$(this["_propertyView"]).each(function(){
			if(typeof(this) == 'function')
				this(n,o,v);
		});
	},
	isOver: function(p) {
		w = this.width();
		t = this.top();
		l = this.left();
		h = this.height();
		if(p.y >= t && p.y <= (t + h) && p.x >= l && p.x <= (l + w))
			return true;
		return false;
	},
	props: function(p) {
		return this._access('props',p);
	},
	addProp: function(p) {
		return this.props().push(p);
	},
	removeProp: function(p) {
		this.props($.grep(this.props(),function(n,i){
			return n != p;
		}));
	},
	top: function(t){
		if(t != null) {
			t = parseInt(t);
			if(isNaN(t))
				return;
		}
		return this._access('top',t);
	},
	left: function(l){
		if(l != null) {
			l = parseInt(l);
			if(isNaN(l))
				return;
		}
		return this._access('left',l);
	},
	width: function(w) {
		if(w != null) {
			w = parseInt(w);
			if(isNaN(w))
				return;
		}
		return this._access('width',w);
	},
	height: function(h){
		if(h != null) {
			h = parseInt(h);
			if(isNaN(h))
				return;
		}
		return this._access('height',h);
	},
	parent: function(p) {
		return this._access('parent',p);
	},
	description: function(d) {
		return this._access('description',d);
	},
	addPropertyView: function(v) {
		this._propertyView = this._propertyView||[];
		this._propertyView.push(v);
	},
	addChild: function(c) {
		this.children().push(c);
	},
	children: function(c){
		return this._access('children',c);
	},
	removeChild: function(c) {
		this.children($.grep(this.children(),function(n,i){
			return n != c;
		}));
	},
	createElement: function(n) {
		return this.parent().createElement(n);
	},
	attr: function(e,n,v) {
		return this.parent().attr(e,n,v);
	},
	css: function(e,n,v) {
		return this.parent().css(e,n,v);
	},
	attachChild: function(c) {
		return this.parent().attachChild(c);
	},
	bindEvent: function(e) {
		bindEvent(this.getProtoObj(),e);
	},
	defaultEvent: function(e) {
		return this._access("evnt",e);
	}
},_Prop);

function Workflow(w,h) {
	this.width(w);
	this.height(h);
	this.top(0);
	this.left(0);
	this.children([]);
	this.props([]);
	this.globalseq(0);
	this.moveable(true);
	this.defaultEvent({
		"click": (function(that){
			return function(e){
				var c = $(document).data("selectedConnection");
				$(document).removeData("selectedConnection");
				if(c) {
					c.selected(false);
				}
			};
		})(this),
		"mousemove": (function(that){
			return function(e){
				if(that.isContain(e.target)) {
					$.each(that.children(),function(){
						this.mousemove(e);
					});
				}
			};
		})(this)
	});
	bindEvent(document,{
		"mouseup": (function(that){
			return function(e){
				that.unbindDocMousemove();
				$.each(that.children(),function(){
					this.mouseup(e);
					var p = fixPos(that.getProtoObj(), e);
					if(that.connect() && that.newConn != null && this.isOver(p)) {
						var conn = that.newConn.clone();
						that.newConn.destroy();
						delete that.newConn;
						conn.target(this);
						if(conn.source() == conn.target() || conn.target().incommingExist(conn)) {
							conn.destroy();
							delete conn;
						} else {
							conn.connectSource();
							conn.connectTarget();
						}
					}
				});
				if(that.newConn != null) {
					that.newConn.destroy();
					delete that.newConn;
				}
			};
		})(this),
		"mousedown": (function(that){
			return function(e){
				if($(e.target).attr('except') != 'except') {
					$.each(that.children(),function(){
						if(this.isContain(e.target)) {
							this.selected(true);
							if(that.connect()) {
								that.unbindDocMousemove();
								that.bindDocMosemove();
								that.newConn = new Connection(that);
								that.newConn.source(this);
							}
						}
						else
							this.selected(false);
					});
				}
				if(that.isContain(e.target) && that.newObj()) {
					var node = that.createNode();
					o = fixPos(that.getProtoObj(),e);
					node.left(o.x);
					node.top(o.y);
					node.text('节点');
					node.height(50);
					node.width(80);
				}
			};
		})(this)
	});
	this.docMosemove = (function(that){
		return function(e){
			if(that.connect() && that.newConn != null) {
				o = fixPos(that.getProtoObj(), e);
				that.newConn.endPoint(o.x,o.y);
			}
				
		};
	})(this);
	
	this.bindDocMosemove = function(){
		$(document).bind("mousemove",this.docMosemove);
	};
	
	this.unbindDocMousemove = function() {
		$(document).unbind("mousemove",this.docMosemove);
	};
	this.create();
	this.bindEvent(this.defaultEvent());
};

Workflow.prototype = $.extend({},Component.prototype,_workflow,{
	destroy: function() {
		$(this.children()).each(function(){
			this.destroy();
		});
		$(this.getProtoObj()).parent().children().remove();
	},
	globalseq: function(s) {
		if(s != null) {
			s = parseInt(s);
			if(isNaN(s))
				return;
		}
		return this._access("globalseq",s);
	},
	width: function(w) {
		if(w != null) {
			w = parseInt(w);
			if(isNaN(w))
				return;
			$(this.getProtoObj()).parent().width(w);
		}
		return this._access('width',w);
	},
	height: function(h){
		if(h != null) {
			h = parseInt(h);
			if(isNaN(h))
				return;
			$(this.getProtoObj()).parent().height(h);
		}
		return this._access('height',h);
	},
	description: function(d) {
		return this._access("description",d);
	},
	name: function(n) {
		return this._access("name",n);
	},
	id: function(n) {
		return this._access("id",n);
	},
	moveable: function(m) {
		return this._access("moveable",m);
	},
	connect: function(n) {
		if(n == true) {
			this.moveable(false);
		} if(n == false) {
			this.moveable(true);
		}
		return this._access("connect",n)||false;
	},
	color: function(c) {
		return this._access("color",c);
	},
	newObj: function(n) {
		return this._access("newObj",n)||false;
	},
	newobjName: function(n) {
		return this._access("newobjName",n) || "TextNode";
	},
	createNode: function() {
		n = this.newobjName();
		if(n == null)
			return;
		var o = eval("new " + n + "(this)");
		if(o.id) {
			var i = this.globalseq();
			o.id(i++);
			this.globalseq(i);
		}
		return o;
	},
	delSelConnect: function() {
		c = $(document).data("selectedConnection");
		$(document).removeData("selectedConnection");
		if(c != null&& c.selected()) {
			c.destroy();
			delete c;
		}
	},
	delSelected: function() {
		this.children($.grep(this.children(),function(n,i){
			if(n.selected()) {
				n.destroy();
				delete n;
				return false;
			}
			return true;
		}));
	}
});

function point(x,y) {
	this.x = x;
	this.y = y;
}

point.prototype = {
	toString: function() {
		return this.x + "," + this.y;
	},
	clone: function() {
		return new point(this.x,this.y);
	}
};

function Connection(p) {
	this.parent(p);
	this.props([]);
	this.funcProps([]);
	this.width(1);
	this.color(new Color(0,153,204));
	this.create();
	this.css(this.getProtoObj(),"cursor","pointer");
	this.defaultEvent({
		'click': (function(that){
			return function(e){
				var old = $(document).data("selectedConnection");
				if(old) {
					old.selected(false);
				}
				$(document).data("selectedConnection",that);
				that.selected(true);
				e.preventDefault();
				e.stopPropagation();
			};
		})(this),
		'mouseover': (function(that){
			return function(e){
				that.width(2);
			};
		})(this),
		'mouseout': (function(that){
			return function(e){
				that.width(1);
			};
		})(this)
	});
	this.bindEvent(this.defaultEvent());
	if(editConnEvent) {
		for(var i in editConnEvent) {
			$(this.getProtoObj()).bind(i,(function(that){
				return function(e){
					return editConnEvent[i](that,e);
				};
			})(this));
		}
	}
}

Connection.prototype = $.extend({
	clone: function() {
		var c = new Connection(this.parent());
		c.source(this.source());
		c.color(this.color());
		c.lastPoint(this.lastPoint());
		return c;
	},
	selected: function(b) {
		if(b == true) {
			this.color(new Color(255,0,0));
		}
		if(b == false) {
			this.color(new Color(0,153,204));
		}
		return this._access("selected",b);
	},
	funcProps: function(p) {
		return this._access("funcProps",p);
	},
	addFunc: function(f) {
		this.funcProps().push(f);
	},
	removeFunc: function(f) {
		this.funcProps($.grep(this.funcProps(),function(n,i){
			return n != f;
		}));
	},
	equals: function(o) {
		if(this.target() == o.target() &&
				this.source() ==  o.source())
			return true;
		return false;
	},	
	destroy: function() {
		$(this.getProtoObj()).remove();
		this.disconnectTarget();
		this.disconnectSource();
	},
	lastPoint: function(p) {
		return this._access("lastPoint",p);
	},
	source: function(s) {
		return this._access("source",s);
	},
	getLastStartPoint: function(p) {
		return this.fixSourcePoint(p);
	},
	fixTargetPoint: function() {
		t = this.target();
		cy = t.top() + t.height()/2;
		cx = t.left() + t.width()/2;
		ret = new point(0,0);
		s = this.source();
		
		
		if(s.left() + s.width() >= t.left()) {
			ret.y = t.top() - 2;
			ret.x = cx;
		}
		if(s.top() + s.height() >= t.top()) {
			ret.y = t.top() + t.height() + 4;
			ret.x = cx;
		}
		if(s.top() + s.height() <= t.top()) {
			ret.y = t.top() - 2;
			ret.x = cx;
		}
		if(s.left() + s.width() <= t.left()) {
			ret.y = cy;
			ret.x = t.left() - 2;
		}
		if(t.left() + t.width() < s.left()) {
			ret.x = t.left() + t.width() + 6;
			ret.y = cy;
		}
		return ret;
	},
	fixSourcePoint: function(p) {
		s = this.source();
		sp = p.clone();
		cy = s.top() + s.height()/2;
		cx = s.left() + s.width()/2;
		
		if(p.y + 2 >= s.top() + s.height() ) {
			sp.y = s.top() + s.height() + 4;
			sp.x = cx;
		}
		if(p.y - 2 <= s.top()) {
			sp.y = s.top() - 2;
			sp.x = cx;
		}
		if(p.x - 2 >= s.left() + s.width()) {
			sp.x = s.left() + s.width() + 6;
			sp.y = cy;
		}
		if(p.x - 2 <= s.left()) {
			sp.x = s.left() - 2;
			sp.y = cy;
		}
		return sp;
	},
	condition: function(c) {
		return this._access("condition",c);
	},
	points: function(s) {
		return this._access("points",s);
	},
	color: function(t) {
		return this._access("color",t);
	},
	target: function(t) {
		return this._access("target",t);
	},
	connectSource: function() {
		if(this.source()) {
			this.fireProperty("connectSource");
			this.source().addOutgoing(this);
		}
	},
	disconnectSource: function() {
		if(this.source()) {
			this.fireProperty("disconnectSource");
			this.source().removeOutgoing(this);
		}
	},
	connectTarget: function() {
		if(this.target()) {
			this.fireProperty("connectTarget");
			this.target().addIncomming(this);
		}
	},
	disconnectTarget: function() {
		if(this.target()) {
			this.fireProperty("disconnectTarget");
			this.target().removeIncomming(this);
		}
	},
	endPoint: function(x,y) {
		p = new point(x,y);
		this._access("endPoint",p);
	}
},Component.prototype,_Connection);

function TextNode(p) {
	this.width(100);
	this.height(100);
	this.top(0);
	this.left(0);
	this.type('node');
	this.children([]);
	this.props([]);
	this.preFuncs([]);
	this.conditionFuncs([]);
	this.parent(p);
	p.addChild(this);
	this.startColor(new Color(255,255,255));
	this.endColor(new Color(00,153,204));
	this.defaultEvent({
		"mousedown": (function(that){
			return function(e){
				that.mousedown(e);
			};
		})(this),
		"mouseup": (function(that){
			return function(e){
				that.mouseup(e);
			};
		})(this),
		"mousemove": (function(that){
			return function(e){
				that.mousemove(e);
			};
		})(this)
	});
	this.incomming([]);
	this.outgoing([]);
	this.create();
	this.bindEvent(this.defaultEvent());
	if(editNodeEvent) {
		for(var i in editNodeEvent) {
			$(this.getProtoObj()).bind(i,(function(that){
				return function(e){
					return editNodeEvent[i](that,e);
				};
			})(this));
		}
	}
}

TextNode.prototype = $.extend({
	incommingExist: function(c) {
		var incomming = this.incomming();
		for(var i = 0; i < incomming.length; i++) {
			if(incomming[i].equals(c))
				return true;
		}
		return false;
	},
	conditionFuncs: function(p) {
		return this._access('conditionFuncs',p);
	},
	addConditionFunc: function(p) {
		return this.conditionFuncs().push(p);
	},
	removeConditionFunc: function(p) {
		this.conditionFuncs($.grep(this.conditionFuncs(),function(n,i){
			return n != p;
		}));
	},
	preFuncs: function(p) {
		return this._access('preFuncs',p);
	},
	addPreFunc: function(p) {
		return this.preFuncs().push(p);
	},
	removePreFunc: function(p) {
		this.preFuncs($.grep(this.preFuncs(),function(n,i){
			return n != p;
		}));
	},
	status: function(s) {
		return this._access("status",s);
	},
	type: function(n) {
		return this._access("type",n);
	},
	id: function(n) {
		return this._access("id",n);
	},
	incomming: function(i) {
		return this._access("incomming",i);
	},
	outgoing: function(i) {
		return this._access("outgoing",i);
	},
	addOutgoing: function(c) {
		this.outgoing().push(c);
	},
	removeOutgoing: function(c) {
		this.outgoing($.grep(this.outgoing(),function(n,i){
			return n != c;
		}));
	},
	addIncomming: function(c) {
		this.incomming().push(c);
	},
	selected: function(b) {
		if(b == true) {
			this.endColor(new Color(255,0,0));
		}else {
			this.endColor(new Color(00,153,204));
		}
		return this._access("selected",b);
	},
	destroy: function() {
		$.each(this.incomming(),function() {
			this.destroy();
			this.disconnectSource();
			this.disconnectTarget();
		});
		$.each(this.outgoing(),function() {
			this.disconnectSource();
			this.disconnectTarget();
			this.destroy();
		});
		this._access("destroy",true);
		$(this.getProtoObj()).remove();
	},
	removeIncomming: function(c) {
		this.incomming($.grep(this.incomming(),function(n,i){
			return n != c;
		}));
	},
	moveable: function() {
		return this.parent().moveable();
	},
	mousemove: function(e) {
		if(this._access("clicked") && this.moveable()){
			offset = this.fix(e);
			this.top(o.y);
			this.left(o.x);
			this.notifyIncomming();
			this.notifyOutgoing();
		}
	},
	notifyIncomming: function() {
		$.each(this.incomming(),function() {
			this.fireProperty("targetMoved");
		});
	},
	notifyOutgoing: function() {
		$.each(this.outgoing(),function() {
			this.fireProperty("sourceMoved");
		});
	},
	mousedown: function(e) {
		this._access("clicked",true);
		this.clickedOffset(e);
	},
	mouseup: function(e) {
		if(this._access("clicked")){
			this._access("clicked",false);
		}
	},
	startColor: function(c) {
		return this._access("startColor",c);
	},
	endColor: function(c) {
		return this._access("endColor",c);
	},
	text: function(t) {
		return this._access("text",t);
	},
	clickedOffset: function(e) {
		this._access("clickedOffset",this.mouseOffset(e));
	},
	pointOffset: function(p) {
		o.x -= this.left();
		o.y -= this.top();
		return o;
	},
	mouseOffset: function(e) {
		o = fixPos(this.parent().getProtoObj(), e);
		this.pointOffset(o);
		return o;
	},
	fix: function(e) {
		o = fixPos(this.parent().getProtoObj(),e);
		clickedOffset = this._access("clickedOffset");
		o.x = o.x - clickedOffset.x;
		o.y = o.y - clickedOffset.y;
		w = this.parent().width();
		h = this.parent().height();
		if(o.x < 0 )
			o.x = 0;
		if(o.x + this.width() > w )
			o.x = w - this.width();
		if(o.y + this.height() > h )
			o.y = h - this.height() ;
		if(o.y < 0 )
			o.y = 0;
		return o;
	}
},_TextNode,Component.prototype);

buttonStyle = function(b) {
	b.mouseover(function(){
		$(this).attr('class',"ui-widget ui-state-hover ui-corner-all");
	});
	b.mouseout(function(){
		$(this).attr('class',"ui-widget ui-state-default ui-corner-all");
	});
	b.mouseup(function(){
		$(this).attr('class',"ui-widget ui-state-hover ui-corner-all");
	});
	b.mousedown(function(){
		$(this).attr('class',"ui-widget ui-state-active ui-corner-all");
	});
};

var wf = null;

function reloadWorkflow(xml) {
	wf.destroy();
	var serial = new serialize2Obj(); 
	wf = serial.unmarshal(xml,$("#container"));
	$("#container").width(wf.width());
	$("#container").height(wf.height());
}

function simpleShowWorkflow(xml,content) {
	wf.destroy();
	var serial = new serialize2Obj(); 
	wf = serial.unmarshal(xml,$("#container"));
	var box = new Box();
	box.size(260,260);
	$(wf.getProtoObj()).unbind();
	$(document).unbind();
	$(wf.children()).each(function(){
		$(this.getProtoObj()).unbind();
		if(this.status() == "finish") {
			this.endColor(new Color(200,68,100));
		}
		if(this.status() == "active") {
			this.endColor(new Color(255,180,50));
		}
		$(this.getProtoObj()).bind("mouseout",(function(that){
			box.hide();
		}));
		$(this.getProtoObj()).bind("mouseover",(function(that){
			return function() {
				offset = $("#container").offset();
				var o = new Object();
				o.left = that.left() + that.width() + offset.left + 6;
				o.top = that.top() + offset.top - 23;
				box.show();
				box.content($("<div class='loading'/>").width(16).height(16));
				box.title(that.text() + "信息");
				box.position(o);
				if(content != null && typeof(content) == "function")
					box.content(content(that));
			};
		})(this));
		$(this.outgoing()).each(function(){
			if(this.source().status() != 'unactive' &&
					this.target().status() != 'unactive')
				this.color(new Color(255,0,0));
			$(this.getProtoObj()).unbind();
		});
	});
	$(document).keyup(function(e){
		if(e.keyCode == 27)
			box.hide();
	});
	$("#container").width(wf.width());
	$("#container").height(wf.height());
}

var toolbarplugins = [];

function addToolbarplugin(o) {
	toolbarplugins.push(o);
}

var getCurrentWorkflow = function() {
	return wf;
};

var checkNodeId = function(nodes) {
	var o = new Object();
	$(nodes).each(function(){
		if(o[this.id()] == null)
			o[this.id()] = 0;
		else
			o[this.id()] ++;
	});
	for(var id in o) {
		if(o[id] >= 1)
			return false;
	}
	return true;
};

$(document).ready(function(){
	wf = new Workflow(800,600);
	wf.id($.uuid());
	wf.name("新建的流程");
	$("#container").width(wf.width());
	$("#container").height(wf.height());
	$("#container").append(wf.getProtoObj());
	
	
	toolbar = function(target) {
		if(target == null || target.length == 0)
			return;
		root = $("<div id='toolbar'/>");
		root.attr("class","ui-widget ui-widget-content ui-corner-all");
		head = $("<div/>").attr("class","ui-widget-header ui-corner-all");
		root.append(head);
		head.text("工具栏");
		var body = root;
		
		var rename = $("<div/>");
		rename.attr("class","ui-widget ui-state-default ui-corner-all");
		rename.text("流程编辑");
		rename.css("cursor","pointer");
		buttonStyle(rename);
		var rendlg = null;
		var rninput = null;
		rename.click(function(){
			var dlg = $(document).data("editWrokflowDlg");
			if(dlg == null) {
				dlg = new EditWorkflowDlg();
			}
			dlg.setWorkflow(wf);
			dlg.show(true);
			$(document).data("editWrokflowDlg",dlg);
		});
		body.append(rename);
		
		var connObj = $("<div/>");
		var newObj = $("<div/>");
		newObj.attr("id","newObj");
		newObj.toggle(function(){
			$(this).removeClass("ui-state-default");
			$(this).addClass("ui-state-active");
			wf.newObj(true);
			if(wf.connect()) {
				connObj.trigger("click");
			}
		},function(){
			$(this).addClass("ui-state-default");
			$(this).removeClass("ui-state-active");
			wf.newObj(false);
		});
		
		newObj.attr("class","ui-widget ui-state-default ui-corner-all");
		newObj.css("cursor","pointer");
		newObj.text("添加节点");
		body.append(newObj);
		
		var delObj = $("<div/>");
		delObj.attr("id","delObj");
		delObj.attr("class","ui-widget ui-state-default ui-corner-all");
		delObj.css("cursor","pointer");
		delObj.text("删除节点");
		delObj.attr("except",'except');
		buttonStyle(delObj);
		delObj.click(function(){
			wf.delSelected();
		});
		body.append(delObj);

		connObj.attr("id","connObj");
		connObj.attr("class","ui-widget ui-state-default ui-corner-all");
		connObj.css("cursor","pointer");
		connObj.text("连接节点");
		connObj.toggle(function(){
			$(this).removeClass("ui-state-default");
			$(this).addClass("ui-state-active");
			if(wf.newObj()) {
				newObj.trigger("click");
			}
			wf.connect(true);
		},function(){
			$(this).addClass("ui-state-default");
			$(this).removeClass("ui-state-active");
			wf.connect(false);
		});
		body.append(connObj);
		
		var delC = $("<div/>");
		delC.attr("id","delConnect");
		delC.attr("class","ui-widget ui-state-default ui-corner-all");
		delC.css("cursor","pointer");
		delC.text("删除连接");
		buttonStyle(delC);
		delC.click(function(){
			wf.delSelConnect();
		});
		body.append(delC);
		
		if(toolbarplugins) {
			$(toolbarplugins).each(function(){
				body.append(this());
			});
		}
		
		var save = $("<div/>");
		save.attr("class","ui-widget ui-state-default ui-corner-all");
		save.text("保　　存");
		save.css("cursor","pointer");
		buttonStyle(save);
		save.click(function(){
			if(!checkNodeId(wf.children())) {
				$.showErr('重复ID,不能保存');
				
				return;
			}
			if(wf.children().length < 1) {
				$.showErr('无效流程,不能保存');
				return;
			}
			var serial = new serialize2xml();
			$.loadJSON(ctx + "/workflowSave.wf",{'workflow':serial.marshal(wf)},function(json){
				if(json.code == 0) {
					$.showMsg('保存成功');
				}
				if(json.code < 0) {
					$.showErr('保存失败');
				}
				if(json.msg)
					$.showErr(json.msg);
			});
		});
		body.append(save);
		
		var importBtn = $("<div/>");
		importBtn.attr("class","ui-widget ui-state-default ui-corner-all");
		importBtn.text("导　　入");
		importBtn.css("cursor","pointer");
		buttonStyle(importBtn);
		var importDiv = $("<div id='importDiv'/>").append($('<textarea />')).hide();
		$('body').append(importDiv);
		importBtn.click(function(){
			var textarea = importDiv.children('textarea');
			textarea.width(350);
			textarea.height(60);
			importDiv.dialog({
				'modal':true,
				'resizable':false,
				'width': '380px',
				'title': '导入',
				'autoOpen': true,
				'buttons': {
					'取消':function(){
						$(this).dialog("close");
					},
					'确定':function(){
						if(textarea.val() == '') {
							$.showMsg('请拷贝导入模板');
							return;
						}
						$(this).dialog("close");
						$.loadData(ctx + '/workflowGet.wf',{'fileContent':textarea.val()},function(xml){
							reloadWorkflow(xml);
						});
					}
				}
			});
		});
		body.append(importBtn);
		
		target.append(root);
	};
	
	toolbar($("#panel"));
});




