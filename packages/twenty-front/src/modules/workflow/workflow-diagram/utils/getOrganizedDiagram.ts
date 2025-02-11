import { WorkflowDiagram } from '@/workflow/workflow-diagram/types/WorkflowDiagram';
import Dagre from '@dagrejs/dagre';

export const getOrganizedDiagram = (
  diagram: WorkflowDiagram,
): WorkflowDiagram => {
  const graph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  graph.setGraph({ rankdir: 'TB' });

  diagram.edges.forEach((edge) => graph.setEdge(edge.source, edge.target));
  diagram.nodes.forEach((node) =>
    graph.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(graph);

  return {
    nodes: diagram.nodes.map((node) => {
      const position = graph.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges: diagram.edges,
  };
};
