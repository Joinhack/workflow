package cn.workflow.core;

import org.apache.commons.beanutils.Converter;

public class RefConvert implements Converter{

	@SuppressWarnings("rawtypes")
	public Object convert(Class arg0, Object arg1) {
		return arg1;
	}

}
