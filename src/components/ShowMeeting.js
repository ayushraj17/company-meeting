import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

let tdate = new Date();
tdate =
	tdate.getDate() +
	"/" +
	(parseInt(tdate.getMonth()) + 1) +
	"/" +
	tdate.getFullYear();

function ShowMeeting({ fetchCount, appDate }) {
	const [counter, setCounter] = useState(0);

	const [data, setData] = useState([]);

	const [date, setDate] = useState(tdate);
	// const [counter, setCounter] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				`http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${date}`
			);

			setData(result.data);
			// console.log(result.data);
		};

		fetchData();
	}, [date]);

	useEffect(() => handleDate());

	const renderList = () => {
		return data.map((meet, i) => {
			return (
				<div
					key={i}
					className=" flex p-4 mb-4 lg:mx-56  bg-gray-200  rounder-lg shadow-lg justify-between"
				>
					<div className="flex justify-around text-lg  w-24">
						<div>{meet.start_time} </div>
						<div>{meet.end_time}</div>
					</div>
					<div className=" ml-56 text-sm">{meet.description}</div>
				</div>
			);
		});
	};

	const handleDate = () => {
		let tdate = new Date();
		tdate =
			parseInt(tdate.getDate()) +
			parseInt(counter) +
			"/" +
			(parseInt(tdate.getMonth()) + 1) +
			"/" +
			tdate.getFullYear();
		if (appDate) {
			tdate =
				appDate.slice(-2) +
				"/" +
				appDate.slice(6, 7) +
				"/" +
				appDate.slice(0, 4);
		}
		setDate(tdate);

		fetchCount(counter);
	};

	const renderHeader = () => {
		return (
			<div className="mx-56 flex justify-center align-middle mb-12 text-3xl text-blue-600">
				<button
					className="hover:bg-gray-300 pointer-none  mx-4 my-auto"
					onClick={() => setCounter(counter - 1)}
				>
					<i className="material-icons md-48">keyboard_arrow_left</i>
				</button>
				{date}
				<button
					className="hover:bg-gray-300 mx-4 my-auto"
					onClick={() => setCounter(counter + 1)}
				>
					<i className="material-icons md-48">keyboard_arrow_right</i>
				</button>
			</div>
		);
	};

	const renderButton = () => {
		if (date.slice(0, 2) < tdate.slice(0, 2)) {
			return (
				<button
					type="submit"
					className=" px-6 py-1 rounded-lg cursor-not-allowed bg-blue-500 opacity-50 "
					disabled
					onClick={() => console.log("click")}
				>
					Add Meeting
				</button>
			);
		}
		return (
			<button
				// onClick={(date) => fetchDate(date)}
				type="submit"
				disabled
				className="  px-6 py-1 rounded-lg transition duration-500 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 ..."
			>
				<Link to="/add">Add Meeting</Link>
			</button>
		);
	};

	return (
		<div>
			<div className="w-full h-full container  justify-center flex-row ">
				{renderHeader()}
				{renderList()}
			</div>
			<div className="self-end flex  justify-center align-bottom content-end">
				{renderButton()}
			</div>
		</div>
	);
}

export default ShowMeeting;
