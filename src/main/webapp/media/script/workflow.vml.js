document.namespaces.add('v', 'urn:schemas-microsoft-com:vml');

_workflow = {
	create : function() {
		rect = this.createElement("v:rect");
		this.css(rect,"position","absolute");
		this.css(rect, "width", this.width());
		this.css(rect, "height", this.height());
		$("body").append(rect);
		this.rect = rect;
		this.css(this.rect,"position","absolute");
		this.vmltext = this.createElement("v:TextBox");
		$(rect).append(this.vmltext);
		this.css(this.vmltext,"font-size","16px");
		this.css(this.vmltext,"font-weight","bold");
		this.css(this.vmltext,"color","red");
		this.attr(this.vmltext,"inset","6px,6px,0px,0px");
		this._bindView();
		return rect;
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
			$(this.vmltext).text(nv);
		}
		if(n == 'width') {
			this.css(this.rect,'width',nv);
		}
		if(n == 'height') {
			this.css(this.rect,'height',nv);
		}
	},
	getProtoObj: function() {
		return this.rect;
	},
	isContain: function(n) {
		if(n == this.rect )
			return true;
		return false;
	},
	createElement: function(e) {
		el = document.createElement(e);
		return el;
	},
	attachChild: function(c) {
		$(this.rect).parent().append(c);
	},
	attr: function(e,n,v) {
		$(e).attr(n,v);
	},
	css: function(e,n,v) {
		$(e).css(n,v);
	},
	_fixPoint: function(o,p) {
		var offset = $(o).position();
		var np = p.clone();
		np.x += offset.left;
		np.y += offset.top;
		return np;
	}
};

_Connection = {
	create: function() {
		this.pl = this.createElement("v:PolyLine");
		if(this.color()) {
			this._color(this.color());
		}
		this.attr(this.pl,"strokeweight",this.width() + "px");
		this.parent().attachChild(this.pl);
		this.sk = this.createElement("v:stroke");
		this.pl.appendChild(this.sk);
		this.attr(this.sk,"startarrow","none");
		this.attr(this.sk,"endarrow","classic");
		this.css(this.pl,"position","absolute");
		$(this.pl).click(function(){
		});
		this._bindView();
	},
	_getmarker: function(c) {
		return this.parent()._getmarker(c);
	},
	getProtoObj: function() {
		return this.pl;
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
			var p = this.fixTargetPoint();
			this._endPoint(p);
		}
		if(n == 'width') {
			this.attr(this.pl,"strokeweight",this.width() + "px");
		}
	},
	_color: function(c) {
		this.attr(this.pl,"strokecolor","rgb("+c.r+","+c.g+","+ c.b +")");
	},
	_endPoint: function(p) {
		this.lastPoint(p);
		var sp = this.getLastStartPoint(p);
		this.pl.points.value = sp.x + "," + sp.y + " " + (p.x) + "," + (p.y);
	},
	_fixPoint: function(p) {
		var parent = this.parent();
		return parent._fixPoint(parent.getProtoObj(),p);
	}
};

_PreNode = {
		
};

_TextNode = {
	create: function() {
		this.rect = this.createElement("v:RoundRect");
		shadow = this.createElement("v:shadow");
		this.attr(shadow,"type","single");
		this.attr(shadow,"color","#000000");
		this.attr(shadow,"offset","5px,5px");
		this.attr(shadow,"on","true");
		this.rect.appendChild(shadow);
		this.css(this.rect,"position","absolute");
		this.fill = this.createElement("v:fill");
		this.attr(this.fill,"type","gradient");
		sc = this.startColor();
		ec = this.endColor();
		if( sc != null && ec != null)
			this._colorrender(sc, ec);
		this.rect.appendChild(this.fill);
		this.vmltext = this.createElement("v:TextBox");
		this.rect.appendChild(this.vmltext);
		this.parent().attachChild(this.rect);
		this.css(this.vmltext,"font-size","12px");
		this.attr(this.vmltext,"inset","0px,20px,0px,0px");
		this.css(this.rect,"cursor","pointer");
		this._bindView();
	},
	getProtoObj: function() {
		return this.rect;
	},
	_bindView: function() {
		this.addPropertyView((function(that){
			return function(n,o,nv){
				that._propertyChange(n,o,nv);
			};
		})(this));
	},
	isContain: function(n) {
		if(n == this.rect || n == this.vmltext)
			return true;
		return false;
	},
	_propertyChange:function(n,o,nv) {
		if(n == 'top' ||
			n == 'left' ||
			n == 'width' ||
			n == 'height') {
			this.css(this.rect,n,nv);
			if(n == 'left' || n == 'top') {
				var p = new point(this.left(),this.top());
				p = this._fixPoint(p);
				this.css(this.rect,"left",p.x);
				this.css(this.rect,"top",p.y);
			}
			if(n == 'height')
				this._textaligin(this.vmltext,this.width(),this.height());
		}
		if(n == 'text') {
			$(this.vmltext).text(nv);
		}
		if(n == "startColor" || n == "endColor")
			this._colorrender(this.startColor(),this.endColor());
	},
	_fixPoint: function(p) {
		var parent = this.parent();
		return parent._fixPoint(parent.getProtoObj(),p);
	},
	_textaligin: function(text,w,h) {
		this.attr(text,"inset","0px," + (h -12)/2 + "px,0px,0px");
	},
	_colorrender: function(sc,ec) {
		if(sc != null && ec != null) {
			this.attr(this.fill,"color",ec);
			this.attr(this.fill,"color2",sc);
		}
	}
};
