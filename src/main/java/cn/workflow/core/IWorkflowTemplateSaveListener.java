package cn.workflow.core;

import java.util.Map;

public interface IWorkflowTemplateSaveListener {
	public String templateSave(String name,String id,Map<String,String> map);
}
