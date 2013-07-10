package cn.workflow.core;

import java.lang.reflect.Method;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.workflow.exceptions.LogicException;

public class BasicExecute implements IExecute {
	
	private static Log log = LogFactory.getLog(BasicClassBuilder.class);
	
	public Object execute(IExecuteContext ctx) {
		IFunc ifunc = ctx.getFunc();
		if(IFunc.FUNCTYPE_CLASSFUNC.equals(ifunc.getType())) {
			ClassFunc func = (ClassFunc)ifunc;
			ICallParam params = ctx.getCallParam();
			String clzName = func.getClzName();
			Object obj = ctx.getInstanceFromCache(clzName);
			if(obj == null) {
				IClassBuilder builder = ClassBuilderFactory.getInstance().getClazzBuilder();
				obj = builder.newInstance(clzName);
				ctx.addInstance2Cache(clzName, obj);
			}
			BeanUtils.getInstance().populate(obj,params);
			BeanUtils.getInstance().populate(obj,ctx.getNodePropParam());
			BeanUtils.getInstance().populate(obj,ctx.getExecuteResult());
			String methodName = func.getMethodName();
			Object retVal = null;
			try {
				Method method = obj.getClass().getMethod(methodName, new Class<?>[0]);
				retVal = method.invoke(obj, new Object[0]);
				ctx.getExecuteResult().addParams(BeanUtils.getInstance().propertyDescribe(obj));
			} catch (Exception e) {
				log.error(e);
				throw new LogicException(e);
			}
			return retVal;
		}
		return null;
	}
	
}
