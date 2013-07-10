package cn.workflow.core;

public class NextCommand implements ICommand {
	
	private INode currentNode = null;
	
	private INode nextNode = null;
	
	private IFlow flow = null;
	
	public IFlow getFlow() {
		return flow;
	}

	public void setFlow(IFlow flow) {
		this.flow = flow;
	}

	public INode getCurrentNode() {
		return currentNode;
	}

	public void setCurrentNode(INode currentNode) {
		this.currentNode = currentNode;
	}

	public INode getNextNode() {
		return nextNode;
	}

	public void setNextNode(INode nextNode) {
		this.nextNode = nextNode;
	}

	public void execute() {
		currentNode.setStatus(INode.STATUS_FINISH);
		nextNode.setStatus(INode.STATUS_ACTIVE);
		marshal();
	}
	
	private void marshal() {
		IMarshaller marshaler = SerializeFactory.getInstance().
			getIMarshaller();
		marshaler.serialize(flow);
	}

	public void rollback() {
		currentNode.setStatus(INode.STATUS_ACTIVE);
		nextNode.setStatus(INode.STATUS_UNACTIVE);
		marshal();
	}

}
