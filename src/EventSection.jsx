import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import event1 from "./assets/event1.jpeg";
import event2 from "./assets/event2.avif";
import event3 from "./assets/event3.avif";
import event4 from "./assets/event4.avif";
import event5 from "./assets/event5.jpeg";
import event6 from "./assets/event6.avif";

function EventSection() {
	const shakeAnimation = {
		x: [0, -10, 10, -10, 10, 0],
		transition: { duration: 0.5, ease: [0.36, 0.07, 0.19, 0.97] },
	};
	const [showCursorImg, setShowCursorImg] = useState(null);

	return (
		<div className="my-72 w-full flex flex-col justify-center items-start gap-10 self-start">
			<motion.div
				whileHover={{ scale: 1.05, ...shakeAnimation, zIndex: 999999 }}
				onMouseEnter={() => setShowCursorImg(1)}
				onMouseLeave={() => setShowCursorImg(null)}
				style={{ position: "relative", zIndex: 9999999 }}
				className="w-full flex justify-center lg:justify-start items-center gap-4 text-[4vw] font-bold justify-self-start cursor-default leading-none"
			>
				<h1 className="text-[#E50695] leading-none">02/15</h1>
				<p className="text-[#C6D800] flex just items-center gap-1">
					<span className="mr-4">Hello, World!</span>
					<span className="text-white text-[2.75vw] leading-none">python</span>
				</p>
				{showCursorImg === 1 && <CursorImg eventImg={event1} />}
			</motion.div>

			<motion.div
				whileHover={{ scale: 1.05, ...shakeAnimation, zIndex: 999999 }}
				onMouseEnter={() => setShowCursorImg(2)}
				onMouseLeave={() => setShowCursorImg(null)}
				style={{ position: "relative", zIndex: 9999999 }}
				className="w-full flex justify-center lg:justify-start items-center gap-4 text-[4vw] font-bold justify-self-start cursor-default leading-none"
			>
				<h1 className="text-[#E50695] leading-none">02/16</h1>
				<p className="text-[#C6D800]">
					<span className="mr-4">React science Street</span>
					<span className="text-white text-[2.75vw] leading-none">
						Chad The Man
					</span>
				</p>
				{showCursorImg === 2 && <CursorImg eventImg={event2} />}
			</motion.div>
			<motion.div
				whileHover={{ scale: 1.05, ...shakeAnimation, zIndex: 999999 }}
				onMouseEnter={() => setShowCursorImg(3)}
				onMouseLeave={() => setShowCursorImg(null)}
				style={{ position: "relative", zIndex: 9999999 }}
				className="w-full flex justify-center lg:justify-start items-center gap-4 text-[4vw] font-bold justify-self-start cursor-default leading-none"
			>
				<h1 className="text-[#E50695] leading-none">02/17</h1>
				<p className="text-[#C6D800]">
					<span className="mr-4">Vue lovers meet up</span>
					<span className="text-white text-[2.75vw] leading-none">
						Evan You
					</span>
				</p>
				{showCursorImg == 3 && <CursorImg eventImg={event3} />}
			</motion.div>
			<motion.div
				whileHover={{ scale: 1.05, ...shakeAnimation, zIndex: 999999 }}
				onMouseEnter={() => setShowCursorImg(4)}
				onMouseLeave={() => setShowCursorImg(null)}
				style={{ position: "relative", zIndex: 9999999 }}
				className="w-full flex justify-center lg:justify-start items-center gap-4 text-[4vw] font-bold justify-self-start cursor-default leading-none"
			>
				<h1 className="text-[#E50695] leading-none">02/18</h1>
				<p className="text-[#C6D800]">
					<span className="mr-4">Elctron is the future</span>
					<span className="text-white text-[2.75vw] leading-none">Github</span>
				</p>
				{showCursorImg == 4 && <CursorImg eventImg={event4} />}
			</motion.div>
			<motion.div
				whileHover={{ scale: 1.05, ...shakeAnimation, zIndex: 999999999 }}
				onMouseEnter={() => setShowCursorImg(5)}
				onMouseLeave={() => setShowCursorImg(null)}
				style={{ position: "relative", zIndex: 9999999 }}
				className="w-full flex justify-center lg:justify-start items-center gap-4 text-[4vw] font-bold justify-self-start cursor-default leading-none"
			>
				<h1 className="text-[#E50695] leading-none">02/19</h1>
				<p className="text-[#C6D800]">
					<span className="mr-4">Next.js is awesome</span>
					<span className="text-white text-[2.75vw] leading-none">Vercel</span>
				</p>
				{showCursorImg == 5 && <CursorImg eventImg={event5} />}
			</motion.div>
			<motion.div
				whileHover={{ scale: 1.05, ...shakeAnimation, zIndex: 999999 }}
				onMouseEnter={() => setShowCursorImg(6)}
				onMouseLeave={() => setShowCursorImg(null)}
				style={{ position: "relative", zIndex: 9999999 }}
				className="w-full flex justify-center lg:justify-start items-center gap-4 text-[4vw] font-bold justify-self-start cursor-default leading-none"
			>
				<h1 className="text-[#E50695] leading-none">02/20</h1>
				<p className="text-[#C6D800]">
					<span className="mr-4">Azure is the best</span>
					<span className="text-white text-[2.75vw] leading-none">
						Amazon Enjoyer PRO
					</span>
				</p>
				{showCursorImg == 6 && <CursorImg eventImg={event6} />}
			</motion.div>
		</div>
	);
}

const CursorImg = ({ eventImg }) => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springConfig = { damping: 30, stiffness: 500 };

	useEffect(() => {
		const updatePosition = (e) => {
			const rect = e.target.getBoundingClientRect();
			x.set(e.clientX - rect.left - 850);
			y.set(e.clientY - rect.top - 200);
		};

		window.addEventListener("mousemove", updatePosition);

		return () => {
			window.removeEventListener("mousemove", updatePosition);
		};
	}, [x, y]);

	return (
		<motion.img
			src={eventImg}
			style={{
				translateX: useTransform(x, (value) => value, springConfig),
				translateY: useTransform(y, (value) => value, springConfig),
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				zIndex: 100,
			}}
			className="pointer-events-none w-[400px] h-[400px] bg-white"
		/>
	);
};

export default EventSection;
