
_workflow = {
	NS : 'http://www.w3.org/2000/svg',
	create : function() {
		svg = document.createElementNS(this.NS,'svg:svg');
		svg.setAttribute('version','1.1');
		svg.setAttribute('width',this.width());
		svg.setAttribute('height',this.height());
		this.svg = svg;
		this.svgDoc = svg.ownerDocument;
		rect = this.createElement("svg:rect");
		this.attr(rect,"id", "sense");
		this.attr(rect,'width',"100%");
		this.attr(rect,'height',"100%");
		this.attr(rect,'style',"fill:rgb(255,255,255);stroke-width:1; stroke:rgb(0,0,0)");
		svg.appendChild(rect);
		this.rect = rect;
		this._defsdefine();
		this.svgtext = this.createElement("svg:text");
		$(this.svgtext).attr("font-size",'16');
		$(this.svgtext).attr("font-weight",'bold');
		$(this.svgtext).attr("fill",'red');
		this.attr(this.svgtext,"y",6 + parseInt($(this.svgtext).attr("font-size")||12));
		this.attr(this.svgtext,"x",6);
		this.attachChild(this.svgtext);
		this._bindView();
		return svg;
	},
	_bindView: function() {
		this.addPropertyView((function(that){
			return function(n,o,nv){
				that._propertyChange(n,o,nv);
			};
		})(this));
	},
	_propertyChange: function(n,o,nv) {
		if(n == 'name') {
			$(this.svgtext).text(nv);
		}
		if(n == 'width') {
			this.attr(this.svg,'width',nv);
		}
		if(n == 'height') {
			this.attr(this.svg,'height',nv);
		}
	},
	redraw: function() {
		this.svg.forceRedraw();
	},
	isContain: function(n) {
		if(n == this.rect )
			return true;
		return false;
	},
	getProtoObj: function() {
		return this.svg;
	},
	_createdefs:function() {
		if(this._defs == null) {
			this._defs = this.createElement("svg:defs");
			this.attachChild(this._defs);
		}
	},
	_getmarker: function(c) {
		this._markers = this._markers || {} ;
		id = c.hashCode();
		marker = this._markers[id];
		if(marker == null) {
			marker = this.createElement("svg:marker");
			this.attr(marker,"id","mk"+id);
			this.attr(marker,"refX","8");
			this.attr(marker,"refY","4");
			this.attr(marker,"markerWidth","8");
			this.attr(marker,"markerHeight","8");
			this.attr(marker,"orient","auto");
			path = this.createElement("svg:path");
			this.attr(path,"d","M 0 0 L 8 4 L 0 8 ");
			this.attr(path,"fill","none");
			this.attr(path,"stroke","rgb("+c.r+","+c.g+","+c.b+")");
			this.css(path,"stroke-width","1");
			marker.appendChild(path);
			this._defs.appendChild(marker);
		}
		this._markers[id] = marker;
		return marker.id;
	},
	_getLineGradient: function(sc,ec) {
		this._lineGradients = this._lineGradients || {} ;
		id = sc.hashCode() + ec.hashCode();
		l = this._lineGradients[id];
		if(l == null) {
			l = this.createElement("svg:linearGradient");
			this.attr(l,"id","lg"+id);
			this.attr(l,"x1","0%");
			this.attr(l,"y1","0%");
			this.attr(l,"x2","0%");
			this.attr(l,"y2","100%");
			s = this.createElement("svg:stop");
			l.appendChild(s);
			this.attr(s,"offset","0%");
			this.attr(s,"style","stop-color:" + sc + ";stop-opacity:1");
			s = this.createElement("svg:stop");
			l.appendChild(s);
			this.attr(s,"offset","100%");
			this.attr(s,"style","stop-color:" + ec + ";stop-opacity:1");
			this._defs.appendChild(l);
		}
		this._lineGradients[id] = l;
		return l.id;
	},
	_defsdefine: function() {
		this._createdefs();
		filter = this.createElement("svg:filter");
		this.attr(filter, "id", "shadow");
		feGaussianBlur = this.createElement("svg:feGaussianBlur");
		filter.appendChild(feGaussianBlur);
		this.attr(feGaussianBlur, "in", "SourceAlpha");
		this.attr(feGaussianBlur, "stdDeviation", "2");
		this.attr(feGaussianBlur, "result", "MyBlur");
		feOffset = this.createElement("svg:feOffset");
		this.attr(feOffset, "in", "MyBlur");
		this.attr(feOffset, "dx", "2");
		this.attr(feOffset, "dy", "2");
		this.attr(feOffset, "result", "FinalBlur");
		filter.appendChild(feOffset);
		feMerge = this.createElement("svg:feMerge");
		feMergeNode = this.createElement("svg:feMergeNode");
		this.attr(feMergeNode, "in", "FinalBlur");
		feMerge.appendChild(feMergeNode);
		feMergeNode = this.createElement("svg:feMergeNode");
		this.attr(feMergeNode, "in", "SourceGraphic");
		feMerge.appendChild(feMergeNode);
		filter.appendChild(feMerge);
		this._defs.appendChild(filter);
	},
	attachChild: function(c) {
		this.svg.appendChild(c);
	},
	createElement: function(e) {
		return this.svgDoc.createElementNS(this.NS,e);
	},
	attr: function(e,n,v) {
		e.setAttribute(n,v);
	},
	css: function(e,n,v) {
		e.style.removeProperty(n);
		e.style.setProperty(n,v,"");
	}
};


_Connection = {
	create: function() {
		this.path = this.createElement("svg:path");
		this.parent().attachChild(this.path);
		if(this.color()) {
			this._color(this.color());
			this.attr(this.path,"marker-end","url(#"  + this._getmarker(this.color()) + ")");
		}
		this.css(this.path,"stroke-width",this.width());
		this._bindView();
	},
	_getmarker: function(c) {
		return this.parent()._getmarker(c);
	},
	getProtoObj: function() {
		return this.path;
	},
	_bindView: function() {
		this.addPropertyView((function(that){
			return function(n,o,nv){
				that._propertyChange(n,o,nv);
			};
		})(this));
	},
	_propertyChange: function(n,o,nv) {
		if(n == "endPoint")
			this._endPoint(nv);
		if(n == 'color')
			this._color(nv);
		if(n == 'connectTarget' || n == 'targetMoved' || n == 'sourceMoved') {
			p = this.fixTargetPoint();
			this._endPoint(p);
		}
		if(n == 'width') {
			this.css(this.path,"stroke-width",nv);
		}
	},
	_color: function(c) {
		this.attr(this.path,"marker-end","url(#"  + this._getmarker(c) + ")");
		this.css(this.path,"stroke","rgb("+c.r+","+c.g+","+ c.b +")");
	},
	_endPoint: function(p) {
		this.lastPoint(p);
		sp = this.getLastStartPoint(p);
		this.attr(this.path,"d","M" + sp.x + " " + sp.y + " L" + (p.x) + " " + (p.y));
	}
};

_SelectNode = {
	create : function() {
		this.svgrect = this.createElement("svg:rect");
		this.css(this.svgrect,"stroke-width",'1');
		this.css(this.svgrect,"stroke",'rgb(0,0,0)');
		this.attr(this.svgrect,"fill",'none');
		this.show(false);
		this.css(this.svgrect,"stroke-dasharray",'9,3,5');
		this.parent().attachChild(this.svgrect);
		this._bindView();
		this.width(100);
		this.height(100);
	},
	show: function(b) {
		if(b)
			this.attr(this.svgrect,"display",'display');
		else
			this.attr(this.svgrect,"display",'none');
	},
	_bindView: function() {
		this.addPropertyView((function(that){
			return function(n,o,nv){
				that._propertyChange(n,o,nv);
			};
		})(this));
	},
	_propertyChange:function(n,o,nv) {
		if(n == 'width' ||
			n == 'height') {
			this.attr(this.svgrect,n,nv);
		}
		if(n == 'top' ) {
			this.attr(this.svgrect,'y',nv);
		}
		if(n == 'left' ) {
			this.attr(this.svgrect,'x',nv);
		}
	}
};

_TextNode = {
	_getLineGradient: function(b,e) {
		return this.parent()._getLineGradient(b,e);
	},
	create : function() {
		this.svggroup = this.createElement("svg:g");
		this.svgrect = this.createElement("svg:rect");
		this.css(this.svgrect,"filter","url(#shadow)");
		this.attr(this.svgrect,"rx","5");
		this.attr(this.svgrect,"ry","5");
		sc = this.startColor();
		ec = this.endColor();
		if( sc != null && ec != null)
			this._colorrender(sc, ec);
		this.css(this.svgrect,"stroke-width",'1');
		this.css(this.svgrect,"stroke",'rgb(0,0,0)');
		this.svgtext = this.createElement("svg:text");
		this.attr(this.svgtext,"font-size","12");
		this.attr(this.svgtext,"text-anchor","center");
		this.svggroup.appendChild(this.svgrect);
		this.svggroup.appendChild(this.svgtext);
		this.parent().attachChild(this.svggroup);
		this._bindView();
		this.css(this.svggroup,"cursor","pointer");
	},
	isContain: function(n) {
		if(n == this.svgrect || n == this.svgtext)
			return true;
		return false;
	},
	getProtoObj: function() {
		return this.svggroup;
	},
	_bindView: function() {
		this.addPropertyView((function(that){
			return function(n,o,nv){
				that._propertyChange(n,o,nv);
			};
		})(this));
	},
	_propertyChange:function(n,o,nv) {
		if(n == 'width' ||
			n == 'height') {
			this.attr(this.svggroup,n,nv);
			this.attr(this.svgrect,n,nv);
			if(n == 'height') {
				this._textaligin(this.svgtext,this.width(),this.height());
			}
		}
		if(n == 'top' || n == 'left') {
			this._reposition();
		}
		if(n == "text") {
			this._textrender(nv);
		}
		if(n == "startColor" || n == "endColor")
			this._colorrender(this.startColor(),this.endColor());
	},
	_textrender: function(t) {
		$(this.svgtext).text(t);
	},
	_reposition: function() {
		this.attr(this.svggroup,'transform',"translate("+this.left()+","+this.top()+")");
	},
	_colorrender: function(sc,ec) {
		if(sc != null && ec != null) {
			cid = this._getLineGradient(sc,ec);
			this.css(this.svgrect,"fill","url(#" + cid + ")");
		}
	},
	_textaligin: function(text,w,h) {
		this.attr(text,"y",(h)/2);
		this.attr(text,"x",6);
	}
};
