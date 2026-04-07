import { AgentListRow } from "./AgentListRow";

export function AgentsListView({ agents, expandedAgent, onToggleAgent }) {
  return (
    <div className="space-y-4">
      {agents.map((agent, index) => (
        <AgentListRow 
          key={agent.agent_id || index}
          agent={agent}
          isExpanded={expandedAgent === agent.agent_id}
          onToggle={() => onToggleAgent(expandedAgent === agent.agent_id ? null : agent.agent_id)}
        />
      ))}
    </div>
  );
}