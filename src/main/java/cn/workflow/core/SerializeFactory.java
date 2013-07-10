package cn.workflow.core;

import cn.workflow.comm.SysConf;

public class SerializeFactory {
	
	private static SerializeFactory self = null;
	
	private SerializeFactory() {
	}
	
	public static SerializeFactory getInstance() {
		if(self == null) {
			self = new SerializeFactory();
		}
		return self;
	}
	
	public IMarshaller getIMarshaller() {
		String marshallerClassName = SysConf.getSysConf().getString("workflow.MarshallerClassName");
		if(marshallerClassName == null)
			marshallerClassName = Serialize2Xml.class.getName();
		IMarshaller marshaller = null;
		IClassBuilder builder = ClassBuilderFactory.getInstance().getClazzBuilder();
		marshaller = builder.newInstance(marshallerClassName);
		return marshaller;
	}
	
	public IUnmarshaller getIUnmarshaler() {
		String unmarshallerClassName = SysConf.getSysConf().getString("workflow.UnmarshallerClassName");
		if(unmarshallerClassName == null)
			unmarshallerClassName = Serialize2Flow.class.getName();
		IClassBuilder builder = ClassBuilderFactory.getInstance().getClazzBuilder();
		IUnmarshaller unmarshaller = builder.newInstance(unmarshallerClassName);
		return unmarshaller;
	}
}
