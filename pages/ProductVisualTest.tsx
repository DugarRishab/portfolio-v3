import React from "react";
import ProductVisual from "../components/shared/ProductVisual";

const ProductVisualTest: React.FC = () => {
	const variants = ["data-flow", "network", "automation", "containers"] as const;

	return (
		<div className="min-h-screen bg-[#0a0a0a] p-8">
			<h1 className="text-3xl font-bold text-white mb-8 text-center">
				ProductVisual Component Test
			</h1>
			<p className="text-gray-400 text-center mb-12">
				Hover over each visual to see the 3D tilt effect and animation speed increase
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{variants.map((variant) => (
					<div
						key={variant}
						className="bg-[#111111] border border-gray-800 rounded-xl p-6"
					>
						<h2 className="text-lg font-semibold text-purple-400 mb-4 text-center capitalize">
							{variant.replace("-", " ")}
						</h2>
						<div className="w-full h-48 flex items-center justify-center">
							<ProductVisual variant={variant} />
						</div>
					</div>
				))}
			</div>

			{/* Size test */}
			<div className="mt-16">
				<h2 className="text-xl font-bold text-white mb-6 text-center">
					Responsive Size Test (120px - 300px)
				</h2>
				<div className="flex flex-wrap justify-center items-end gap-8">
					{[120, 180, 240, 300].map((size) => (
						<div key={size} className="text-center">
							<div
								className="bg-[#111111] border border-gray-800 rounded-lg p-4"
								style={{ width: size, height: size }}
							>
								<ProductVisual variant="containers" />
							</div>
							<span className="text-gray-500 text-sm mt-2 block">{size}px</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductVisualTest;
