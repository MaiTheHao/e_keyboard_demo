// Init config
import React from "react";

// Styles
import "./globalStyles/index.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { mainFont } from "./ui/font";
config.autoAddCss = false;

// Components
import Header from "./ui/components/layout/Header";
import Footer from "./ui/components/layout/Footer";
import { CREATOR, WEB_DESCRIPTION, WEB_NAME } from "../../constants";
import ScreenSizeContextProvider from "@/contexts/ScreenSizeContext/ScreenSizeContextProvider";

export const metadata = {
	title: WEB_NAME,
	description: WEB_DESCRIPTION,
	author: CREATOR,
};

function layout({ children }) {
	return (
		<html>
			<body className={mainFont.className}>
				<ScreenSizeContextProvider>
					<div id="root">
						<Header />
						<main className="webpart top-body">
							<div className="top-container">{children}</div>
						</main>
						<Footer />
					</div>
				</ScreenSizeContextProvider>
			</body>
		</html>
	);
}

export default layout;
