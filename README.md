workflow

![ScreenShot](http://h.hiphotos.bdimg.com/album/pic/item/b3119313b07eca80aa019b76902397dda144831f.jpg)

easy to extends
```javascript
function registerUserIdsPropType() {
        o = {
            varName:'users',
            name:'用户',
            value:'users',
            events : {
                'load': function() {
                    $(this).attr("readonly","readonly");
                },
                'click': function(e) {
                    var idsStr = $(e.data).val();
                    retval = window.showModalDialog("/workgroupext/tree.do?users="+idsStr,"userChoose","dialogWidth=500px,;dialogHeight=600px;center:yes");
                    nomalRetValProcess(retval,this,e.data);
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
    registerUserIdsPropType();
```
