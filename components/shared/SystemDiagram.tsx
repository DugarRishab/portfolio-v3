import React from "react";
import { motion } from "framer-motion";

interface SystemNode {
	id: string;
	label: string;
	icon: string;
	type: "input" | "process" | "output" | "storage" | "api";
}

interface SystemConnection {
	from: string;
	to: string;
	label?: string;
}

interface SystemDiagramProps {
	title: string;
	nodes: SystemNode[];
	connections: SystemConnection[];
	className?: string;
}

const nodeColors = {
	input: { bg: "bg-blue-500/20", border: "border-blue-500/50", text: "text-blue-400" },
	process: { bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-400" },
	output: { bg: "bg-green-500/20", border: "border-green-500/50", text: "text-green-400" },
	storage: { bg: "bg-orange-500/20", border: "border-orange-500/50", text: "text-orange-400" },
	api: { bg: "bg-cyan-500/20", border: "border-cyan-500/50", text: "text-cyan-400" },
};

const SystemDiagram: React.FC<SystemDiagramProps> = ({
	title,
	nodes,
	connections,
	className = "",
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			className={`glass-card rounded-2xl p-6 border border-white/10 ${className}`}
		>
			{/* Title */}
			<div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
				<span className="material-icons-outlined text-purple-400">
					account_tree
				</span>
				<h4 className="text-lg font-display font-medium">{title}</h4>
			</div>

			{/* Diagram */}
			<div className="relative">
				{/* Nodes Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{nodes.map((node, index) => {
						const colors = nodeColors[node.type];
						return (
							<motion.div
								key={node.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								whileHover={{ scale: 1.05, y: -5 }}
								className={`relative p-4 rounded-xl ${colors.bg} border ${colors.border} cursor-default group`}
							>
								{/* Glow effect on hover */}
								<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
								
								<div className="relative z-10 flex flex-col items-center text-center">
									<span className={`material-icons-outlined text-2xl mb-2 ${colors.text}`}>
										{node.icon}
									</span>
									<span className="text-sm font-medium text-white">
										{node.label}
									</span>
									<span className={`text-xs mt-1 uppercase tracking-wider ${colors.text}`}>
										{node.type}
									</span>
								</div>

								{/* Pulse animation */}
								<motion.div
									className={`absolute -inset-1 rounded-xl ${colors.border} opacity-0`}
									animate={{
										opacity: [0, 0.5, 0],
										scale: [1, 1.05, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										delay: index * 0.3,
									}}
								/>
							</motion.div>
						);
					})}
				</div>

				{/* Connection Lines (simplified visual) */}
				<div className="mt-4 flex flex-wrap gap-2">
					{connections.map((conn, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.5 + index * 0.1 }}
							className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs"
						>
							<span className="text-gray-400">{conn.from}</span>
							<span className="material-icons-outlined text-purple-400 text-sm">
								arrow_forward
							</span>
							<span className="text-white">{conn.to}</span>
							{conn.label && (
								<span className="text-gray-500 ml-1">({conn.label})</span>
							)}
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

// Pre-built system diagrams for common architectures
export const AutomationSystemDiagram: React.FC = () => (
	<SystemDiagram
		title="Automation Pipeline Architecture"
		nodes={[
			{ id: "trigger", label: "Webhook Trigger", icon: "webhook", type: "input" },
			{ id: "queue", label: "Message Queue", icon: "queue", type: "process" },
			{ id: "worker", label: "Worker Pool", icon: "memory", type: "process" },
			{ id: "ai", label: "AI Processing", icon: "psychology", type: "process" },
			{ id: "db", label: "PostgreSQL", icon: "storage", type: "storage" },
			{ id: "cache", label: "Redis Cache", icon: "cached", type: "storage" },
			{ id: "api", label: "REST API", icon: "api", type: "api" },
			{ id: "notify", label: "Notifications", icon: "notifications", type: "output" },
		]}
		connections={[
			{ from: "Trigger", to: "Queue", label: "async" },
			{ from: "Queue", to: "Worker", label: "process" },
			{ from: "Worker", to: "AI", label: "analyze" },
			{ from: "AI", to: "DB", label: "persist" },
			{ from: "API", to: "Cache", label: "read" },
		]}
	/>
);

export const PaymentSystemDiagram: React.FC = () => (
	<SystemDiagram
		title="Payment Processing Flow"
		nodes={[
			{ id: "client", label: "Client App", icon: "phone_android", type: "input" },
			{ id: "gateway", label: "Payment Gateway", icon: "payment", type: "api" },
			{ id: "validate", label: "Validation", icon: "verified", type: "process" },
			{ id: "process", label: "Transaction", icon: "receipt_long", type: "process" },
			{ id: "ledger", label: "Ledger DB", icon: "account_balance", type: "storage" },
			{ id: "webhook", label: "Webhook Handler", icon: "webhook", type: "process" },
			{ id: "notify", label: "User Notify", icon: "email", type: "output" },
		]}
		connections={[
			{ from: "Client", to: "Gateway", label: "initiate" },
			{ from: "Gateway", to: "Validate", label: "verify" },
			{ from: "Validate", to: "Process", label: "execute" },
			{ from: "Process", to: "Ledger", label: "record" },
			{ from: "Webhook", to: "Notify", label: "confirm" },
		]}
	/>
);

export const MicroservicesDiagram: React.FC = () => (
	<SystemDiagram
		title="Microservices Architecture"
		nodes={[
			{ id: "gateway", label: "API Gateway", icon: "router", type: "api" },
			{ id: "auth", label: "Auth Service", icon: "lock", type: "process" },
			{ id: "user", label: "User Service", icon: "person", type: "process" },
			{ id: "order", label: "Order Service", icon: "shopping_cart", type: "process" },
			{ id: "notify", label: "Notification", icon: "notifications", type: "output" },
			{ id: "db1", label: "User DB", icon: "storage", type: "storage" },
			{ id: "db2", label: "Order DB", icon: "storage", type: "storage" },
			{ id: "mq", label: "Message Bus", icon: "hub", type: "process" },
		]}
		connections={[
			{ from: "Gateway", to: "Auth", label: "verify" },
			{ from: "Gateway", to: "Services", label: "route" },
			{ from: "Services", to: "MQ", label: "events" },
			{ from: "MQ", to: "Notify", label: "dispatch" },
		]}
	/>
);

export default SystemDiagram;
