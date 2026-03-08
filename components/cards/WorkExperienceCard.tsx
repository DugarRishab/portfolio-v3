import React from "react";

interface WorkExperienceCardProps {
  company: string;
  role: string;
  description: string;
  duration: string;
  cardBg: string;
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
  company,
  role,
  description,
  duration,
  cardBg
}) => {
  return (
		<div className="flex-shrink-0 w-[400px] md:w-[400px] h-[400px] glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative group hover:border-purple-500/50 transition-colors duration-500 bg-[#0F0F11]/60 backdrop-blur-xl overflow-hidden">
			<div>
				<h4 className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-wider">
					{company}
				</h4>
				<h3 className="text-3xl font-display font-medium leading-tight mb-6">
					{role}
				</h3>
				<p className="text-gray-400 leading-relaxed text-sm">
					{description}
				</p>
			</div>

			<div className="mt-auto pt-8 border-t border-white/5">
				<span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
					{duration}
				</span>
			</div>

			<img
				src={"../assets/card-bg/card-bg" + cardBg + ".png"}
				alt=""
				className="absolute bottom-0 right-[-50px] w-[50%] opacity-90"
			/>
		</div>
  );
};

export default WorkExperienceCard;
