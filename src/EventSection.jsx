import { useEffect, useState, useRef } from "react";
import {
	motion,
	useMotionValue,
	useTransform,
	useScroll,
	useAnimation,
	useInView,
} from "framer-motion";

function EventSection({event, index}) {

	const shakeAnimation = {
		x: [0, -10, 10, -10, 10, 0],
		transition: { duration: 0.5, ease: [0.36, 0.07, 0.19, 0.97] },
	};

	const [showCursorImg, setShowCursorImg] = useState(null);

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 100,
		scale: 0.5
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
}

const ref = useRef(null);
const { scrollYProgress } = useScroll({
	target: ref,
	offset: ["start start", "start start"]
});


	return (
		<div
			ref={ref}
			className=""
		>
				<motion.div
				
					// whileHover={{ scale: 1.05, ...shakeAnimation, zIndex: 999999 }}
					variants={fadeInAnimationVariants}
					initial="initial"
					whileInView="animate"
					onMouseEnter={() => setShowCursorImg(index + 1)}
					onMouseLeave={() => setShowCursorImg(null)}
					style={{ position: "relative", zIndex: 9999999,pathLength: scrollYProgress }}
					className="w-full flex justify-center lg:justify-start items-center gap-4 text-[4vw] font-bold justify-self-start cursor-default leading-none"
				>
					<h1 className="text-[#E50695] leading-none">{event.date}</h1>
					<p className="text-[#C6D800] flex just items-center gap-1">
						<span className="mr-4">{event.title}</span>
						<span className="text-white text-[2.75vw] leading-none">
							{event.speaker}
						</span>
					</p>
					{showCursorImg === index + 1 && (
						<CursorImg eventImg={event.eventImg} />
					)}
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
