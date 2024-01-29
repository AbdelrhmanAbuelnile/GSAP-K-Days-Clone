import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap-trial/SplitText";
import Lenis from "@studio-freight/lenis";
import EventSection from "./EventSection";
import event1 from "./assets/event1.jpeg";

function App() {
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			"#container",
			{
				backgroundColor: "#5406E2",
			},
			{
				scrollTrigger: {
					trigger: ".reveal-type",
					scrub: true,
					end: "bottom bottom",
				},
				backgroundColor: "#002060",
			}
		);
	}, []);

	const lenis = new Lenis();

	lenis.on("scroll", (e) => {
		console.log(e);
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, SplitText);

		let splited = new SplitText(".firstSplit", { type: "chars" });
		let splited2 = new SplitText(".secondSplit", { type: "chars" });
		let chars = splited.chars;
		let chars2 = splited2.chars;

		gsap.fromTo(
			chars,
			{ rotation: 5, opacity: 0, scale: 1.2, y: -2 },
			{
				rotation: 0,
				opacity: 1,
				scale: 1,
				y: 0,
				stagger: 0.05,
				scrollTrigger: {
					trigger: chars,
					start: "top center",
					end: "bottom center",
					scrub: 5,
				},
				onComplete: () => {
					gsap.fromTo(
						chars2,
						{ rotation: 5, opacity: 0, scale: 1.5, y: -2, delay: 0.2 },
						{
							rotation: 0,
							opacity: 1,
							scale: 1,
							y: 0,
							stagger: 0.05,
							scrollTrigger: {
								trigger: chars[3],
								start: "top center",
								end: "bottom center",
								scrub: 5,
							},
						}
					);
				},
			}
		);
	}, []);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, SplitText);
		let splited = new SplitText(".thirdSplit", { type: "chars, lines" });
		let chars = splited.chars;

		gsap.from(chars, {
			scrollTrigger: {
				trigger: chars,
				start: "5% 90%",
				end: "5% 0%",
				scrub: true,
				markers: false,
			},
			opacity: 0.6,
			stagger: 0.05,
		});
	}, []);

	return (
		<>
			<div
				id="container"
				className="bg-[#5406E2] flex flex-col justify-center items-center overflow-hidden px-8 xl:px-20 w-screen"
			>
				<div className="h-screen w-full"></div>
				<div className="overflow-hidden w-full px-0 md:px-8 lg:24 xl:px-32">
					<div
						className="
            font-bold text-[#C6D800] text-[12vw] my-20 md:my-44 lg:my-80 text-center 
            text-ellipsis flex flex-col gap-0 
            justify-center items-center
            firstSplit leading-none overflow-hidden
            "
					>
						<span className="">EPIC</span>
						<span className="secondSplit leading-none">HEADLINRES</span>
					</div>

					<div className="w-full flex flex-col justify-between items-center lg:flex-row sm-my-16 md:my-32 lg:my-80">
						<div className="w-[40%] h-72">

						</div>

						<p className="text-white font-bold text-[3.75vw] lg:w-[57%] w-full text-left ml-auto thirdSplit leading-none">
							Dance like nobody's watching! Join us for 10 nights of live music on
							the Northern Lights Stage. There's something for everyone, with acts
							ranging from chart-toppers to emerging talents.
						</p>
					</div>
				</div>
				<EventSection />
			</div>
		</>
	);
}

export default App;
