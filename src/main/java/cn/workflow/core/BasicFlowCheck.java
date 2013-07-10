package cn.workflow.core;

import java.util.List;

import cn.workflow.exceptions.LogicException;

public class BasicFlowCheck {
	private void checkFuncs(List<IFunc> funcs) {
		for(IFunc func:funcs) {
			if("class".equals(func.getType())) {
				ClassFunc clzFunc = (ClassFunc)func;
				try{
					BasicWorkflowContext.getInstance().getClassBuilder().newInstance(clzFunc.getClzName());
				}catch(Throwable e) {
					throw new LogicException("ÊµÀý»¯Àà" + clzFunc.getClzName() + "Ê§°Ü");
				}
			}
		}
	}
	
	public void checkflow(IFlow flow) {
		List<INode> nodes = flow.getNodes();
		for(INode node:nodes) {
			checkFuncs(node.getPreFuncs());
			checkFuncs(node.getConditionFuncs());
			List<IAction> actions = node.getActions();
			for(IAction action:actions) {
				checkFuncs(action.getFuncs());
			}
		}
	}
}
