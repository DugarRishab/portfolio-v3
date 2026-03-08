import { useEffect } from "react";

export const useMouseAnimation = () => {
	useEffect(() => {
		let mousex = 0;
		let mousey = 0;
		let xp = 0;
		let yp = 0;

		const mouseCircle = document.querySelector(".circle") as HTMLElement;
		const mouseBgCircle = document.querySelector(
			".bg-circle",
		) as HTMLElement;
		const mouseHoverText = document.querySelectorAll(".mouseHover");

		if (!mouseCircle || !mouseBgCircle) {
			console.warn("Mouse animation elements not found");
			return;
		}

		// Track mouse position
		const handleMouseMove = (e: MouseEvent) => {
			mousex = e.pageX - 20;
			mousey = e.pageY - 20;

			const target = e.target as HTMLElement;
			const computed = window.getComputedStyle(target)["cursor"];

			if (computed === "pointer") {
				mouseBgCircle.style.opacity = "0%";
				mouseCircle.style.transform = "scale(2)";
			} else {
				mouseBgCircle.style.opacity = "100%";
				mouseCircle.style.transform = "scale(1)";
			}
		};

		// Handle click animation
		const handleClick = () => {
			mouseBgCircle.style.opacity = "0%";
			mouseCircle.style.transform = "scale(2)";

			setTimeout(() => {
				mouseCircle.style.transform = "scale(1)";
				mouseBgCircle.style.opacity = "100%";
			}, 250);

			setTimeout(() => {
				mouseCircle.style.opacity = "100%";
			}, 500);
		};

		// Animate inner circle (faster)
		const innerCircleInterval = setInterval(() => {
			xp += (mousex - xp) / 6;
			yp += (mousey - yp) / 6;

			mouseCircle.style.left = xp + "px";
			mouseCircle.style.top = yp + "px";
		}, 20);

		// Animate outer circle (slower)
		const outerCircleInterval = setInterval(() => {
			xp += (mousex - xp) / 12;
			yp += (mousey - yp) / 12;
			mouseBgCircle.style.left = xp + "px";
			mouseBgCircle.style.top = yp + "px";
		}, 100);

		// Add hover listeners to mouseHover elements
		mouseHoverText.forEach((element) => {
			element.addEventListener("mouseenter", () => {
				mouseCircle.classList.add("hover");
				mouseBgCircle.classList.add("hover");
			});

			element.addEventListener("mouseleave", () => {
				mouseCircle.classList.remove("hover");
				mouseBgCircle.classList.remove("hover");
			});
		});

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("click", handleClick);
			clearInterval(innerCircleInterval);
			clearInterval(outerCircleInterval);

			mouseHoverText.forEach((element) => {
				element.removeEventListener("mouseenter", () => {});
				element.removeEventListener("mouseleave", () => {});
			});
		};
	}, []);
};
