import { AgentCard } from "./AgentCard";

export function AgentsGridView({ agents, expandedAgent, onToggleAgent }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent, index) => (
        <AgentCard 
          key={agent.agent_id || index}
          agent={agent}
          isExpanded={expandedAgent === agent.agent_id}
          onToggle={() => onToggleAgent(expandedAgent === agent.agent_id ? null : agent.agent_id)}
        />
      ))}
    </div>
  );
}