package cn.workflow.core;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.workflow.comm.SysConf;
import cn.workflow.exceptions.SystemException;

public class WorkflowFactory {
	
	private static WorkflowFactory self = null;
	
	private static Log log = LogFactory.getLog(WorkflowFactory.class);
	
	private static String workflowClzName = null;
	
	private WorkflowFactory() {
	}
	
	public static void setWorkflowClzName(String clzName) {
		try {
			ClassUtils.loadClass(clzName).newInstance();
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		}
		workflowClzName = clzName;
	}
	
	public Workflow createWorkflow(String workflowId) {
		Workflow workflow = createWorkflow();
		workflow.init(workflowId);
		return workflow;
	}
	
	public Workflow createWorkflow() {
		Workflow workflow = null;
		try {
			workflow = (Workflow) BasicWorkflowContext.getInstance().getClassBuilder().newInstance(workflowClzName);
		} catch (Exception e) {
			log.error(e);
			throw new SystemException(e);
		}
		return workflow;
	}
	
	public static WorkflowFactory getInstance() {
		if(self == null) {
			self = new WorkflowFactory();
			workflowClzName = SysConf.getSysConf().getString("workflow.workflowClassName");
			if(workflowClzName == null || "".equals(workflowClzName))
				workflowClzName = "cn.workflow.core.BasicWorkflow";
		}
		return self;
	}
}
