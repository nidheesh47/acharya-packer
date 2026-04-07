import { AgentCard } from "./AgentCard";

export function AgentsList({ agents, expandedAgent, onToggleAgent }) {
  return (
    <div className="space-y-4">
      {agents.map((agent, index) => (
        <AgentCard
          key={agent._id || `agent-${index}`}
          agent={agent}
          index={index}
          isExpanded={expandedAgent === (agent._id || `agent-${index}`)}
          onToggle={() => onToggleAgent(expandedAgent === (agent._id || `agent-${index}`) ? null : (agent._id || `agent-${index}`))}
        />
      ))}
    </div>
  );
}