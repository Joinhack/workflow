function Box() {
	this.create();
};
Box.prototype = {
	create: function() {
		var root = $("<div class='box'/>");
		root.css("position","absolute");
		root.hide();
		root.append(("<div class='tl'/>"));
		root.append($("<div class='tc'/>"));
		root.append($("<div class='tr'/>"));
		that = this;
		root.append($("<div class='close'/>").click(function(){
			that.hide();
		}).css('cursor','pointer'));
		root.append($("<div class='ll'/>").css("background-color","#ffffff"));
		root.append($("<div class='rl'/>").css("background-color","#ffffff"));
		root.append($("<div class='contents'/>").css("background-color","#ffffff"));
		root.append($("<div class='bl'/>"));
		root.append($("<div class='bc'/>"));
		root.append($("<div class='br'/>"));
		this.boxDiv = root;
		$("body").append(root);
	},
	size: function(w,h) {
		this.boxDiv.width(w);
		this.boxDiv.height(h);
		this.boxDiv.children(".tc").width(w - 23);
		this.boxDiv.children(".ll").height(h - 25);
		this.boxDiv.children(".rl").height(h - 25);
		this.boxDiv.children(".contents").width(w - 20);
		this.boxDiv.children(".contents").height(h - 23);
		this.boxDiv.children(".bc").width(w - 30);
	},
	title: function(t) {
		this.boxDiv.children(".tc").text(t);
	},
	position: function(offset) {
		this.boxDiv.offset(offset);
	},
	content: function(c) {
		content = this.boxDiv.children(".contents");
		content.children().remove();
		content.append(c);
	},
	show: function() {
		this.boxDiv.show();
	},
	hide: function() {
		this.boxDiv.hide();
	}
};

