package cn.workflow.core;

import java.io.File;
import java.util.UUID;

import cn.workflow.comm.SysConf;

public class BasicFlowSerializeManager implements IFlowSerializeManager {
	public String genFlowInstanceId(String templateId) {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}
	
	public String getFlowInstancePath(String instanceId) {
		String ipath = SysConf.getSysConf().getString("workflow.instance.savepath");
		return ipath + File.separator + instanceId + ".xml";
	}

	public String createFlowInstancePath(String templateId,String version,String instanceId) {
		String ipath = SysConf.getSysConf().getString("workflow.instance.savepath");
		return ipath + File.separator + instanceId + ".xml";
	}

	public String getTemplateFileName(String templateId, String version) {
		return templateId + "-(" + version + ").xml";
	}
}
