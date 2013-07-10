package cn.workflow.core;

public class UnactiveCommand implements ICommand {
	
	private INode activeNode = null;
	
	private INode unactiveNode = null;
	
	private IFlow flow = null;

	public INode getActiveNode() {
		return activeNode;
	}

	public void setActiveNode(INode activeNode) {
		this.activeNode = activeNode;
	}

	public INode getUnactiveNode() {
		return unactiveNode;
	}

	public void setUnactiveNode(INode unactiveNode) {
		this.unactiveNode = unactiveNode;
	}

	public IFlow getFlow() {
		return flow;
	}

	public void setFlow(IFlow flow) {
		this.flow = flow;
	}

	public void execute() {
		activeNode.setStatus(INode.STATUS_ACTIVE);
		unactiveNode.setStatus(INode.STATUS_UNACTIVE);
		marshal();
	}
	
	private void marshal() {
		IMarshaller marshaler = SerializeFactory.getInstance().
			getIMarshaller();
		marshaler.serialize(flow);
	}
	
	public void rollback() {
		activeNode.setStatus(INode.STATUS_UNACTIVE);
		unactiveNode.setStatus(INode.STATUS_ACTIVE);
		marshal();
	}
	
}
