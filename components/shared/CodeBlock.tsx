import React, { useState } from "react";
import { motion } from "framer-motion";

interface CodeBlockProps {
	code: string;
	language?: string;
	filename?: string;
	showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
	code,
	language = "typescript",
	filename,
	showLineNumbers = true,
}) => {
	const [copied, setCopied] = useState(false);
	const lines = code.trim().split("\n");

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0f] my-6"
		>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
				<div className="flex items-center gap-3">
					<div className="flex gap-1.5">
						<div className="w-3 h-3 rounded-full bg-red-500/60" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/60" />
						<div className="w-3 h-3 rounded-full bg-green-500/60" />
					</div>
					{filename && (
						<span className="text-xs text-gray-500 font-mono">
							{filename}
						</span>
					)}
				</div>
				<div className="flex items-center gap-2">
					<span className="text-xs text-gray-600 font-mono uppercase">
						{language}
					</span>
					<button
						onClick={handleCopy}
						className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
						title="Copy code"
					>
						<span className="material-icons-outlined text-sm text-gray-500 hover:text-white">
							{copied ? "check" : "content_copy"}
						</span>
					</button>
				</div>
			</div>

			{/* Code */}
			<div className="overflow-x-auto">
				<pre className="p-4 text-sm font-mono leading-relaxed">
					{lines.map((line, i) => (
						<div key={i} className="flex">
							{showLineNumbers && (
								<span className="select-none text-gray-600 w-8 text-right pr-4 flex-shrink-0">
									{i + 1}
								</span>
							)}
							<code className="text-gray-300 flex-1">
								{highlightSyntax(line, language)}
							</code>
						</div>
					))}
				</pre>
			</div>
		</motion.div>
	);
};

const highlightSyntax = (line: string, language: string): React.ReactNode => {
	const keywords = [
		"const",
		"let",
		"var",
		"function",
		"async",
		"await",
		"return",
		"if",
		"else",
		"for",
		"while",
		"import",
		"export",
		"from",
		"class",
		"interface",
		"type",
		"extends",
		"implements",
		"new",
		"try",
		"catch",
		"throw",
		"def",
		"self",
		"None",
		"True",
		"False",
	];

	const parts: React.ReactNode[] = [];
	let remaining = line;
	let key = 0;

	// Simple syntax highlighting
	while (remaining.length > 0) {
		// Comments
		if (remaining.startsWith("//") || remaining.startsWith("#")) {
			parts.push(
				<span key={key++} className="text-gray-500 italic">
					{remaining}
				</span>
			);
			break;
		}

		// Strings
		const stringMatch = remaining.match(/^(['"`]).*?\1/);
		if (stringMatch) {
			parts.push(
				<span key={key++} className="text-green-400">
					{stringMatch[0]}
				</span>
			);
			remaining = remaining.slice(stringMatch[0].length);
			continue;
		}

		// Keywords
		const keywordMatch = remaining.match(
			new RegExp(`^\\b(${keywords.join("|")})\\b`)
		);
		if (keywordMatch) {
			parts.push(
				<span key={key++} className="text-purple-400">
					{keywordMatch[0]}
				</span>
			);
			remaining = remaining.slice(keywordMatch[0].length);
			continue;
		}

		// Numbers
		const numberMatch = remaining.match(/^\b\d+\.?\d*\b/);
		if (numberMatch) {
			parts.push(
				<span key={key++} className="text-orange-400">
					{numberMatch[0]}
				</span>
			);
			remaining = remaining.slice(numberMatch[0].length);
			continue;
		}

		// Function calls
		const funcMatch = remaining.match(/^(\w+)(?=\()/);
		if (funcMatch) {
			parts.push(
				<span key={key++} className="text-blue-400">
					{funcMatch[0]}
				</span>
			);
			remaining = remaining.slice(funcMatch[0].length);
			continue;
		}

		// Default: single character
		parts.push(remaining[0]);
		remaining = remaining.slice(1);
	}

	return parts;
};

export default CodeBlock;
