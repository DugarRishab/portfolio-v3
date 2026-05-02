import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
	chart: string;
	className?: string;
}

// Custom theme configuration matching website colors
const customTheme = {
	primaryColor: "#6366f1",
	primaryTextColor: "#ffffff",
	primaryBorderColor: "#818cf8",
	lineColor: "#a78bfa",
	secondaryColor: "#312e81",
	tertiaryColor: "#1e1b4b",
	background: "#1a1a2e",
	mainBkg: "#312e81",
	secondBkg: "#4c1d95",
	nodeBorder: "#818cf8",
	clusterBkg: "#1e1b4b",
	clusterBorder: "#6366f1",
	titleColor: "#ffffff",
	edgeLabelBackground: "#1a1a2e",
	nodeTextColor: "#ffffff",
};

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
	chart,
	className = "",
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [svg, setSvg] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [uniqueId] = useState(
		() => `mermaid-${Math.random().toString(36).substr(2, 9)}`,
	);

	useEffect(() => {
		mermaid.initialize({
			startOnLoad: false,
			securityLevel: "loose",
			theme: "base",
			themeVariables: {
				...customTheme,
				// Additional sequence diagram specific colors
				actorBorder: "#818cf8",
				actorBkg: "#312e81",
				actorTextColor: "#ffffff",
				actorLineColor: "#a78bfa",
				signalColor: "#ffffff",
				signalTextColor: "#ffffff",
				labelBoxBkgColor: "#4c1d95",
				labelBoxBorderColor: "#818cf8",
				labelTextColor: "#ffffff",
				loopTextColor: "#ffffff",
				noteBorderColor: "#818cf8",
				noteBkgColor: "#1e1b4b",
				noteTextColor: "#ffffff",
				activationBorderColor: "#818cf8",
				activationBkgColor: "#312e81",
				// Flowchart specific
				nodeBorder: "#818cf8",
				clusterBkg: "#1e1b4b",
				clusterBorder: "#6366f1",
				defaultLinkColor: "#a78bfa",
				titleColor: "#ffffff",
				edgeLabelBackground: "#1a1a2e",
				nodeTextColor: "#ffffff",
			},
			flowchart: {
				useMaxWidth: true,
				htmlLabels: true,
				curve: "basis",
				diagramPadding: 20,
				nodeSpacing: 50,
				rankSpacing: 50,
			},
			sequence: {
				diagramMarginX: 50,
				diagramMarginY: 10,
				actorMargin: 50,
				width: 150,
				height: 65,
				boxMargin: 10,
				boxTextMargin: 5,
				noteMargin: 10,
				messageMargin: 35,
				mirrorActors: true,
				bottomMarginAdj: 1,
				useMaxWidth: true,
				rightAngles: false,
				showSequenceNumbers: false,
			},
			gantt: {
				titleTopMargin: 25,
				barHeight: 20,
				barGap: 4,
				topPadding: 50,
				leftPadding: 75,
				gridLineStartPadding: 35,
				fontSize: 11,
				numberSectionStyles: 4,
				axisFormat: "%Y-%m-%d",
			},
		});
	}, []);

	useEffect(() => {
		if (ref.current && chart) {
			mermaid
				.render(uniqueId, chart)
				.then(({ svg: renderedSvg }) => {
					setSvg(renderedSvg);
					setError(null);
				})
				.catch((err) => {
					setError(
						`Failed to render diagram: ${err.message || "Unknown error"}`,
					);
					console.error("Mermaid render error:", err);
				});
		}
	}, [chart, uniqueId]);

	if (error) {
		return (
			<div
				className={`p-4 bg-red-500/10 border border-red-500/30 rounded-lg ${className}`}
			>
				<p className="text-red-400 text-sm font-mono">{error}</p>
			</div>
		);
	}

	return (
		<div
			ref={ref}
			className={`mermaid-diagram overflow-x-auto ${className}`}
			dangerouslySetInnerHTML={{ __html: svg }}
			style={
				{
					"--mermaid-font-family":
						'"JetBrains Mono", "Fira Code", monospace',
					"--mermaid-primary-color": "#6366f1",
					"--mermaid-primary-text": "#ffffff",
					"--mermaid-primary-border": "#818cf8",
					"--mermaid-line-color": "#a78bfa",
					"--mermaid-secondary-color": "#312e81",
					"--mermaid-tertiary-color": "#1e1b4b",
					"--mermaid-background": "#1a1a2e",
				} as React.CSSProperties
			}
		/>
	);
};

export default MermaidDiagram;
