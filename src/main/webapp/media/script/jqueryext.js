(function($) {
	function WaitLayer(t) {
		this.text = t;
		this.create();
	};
	WaitLayer.prototype = {
		create: function() {
			var bg = $("<div/>",{"class":"pop_win_background"});
			bg.css("z-index","998");
			bg.css("position","absolute");
			bg.css("top",0);
			bg.css("left",0);
			bg.width($(document).width());
			bg.height($(document).height());
			var border = $("<div/>",{"class":"pop_win_bg"});
			border.css("position","absolute");
			border.css("z-index","999");
			var div = $("<div/>",{"class":"pop_win_con"});
			div.css("position","absolute");
			div.css("fontSize","26px");
			div.css("z-index","1000");
			div.append(this.text);
			$("body").append(bg);
			$("body").append(border);
			$("body").append(div);
			b = 20;
			border.width(div.width() + b);
			border.height(div.height() + b);
			
			div.css("top",($(window).height() - div.height())/2 + $(document).scrollTop());
			div.css("left",($(window).width() - div.width())/2);
			border.css("top",div.offset().top - b/2 + 2);
			border.css("left",div.offset().left - b/2 + 2);
			this.bg = bg;
			this.border = border;
			this.div = div;
		},
		destroy: function() {
			this.bg.remove();
			this.border.remove();
			this.div.remove();
		}
	};
	
	$.extend({loadData: function (url,data,fun,p) {
		var wl = new WaitLayer("ÇëµÈ´ý...");
		params = {
			type:'POST',
			url:url,
			data:data,
			error:function(req,status,err) {
				alert(status);
				document.write(req.responseText);
			},
			success:function(json){
				wl.destroy();
				delete wl;
				if(fun)
					fun(json);
			}
		};
		if(p)
			$.extend(params,p);
		$.ajax(params);
	}});
	
	$.extend({loadJSON: function (url,data,fun,p) {
		param = $.extend({'dataType':'json'},p);
		$.loadData(url,data,fun,param);
	}});
	
	$.extend({loadHTML: function (url,data,fun,p) {
		param = $.extend({'dataType':'html'},p);
		$.loadData(url,data,fun,param);
	}});
	
	$.extend({loadXML: function (url,data,fun,p) {
		param = $.extend({'dataType':'xml'},p);
		$.loadData(url,data,fun,param);
	}});
	
	$.fn.render = function (){
		$(this).find('.rbutton').button();
		$(this).find('.tabs').tabs();
		$(this).find('.tabs a').css("text-decoration","none");
		$(this).find('.tabs a').css("cursor","pointer");
	};
	
	
	function show(title,body,colorClass,stay,win) {
		msg = $('<div class="ui-widget"  style="z-index:99999"></div>');
		msg.css('position','absolute');
		msg.addClass(' ui-corner-all err');
		msg.addClass(colorClass);
		msg.append($('<span class="ui-icon ui-icon-alert" style="float: left; margin-right: 0.3em; text-decoration: none; "></span>'));
		msg.append($('<strong>' + title + '</strong>'));
		msg.append($('<span>' + body + '</span>'));
		msg.appendTo($("body"));
		topw = $(document).width();
		var left = (topw - msg.width())/2;
		msg.css('left',left);
		msg.css('padding','3px');
		msg.css('top',$(document).scrollTop());
		if(!win)
			win = window;
		msg.data('timer',win.setTimeout((function(m){
			return function() {
			win.clearTimeout(m.data('timer'));
				m.removeData('timer');
				m.fadeOut(1500,function(){
					m.remove();
				});
			};
		})(msg),1500));
		
	}

	
	$.showMsg = function(msg,stay) {
		if(stay == null)
			stay == 2000;
		show('ÌáÊ¾£º',msg,"ui-state-highlight",2000);
	};
	
	$.showErr = function(msg,stay) {
		if(stay == null)
			stay == 2000;
		show('´íÎó£º',msg,'ui-state-error',2000);
	};
})(jQuery);


