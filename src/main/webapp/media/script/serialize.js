
function serialize2xml () {
}

serialize2xml.prototype = {
	'marshal': function(wf) {
		var xmlWf = $("<workflow/>");
		xmlWf.append(this.p2xml(wf,'id'));
		xmlWf.append(this.p2xml(wf,'name'));
		xmlWf.append(this.p2xml(wf,'description'));
		var viewProp = $("<view/>");
		viewProp.append(this.p2xml(wf,'width'));
		viewProp.append(this.p2xml(wf,'height'));
		viewProp.append(this.p2xml(wf,'globalseq'));
		xmlWf.append(viewProp);
		xmlWf.append(this.marshalProps(wf.props()));
		that = this;
		xmlNodes = $("<nodes/>");
		xmlWf.append(xmlNodes);
		$(wf.children()).each(function(){
			xmlNodes.append(that.marshalNode(this));
		});
		return this.obj2str(xmlWf);
	},
	'p2xml': function(p,n) {
		var xml = $("<" + n + "/>");
		if(p[n] == null)
			return;
		if(typeof(p[n]) == 'function')
			xml.text(p[n]());
		else
			xml.text(p[n]);
		return xml;
	},
	'marshalActions': function(outgoings) {
		var xmlActions = $("<actions/>");
		that = this;
		$(outgoings).each(function(){
			xmlActions.append(that.marshalAction(this));
		});
		return xmlActions;
	},
	'marshalAction': function(outgoing) {
		var target = outgoing.target();
		xmlAction = $("<action/>");
		xmlAction.attr('tonode',target.id());
		if(outgoing.condition())
			xmlAction.attr('condition',outgoing.condition());
		xmlAction.append(this.marshalProps(outgoing.props()));
		xmlAction.append(this.marshalActionFuncs(outgoing.funcProps()));
		return xmlAction;
	},
	'marshalActionFuncs': function(prefuncs) {
		var xmlFuncProps = $("<functions/>");
		var xmlPrefuncs = $("<prefuncs/>");
		xmlFuncProps.append(xmlPrefuncs);
		that = this;
		$(prefuncs).each(function(){
			xmlPrefuncs.append(that.marshalNodeFuncProp(this));
		});
		return xmlFuncProps;
	},
	'marshalNode': function(node) {
		xmlNode = $("<node/>");
		xmlNode.attr('text',node.text());
		xmlNode.attr('type',node.type());
		xmlNode.append(this.p2xml(node,'id'));
		xmlNode.append(this.p2xml(node,'description'));
		xmlNode.append(this.marshalNodeView(node));
		xmlNode.append(this.marshalProps(node.props()));
		xmlNode.append(this.marshalNodeFuncProps(node.preFuncs(),node.conditionFuncs()));
		xmlNode.append(this.marshalActions(node.outgoing()));
		return xmlNode;
	},
	'marshalNodeView': function(node) {
		var xmlView = $("<view/>");
		xmlView.append(this.p2xml(node,'top'));
		xmlView.append(this.p2xml(node,'left'));
		xmlView.append(this.p2xml(node,'width'));
		xmlView.append(this.p2xml(node,'height'));
		return xmlView;
	},
	'marshalNodeFuncProps': function(prefuncs,conditionfuncs) {
		var xmlFuncProps = $("<functions/>");
		var xmlPrefuncs = $("<prefuncs/>");
		xmlFuncProps.append(xmlPrefuncs);
		that = this;
		$(prefuncs).each(function(){
			xmlPrefuncs.append(that.marshalNodeFuncProp(this));
		});
		
		var xmlConditionfuncs = $("<conditionfuncs/>");
		xmlFuncProps.append(xmlConditionfuncs);
		$(conditionfuncs).each(function(){
			xmlConditionfuncs.append(that.marshalNodeFuncProp(this));
		});
		return xmlFuncProps;
	},
	'marshalNodeFuncProp': function(prop) {
		var xmlFuncProp = $("<function/>");
		xmlFuncProp.attr("clzname",prop.clzName());
		xmlFuncProp.attr("methodname",prop.methodName());
		xmlFuncProp.attr("type",prop.type());
		return xmlFuncProp;
	},
	'marshalProps': function(props) {
		var xmlProps = $("<props/>");
		that = this;
		$(props).each(function(){
			xmlProps.append(that.marshalProp(this));
		});
		return xmlProps;
	},
	'marshalProp': function(prop) {
		var xmlProp = $("<prop/>");
		xmlProp.attr("name",prop.name());
		xmlProp.attr("value",prop.value());
		xmlProp.attr("displayval",prop.displayVal());
		xmlProp.attr("type",prop.type());
		return xmlProp;
	},
	'obj2str': function(d) {
		try {
			var serial = new XMLSerializer();
			return serial.serializeToString(d[0]);
		}catch(e) {
			return d[0].outerHTML;
		}
	}
};

function serialize2Obj () {
}

serialize2Obj.prototype = {
	'unmarshal': function(doc,p) {
		wf = new Workflow(0,0);
		domWf = $(doc).children('workflow');
		view = domWf.children('view');
		wf.id(domWf.children("id").text());
		wf.name(domWf.children("name").text());
		wf.description(domWf.children("description").text());
		wf.width($('width',view).text());
		wf.height($('height',view).text());
		wf.globalseq($('globalseq',view).text());
		wf.props(this.unmarshalProps(domWf.children("props"),wf));
		p.width(wf.width());
		p.height(wf.height());
		p.append(wf.getProtoObj());
		this.unmarshalNodes($("nodes node",domWf),wf);
		this.finishConnects(wf.children());
		return wf;
	},
	'finishConnects': function(childrens) {
		that = this;
		$(childrens).each(function(){
			child = this;
			that.finishConnect(child.outgoing(),childrens);
		});
	},
	'finishConnect': function(outgoings,childrens) {
		that = this;
		$(outgoings).each(function(){
			conn = this;
			conn.target(that.findNode(conn.tonode,childrens));
			conn.connectTarget();
		});
	},
	'findNode': function(id,nodes) {
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].id() == id)
				return nodes[i];
		}
	},
	'unmarshalNodes': function(domNodes,wf) {
		nodes = [];
		that = this;
		domNodes.each(function(){
			nodes.push(that.unmarshalNode($(this),wf));
		});
		
	},
	'unmarshalNode': function(domNode,wf) {
		var node = new TextNode(wf);
		node.top($("view top",domNode).text());
		node.left($("view left",domNode).text());
		node.width($("view width",domNode).text());
		node.height($("view height",domNode).text());
		node.description($("description",domNode).text());
		node.text(domNode.attr("text"));
		node.status(domNode.attr("status"));
		node.type(domNode.attr("type"));
		node.id($("id",domNode).text());
		node.props(this.unmarshalProps(domNode.children("props"),wf));
		node.preFuncs(this.unmarshalFuncs('prefuncs function',domNode.children("functions"),wf));
		node.conditionFuncs(this.unmarshalFuncs('conditionfuncs function',domNode.children("functions"),wf));
		this.unmarshalNodeActions(domNode,node,wf);
		return node;
	},
	'unmarshalProps': function(dom,wf) {
		domProps = $("prop",dom);
		that = this;
		var props = [];
		domProps.each(function(){
			props.push(that.unmarshalProp($(this)));
		});
		return props;
	},
	'unmarshalNodeActions': function(domNode,node,wf) {
		that = this;
		$("actions action",domNode).each(function(){
			var conn = that.unmarshalNodeAction($(this),wf);
			conn.source(node);
			conn.connectSource();
		});
	},
	'unmarshalNodeAction': function(domAction,wf) {
		var conn = new Connection(wf);
		conn.tonode = domAction.attr('tonode');
		conn.condition(domAction.attr('condition'));
		conn.props(this.unmarshalProps(domAction.children("props"),wf));
		conn.funcProps(this.unmarshalFuncs('functions prefuncs function',domAction,wf));
		return conn;
	},
	'unmarshalProp': function(domProp,wf) {
		var o = new Property();
		o.name(domProp.attr("name"));
		o.value(domProp.attr("value"));
		o.displayVal(domProp.attr("displayval"));
		o.type(domProp.attr("type"));
		return o;
	},
	'unmarshalFuncs': function(filter,domNode,wf) {
		domProps = $(filter,domNode);
		that = this;
		var props = [];
		domProps.each(function(){
			props.push(that.unmarshalFuncProp($(this)));
		});
		return props;
	},
	'unmarshalFuncProp': function(domProp,wf) {
		var o = new FuncProp();
		o.clzName(domProp.attr("clzname"));
		o.methodName(domProp.attr("methodname"));
		o.type(domProp.attr("type"));
		return o;
	}
};
