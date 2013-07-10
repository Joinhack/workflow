package cn.workflow.core;

public class EndCommand implements ICommand {
	
	private INode endNode = null;
	
	private INode activeNode = null;
	
	private IFlow flow = null;
	
	public INode getActiveNode() {
		return activeNode;
	}

	public void setActiveNode(INode activeNode) {
		this.activeNode = activeNode;
	}

	public INode getEndNode() {
		return endNode;
	}

	public void setEndNode(INode endNode) {
		this.endNode = endNode;
	}

	public IFlow getFlow() {
		return flow;
	}

	public void setFlow(IFlow flow) {
		this.flow = flow;
	}
	
	private void marshal() {
		IMarshaller marshaler = SerializeFactory.getInstance().
			getIMarshaller();
		marshaler.serialize(flow);
	}

	public void execute() {
		endNode.setStatus(INode.STATUS_ACTIVE);
		activeNode.setStatus(INode.STATUS_FINISH);
		marshal();
	}

	public void rollback() {
		endNode.setStatus(INode.STATUS_UNACTIVE);
		activeNode.setStatus(INode.STATUS_ACTIVE);
		marshal();
	}

}
