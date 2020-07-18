import React, { useState } from "react";
import ShowMeeting from "./ShowMeeting";
import AddMeeting from "./AddMeeting";
import { Route, Switch, Router } from "react-router-dom";
import "./App.css";
// eslint-disable-next-line no-restricted-globals
import History from "../History";

function App() {
	const [counter, setCounter] = useState(0);
	const [appDate, setAppDate] = useState("");

	const handleCount = (count) => {
		setCounter(count);
	};
	const handleAppDate = (date) => {
		setAppDate(date);
	};
	return (
		<Router history={History}>
			<div className=" flex  justify-center mt-20 ">
				<Switch>
					<Route
						path="/"
						exact
						render={(props) => (
							<ShowMeeting
								{...props}
								fetchCount={handleCount}
								appDate={appDate}
							/>
						)}
					/>
					<Route
						path="/add"
						exact
						render={(props) => (
							<AddMeeting
								{...props}
								counter={counter}
								fetchDate={handleAppDate}
							/>
						)}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
