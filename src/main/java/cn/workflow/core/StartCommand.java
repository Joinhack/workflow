package cn.workflow.core;

public class StartCommand implements ICommand {
	
	private INode node = null;
	
	private IFlow flow = null;
	
	public IFlow getFlow() {
		return flow;
	}

	public void setFlow(IFlow flow) {
		this.flow = flow;
	}

	public INode getNode() {
		return node;
	}

	public void setNode(INode node) {
		this.node = node;
	}

	public void execute() {
		node.setStatus(INode.STATUS_ACTIVE);
		IMarshaller marshaler = SerializeFactory.getInstance().getIMarshaller();
		marshaler.serialize(flow);
	}

	public void rollback() {
		
	}

}
