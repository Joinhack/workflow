package cn.workflow.core;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.workflow.exceptions.CommException;

public class FlowSerializeManagerFactory {
	
	private static String managerDefaultName = "com.sccl.workflow.core.BasicFlowSerializeManager";
	
	private static Log log = LogFactory.getLog(FlowSerializeManagerFactory.class);
	
	private static IFlowSerializeManager manager = null;
	
	protected static IFlowSerializeManager createFlowSerializeManager() {
		IWorkflowContext context = BasicWorkflowContext.getInstance();
		String managerName = context.getFlowSerializeManagerName();
		if(managerName == null)
			managerName = managerDefaultName;
		IFlowSerializeManager manager = null;
		try {
			manager = context.getClassBuilder().newInstance(managerName);
		} catch (CommException e) {
			log.error(e);
			throw e;
		}
		return manager;
	}
	
	public static IFlowSerializeManager getFlowSerializeManager() {
		if(manager == null)
			manager =  createFlowSerializeManager();
		return manager;
	}
}
