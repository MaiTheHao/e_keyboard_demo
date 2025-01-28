"use client";
import { useEffect, useState } from "react";
import ScreenSizeContext from "./ScreenSizeContext";

export default function ScreenSizeContextProvider({ children }) {
	const [screenSize, setScreenSize] = useState({
		width: 0,
		height: 0,
	});

	const [screenStatus, setScreenStatus] = useState({
		isDesktop: false,
		isTablet: false,
		isMobile: false,
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = () => {
				const width = window.innerWidth;
				const height = window.innerHeight;

				setScreenSize({ width, height });
				setScreenStatus({
					isDesktop: width >= 1024,
					isTablet: width >= 768 && width < 1024,
					isMobile: width < 768,
				});
			};

			handleResize();
			window.addEventListener("resize", handleResize);

			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	const value = {
		...screenStatus,
		screenSize,
	};
	return <ScreenSizeContext.Provider value={value}>{children}</ScreenSizeContext.Provider>;
}
