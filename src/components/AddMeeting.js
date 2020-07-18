import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Modal from "../Modal";
import History from "../History";

let d = new Date();
d =
	d.getFullYear() +
	"-" +
	("0" + (parseInt(d.getMonth()) + 1)).slice(-2) +
	"-" +
	("0" + d.getDate()).slice(-2);

function AddMeeting({ counter, fetchDate }) {
	const [data, setData] = useState([]);
	const [date, setDate] = useState(d);
	const [startTime, setStartTime] = useState("00:00");
	const [endTime, setEndTime] = useState("00:00");
	const [des, setDes] = useState("");
	const [alertShow, setAlertShow] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			let apiDate =
				date.slice(-2) + "/" + date.slice(6, 7) + "/" + date.slice(0, 4);

			const result = await axios(
				`http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${apiDate}`
			);

			setData(result.data);
			// console.log(result.data);
		};

		fetchData();
	}, [date]);

	useEffect(() => handleDate(), [counter]);

	const slotChecker = () => {
		if (data) {
			setAlertMsg(" Slot available");
			setAlertShow(true);
		}
		data.map(({ end_time, start_time }) => {
			if (endTime === end_time && startTime === start_time) {
				setAlertMsg(" Slot unavailable");
				setAlertShow(false);
			} else {
				setAlertMsg(" Slot available");
				setAlertShow(true);
			}
		});
	};

	const handleSubmit = (e) => {
		slotChecker();
		e.preventDefault();
		alertShow && History.push("/");
		// setAlertShow(false)
	};

	const handleDate = () => {
		let d = new Date();
		d =
			d.getFullYear() +
			"-" +
			("0" + (parseInt(d.getMonth()) + 1)).slice(-2) +
			"-" +
			("0" + (d.getDate() + counter)).slice(-2);
		setDate(d);
	};

	const renderButton = () => {
		if (date.slice(-2) < d.slice(-2) || alert === "Slot unavailable") {
			return (
				<button
					type="submit"
					className=" px-6 py-1 rounded-lg cursor-not-allowed bg-blue-500 opacity-50 "
					disabled
					onClick={() => console.log("click")}
				>
					Save
				</button>
			);
		}
		return (
			<button
				onClick={() => fetchDate(date)}
				type="submit"
				className="  px-6 py-6 rounded-lg transition mb-2 duration-500 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 ..."
			>
				{alertShow ? "Continue" : "Save"}
			</button>
		);
	};

	return (
		<div>
			<div className="text-center text-extra-bold text-blue-600 text-3xl">
				{alertMsg}{" "}
			</div>
			<form onSubmit={handleSubmit}>
				<div className="shadow-lg container h-vw bg-white p-4  ">
					<input
						className="flex  bg-gray-200  mt-8  m-8 p-2 px-4 "
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<div className="flex row justify-between mt-8">
						<input
							className="bg-gray-200 m-8 p-2 px-16 "
							type="time"
							// label="start-time"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
						<input
							className="bg-gray-200 m-8 p-2  px-16"
							type="time"
							value={endTime}
							onChange={(e) => setEndTime(e.target.value)}
						/>
					</div>
					<textarea
						className="bg-gray-200  m-8 h-56  w-11/12 "
						placeholder="Description"
						value={des}
						onChange={(e) => setDes(e.target.value)}
					/>
				</div>
				<div className=" flex justify-center mt-12 ">{renderButton()}</div>
			</form>
		</div>
	);
}

export default AddMeeting;
