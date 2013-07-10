package cn.workflow.core;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.workflow.comm.SysConf;
import cn.workflow.exceptions.SystemException;

public class BasicWorkflow implements Workflow {

	private static final long serialVersionUID = -7000469782255977764L;

	private static Log log = LogFactory.getLog(BasicWorkflow.class);
	
	private IFlowSerializeManager manager = FlowSerializeManagerFactory.getFlowSerializeManager();
	
	private IFlow flow = null;
	
	private List<ICommand> processCommand = new ArrayList<ICommand>();
	
	private List<IProp> magicNodeProp = new ArrayList<IProp>();
	
	public void back() {
		back(true);
	}
	
	public void back(ICallParam callParam) {
		back(true,callParam);
	}
	
	public void back(boolean b) {
		back(b,null);
	}
	
	public void back(boolean doLeave,ICallParam callParam) {
		back(true,doLeave,callParam);
	}
	
	public void back(boolean doPre,boolean doLeave,ICallParam callParam) {
		INode active = getActiveNode();
		if("start".equals(active.getType()))
			return;
		if(active.getFromNodeId() == null || "".equals(active.getFromNodeId()))
			return;
		INode node = getNode(active.getFromNodeId());
		if(node == null)
			return;
		BasicExecuteContext ctx = new BasicExecuteContext();
		ctx.add2CallParam((flow2CallParam(flow)));
		ctx.add2CallParam(callParams(callParam));
		if(doLeave) {
			processNode(ctx,active,active.getConditionFuncs());
		}
		if(doPre) {
			resetMagicNodeProps(node);
			processNode(ctx,node,node.getPreFuncs());
		}
		UnactiveCommand command = new UnactiveCommand();
		command.setActiveNode(node);
		command.setUnactiveNode(active);
		command.setFlow(flow);
		invoke(command);
	}
	
	public BasicWorkflow() {
	}
	
	public BasicWorkflow(String insId) {
		init(insId);
	}
	
	public void go2Node(String nodeId,ICallParam callParam) {
		go2Node(true,true,nodeId,callParam);
	}
	
	public void go2Node(boolean doPre,boolean doLeave,String nodeId,ICallParam callParam) {
		INode active = getActiveNode();
		INode node = getNode(nodeId);
		if(node == null) {
			throw new SystemException("invalid nodeId");
		}
		BasicExecuteContext ctx = new BasicExecuteContext();
		ctx.add2CallParam((flow2CallParam(flow)));
		ctx.add2CallParam(callParams(callParam));
		if(doLeave) {
			processNode(ctx,active,active.getConditionFuncs());
		}
		if(doPre) {
			resetMagicNodeProps(node);
			processNode(ctx,node,node.getPreFuncs());
		}
		UnactiveCommand command = new UnactiveCommand();
		command.setActiveNode(node);
		command.setUnactiveNode(active);
		command.setFlow(flow);
		invoke(command);
	}

	public void go2Node(String nodeId) {
		go2Node(nodeId,null);
	}

	public void init(String instanceId) {
		seiralizeFromInstance(instanceId);
	}

	public void next() {
		next(null,null);
	}
	
	public void next(ICallParam callParam) {
		next(null,callParam);
	}
	
	public void next(String condition) {
		next(condition,null);
	}
	
	public void next(String condition,ICallParam callParam) {
		INode node = getActiveNode();
		if(node == null) {
			String err = "no active node";
			log.error(err);
			throw new SystemException(err);
		}
		doAction(node,condition,callParam);
	}
	
	private String newInstanceid(String templateId) {
		return manager.genFlowInstanceId(templateId);
	}
	
	public INode getNode(String nodeId) {
		Iterator<INode> iter = flow.getNodes().iterator();
		while(iter.hasNext()) {
			INode node = iter.next();
			if(nodeId.equals(node.getId()))
				return node;
		}
		return null;
	}
	
	private INode getStart() {
		return getNodeByType("start");
	}
	
	private INode getNodeByType(String type) {
		if(type == null)
			return null;
		Iterator<INode> iter = flow.getNodes().iterator();
		while(iter.hasNext()) {
			INode node = iter.next();
			if(type.equals(node.getType())) {
				return node;
			}
		}
		return null;
	}
	
	private INode getEnd() {
		return getNodeByType("end");
	}
	
	public INode getActiveNode() {
		Iterator<INode> iter = flow.getNodes().iterator();
		while(iter.hasNext()) {
			INode node = iter.next();
			if(INode.STATUS_ACTIVE.equals(node.getStatus())) {
				return node;
			}
		}
		return null;
	}
	
	private void seiralizeFromInstance(String id) {
		IUnmarshaller unmarshaller = SerializeFactory.getInstance().getIUnmarshaler();
		flow = unmarshaller.serializeFromInstance(id);
	}
	
	private void seiralizeFromTemplate(String id,String version) {
		String path = SysConf.getSysConf().getString("workflow.template.savepath");
		path +=  File.separator + manager.getTemplateFileName(id, version);
		File file = new File(path);
		if(!file.exists()) {
			String info = "template[" + id + "] not exist!";
			log.error(info);
			throw new SystemException(info);
		}
		IUnmarshaller unmarshaller = SerializeFactory.getInstance().getIUnmarshaler();
		flow = unmarshaller.serializeFromTemplate(path);
	}
	
	private Object processNode(IExecuteContext ctx,INode node,List<IFunc> funcs) {
		ctx.add2CallParam(node2CallParam(node));
		ctx.setNodePropParam(props2CallParam(node.getProps()));
		return processFuncs(ctx,funcs);
	}
	
	private String processAction(IExecuteContext ctx,IAction action) {
		ctx.add2CallParam(props2CallParam(action.getProps()));
		Object obj = processFuncs(ctx,action.getFuncs());
		if(obj == null)
			return "";
		return obj.toString();
	}

	public String start(String id,String version) {
		return start(id,version,null,null);
	}
	
	public String start(String id,String version,String cond) {
		return start(id,version,cond,null);
	}

	public String start(String id,String version,ICallParam callParam) {
		return start(id,version,null,callParam);
	}
	
	public String start(String id,String version,String nodeId,ICallParam callParam) {
		String instanceId = newInstanceid(id);
		seiralizeFromTemplate(id,version);
		flow.setId(instanceId);
		flow.setTemplateVersion(version);
		INode node = null;
		if(nodeId != null) {
			node = getNode(nodeId);
		} else {
			node = getStart();
		}
		if(node == null)
			throw new SystemException("获取取不了启动节点");
		manager.createFlowInstancePath(id,version ,instanceId);
		resetMagicNodeProps(node);
		BasicExecuteContext ctx = new BasicExecuteContext();
		ctx.add2CallParam((flow2CallParam(flow)));
		ctx.add2CallParam(callParams(callParam));
		processNode(ctx,node,node.getPreFuncs());
		StartCommand command = new StartCommand();
		command.setFlow(flow);
		command.setNode(node);
		invoke(command);
		return instanceId;
	}
	
	private void invoke(ICommand command) {
		command.execute();
		processCommand.add(command);
	}

	public String doAction(String nodeId) {
		INode node = getNode(nodeId);
		return doAction(node);
	}
	
	public String doAction(INode node) {
		return doAction(node,null,null);
	}
	
	protected IAction nextAction(INode node,String condition) {
		List<IAction> actions = node.getActions();
		IAction act = null;
		if(actions == null)
			throw new SystemException("this node has not action");
		if(actions.size() == 1)
			act = actions.get(0);
		else {
			IAction defaultAction = null;
			for(IAction action : actions) {
				if(action.getCondition() == null || "".equals(action.getCondition())) {
					defaultAction = action;
				}
				if(condition != null && condition.equals(action.getCondition())) {
					act = action;
					break;
				}
			}
			if(act == null)
				act = defaultAction;
		}
		return act;
	}
	
	protected Object processFuncs(IExecuteContext ctx,List<IFunc> list) {
		Object obj = null;
		for(IFunc func : list) {
			IExecute execute = new BasicExecute();
			ctx.setFunc(func);
			obj = execute.execute(ctx);
		}
		return obj;
	}
	
	private ICallParam flow2CallParam(IFlow flow) {
		ICallParam param = CallParamFactory.getInstance().createICallParam();
		param.addParam("workflowId", flow.getId());
		param.addParam("workflowTemplateId", flow.getTemplateId());
		param.addParam("workflowTemplateVersion", flow.getTemplateVersion());
		param.addParam("workflowName", flow.getName());
		param.addParam("workflowDescription", flow.getDescription());
		param.addParams(props2CallParam(flow.getProps()));
		return param;
	}
	
	private ICallParam node2CallParam(INode node) {
		ICallParam param = CallParamFactory.getInstance().createICallParam();
		param.addParam("node", node);
		param.addParam("nodeId", node.getId());
		param.addParam("nodeName", node.getName());
		param.addParam("nodeType", node.getType());
		param.addParam("nodeDescription", node.getDescription());
		return param;
	}
	
	private ICallParam callParams(ICallParam callParam) {
		ICallParam param = CallParamFactory.getInstance().createICallParam();
		if(callParam == null)
			return param;
		param.addParam("callParam", callParam);
		Iterator<String> iter = callParam.keyIterator();
		while(iter.hasNext()) {
			String n = iter.next();
			if(n == null || n.length() == 0)
				continue;
			String name = n.substring(0,1).toUpperCase();
			if(n.length() > 1) {
				name += n.substring(1,n.length());
			}
			param.addParam("param" + name, callParam.getParam(n));
		}
		return param;
	}
	
	private ICallParam props2CallParam(List<IProp> list) {
		ICallParam param = CallParamFactory.getInstance().createICallParam();
		for(IProp prop: list) {
			String n = prop.getName();
			if(n == null || n.length() == 0)
				continue;
			String name = n.substring(0,1).toUpperCase();
			if(n.length() > 1) {
				name += n.substring(1,n.length());
			}
			param.addParam("prop" + name, prop);
		}
		return param;
	}
	
	public String doAction(INode node,String condition,ICallParam callParam) {
		BasicExecuteContext ctx = new BasicExecuteContext();
		ctx.add2CallParam((flow2CallParam(flow)));
		ctx.add2CallParam(callParams(callParam));
		Object obj = processNode(ctx,node,node.getConditionFuncs());
		if("end".equals(node.getType())) {
			log.debug("this is end node can't be have nextNode");
			return "";
		}
		if(condition == null && obj != null)
			condition = obj.toString();
		IAction action = nextAction(node,condition);
		if(action == null) {
			throw new SystemException("no active");
		}
		INode nextNode = getNode(action.getToNodeId());
		if(nextNode == null) {
			String err = "can't match next node currentNode(" + node.getId() + ")";
			log.error(err);
			throw new SystemException(err);
		}
		resetMagicNodeProps(nextNode);
		nextNode.setFromNodeId(node.getId());
		
		//if return stop ,will not go2 next node,just need marshall
		String flags = processAction(ctx,action);
		if("back".equals(flags)) {
			obj = processNode(ctx,node,node.getPreFuncs());
			MarshallCommand command = new MarshallCommand();
			command.setFlow(flow);
			invoke(command);
		} else {
			processNode(ctx,nextNode,nextNode.getPreFuncs());
			NextCommand command = new NextCommand();
			command.setCurrentNode(node);
			command.setNextNode(nextNode);
			command.setFlow(flow);
			invoke(command);
		}
		return obj != null ?obj.toString(): "";
	}
	
	public String doAction(String nodeId,String condition) {
		INode node = getNode(nodeId);
		return doAction(node,condition,null);
	}
	
	public void rollback() {
		Iterator<ICommand> command = new Iterator<ICommand>() {
			int index = processCommand.size() - 1;
			public boolean hasNext() {
				return index >= 0;
			}

			public ICommand next() {
				return processCommand.get(index--);
			}

			public void remove() {
			}
		};
		while(command.hasNext()) {
			command.next().rollback();
		}
		processCommand.clear();
	}
	
	public void end() {
		end(null);
	}

	public void end(ICallParam param) {
		end(null,null);
	}

	public void end(String endId, ICallParam param) {
		end(true,null,null);
	}

	public void end(boolean b, String endId, ICallParam param) {
		INode endNode = null;
		if(endId != null) {
			endNode = getNode(endId);
		} else {
			endNode = getEnd();
		}
		if(endNode == null) {
			throw new SystemException("获取取不了结束节点");
		}
		INode activeNode =  getActiveNode();
		if(activeNode == null) {
			throw new SystemException("获取取不了当前活动节点");
		}
		if(b) {
			BasicExecuteContext ctx = new BasicExecuteContext();
			ctx.add2CallParam((flow2CallParam(flow)));
			ctx.add2CallParam(callParams(param));
			processNode(ctx,endNode,endNode.getPreFuncs());
		}
		EndCommand command = new EndCommand();
		command.setActiveNode(activeNode);
		command.setEndNode(endNode);
		command.setFlow(flow);
		invoke(command);
	}
	
	public void resetNodeProp(INode node, IProp prop) {
		List<IProp> list = node.getProps();
		for(IProp nodeProp : list) {
			if(nodeProp.getName() != null  && prop.getName() != null) {
				try {
					if(prop.getName().equals(nodeProp.getName())) {
						BeanUtils.getInstance().copyProperty(nodeProp, "value", prop);
						BeanUtils.getInstance().copyProperty(nodeProp, "displayValue", prop);
					}
				} catch (Exception e) {
					log.error(e);
					throw new SystemException("property copy error");
				}
			}
		}
	}

	public void resetNodeProp(String nodeId, IProp prop) {
		INode node = getNode(nodeId);
		if(node == null) {
			throw new SystemException("can't find node");
		}
		resetNodeProp(node,prop);
	}

	public void resetNodeProp(String nodeId, String propName, String propValue,String displayValue) {
		Prop prop = new Prop();
		prop.setName(propName);
		prop.setName(propValue);
		prop.setDisplayValue(displayValue);
		resetNodeProp(nodeId,prop);
	}
	
	public void resetMagicNodeProp(String propName, String propValue,String displayValue) {
		Prop prop = new Prop();
		prop.setName(propName);
		prop.setValue(propValue);
		prop.setDisplayValue(displayValue);
		magicNodeProp.add(prop);
	}
	
	private void resetMagicNodeProps(INode node) {
		if(magicNodeProp.size() > 0) {
			for(IProp prop : magicNodeProp) {
				resetNodeProp(node, prop);
			}
			magicNodeProp.clear();
		}
	}
	
	public void addNodeProp(String nodeId,Integer index,IProp prop) {
		INode node = getNode(nodeId);
		if(node == null)
			throw new SystemException("can't find node");
		if(prop.getName() == null)
			return;
		if(index < 0 || index > node.getProps().size() )
			node.getProps().add(prop);
		else
			node.getProps().add(index,prop);
	}

	public void addNodeProp(String nodeId, IProp prop) {
		addNodeProp(nodeId, -1,prop);
	}
	
	private void removeNodePropBy(String nodeId, String val,boolean nameOrType) {
		INode node = getNode(nodeId);
		if(node == null)
			throw new SystemException("can't find node");
		List<IProp> props = node.getProps();
		Iterator<IProp> iter = props.iterator();
		
		while(iter.hasNext()) {
			String nameOrTypeVal = null;
			if(nameOrType)
				nameOrTypeVal = iter.next().getName();
			else
				nameOrTypeVal = iter.next().getType();
			if(val.equals(nameOrTypeVal))
				iter.remove();
			
		}
	}

	public void removeNodePropByName(String nodeId, String name) {
		removeNodePropBy(nodeId,name,true);
	}

	public void removeNodePropByPropType(String nodeId, String propType) {
		removeNodePropBy(nodeId,propType,true);
	}
	
}

