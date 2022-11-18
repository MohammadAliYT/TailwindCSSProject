import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import back from "./back_button.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Details(state) {
	const params = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [borders, setBorders] = useState([]);
	const url = `https://restcountries.com/v3.1/alpha/${params.ccn3}`;

	const fetchData = () => {
		return axios.get(url).then((response) => {
			setData(response.data);
			return response;
		});
	};

	const fetchBordersAlias = () => {
		const countryBorders = data[0]?.borders;
		if (!countryBorders) return;
		const urlBorder = `https://restcountries.com/v3.1/alpha?codes=${countryBorders}`;
		axios.get(urlBorder).then((response) => {
			setBorders(response.data);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchBordersAlias();
	}, [data]);

	let objKeys = [];

	if (data[0]?.currencies) {
		const obj = data[0]?.currencies;
		objKeys = Object.keys(obj);
	}

	let namesKey = [];
	if (data[0]?.name.nativeName) {
		const obj = data[0]?.name.nativeName;
		namesKey = Object.keys(obj);
	}

	let languageKey = [];
	if (data[0]?.languages) {
		const obj = data[0]?.languages;
		languageKey = Object.values(obj);
	}

	const handleClick = (e) => {
		navigate("/");
	};

	return (
		<div className="h-screen w-full dark:bg-gray-700 font-nunito">
			<Navbar />
			<div className="pt-0 sm:pt-10">
				<button
					onClick={handleClick}
					type="button"
					className="mt-16 ml-10 pr-5 w-auto
					text-3xl sm:text-base text-center inline-flex items-center 
					border-gray-400 border text-gray-500
					dark:bg-gray-600 dark:border-gray-700 dark:text-white"
				>
					<img
						className="sm:w-12 sm:pl-5 sm:pr-2 sm:py-2
						w-16 pr-2 py-2"
						src={back}
						alt="back button"
					/>
					Back
				</button>
			</div>
			<div className="sm:flex sm:flex-row">
				<img
					className="py-10 px-10 sm:w-[600px] dark:bg-gray-700"
					src={data[0]?.flags.svg}
					alt=""
				/>
				<div className="px-10 sm:my-10 dark:bg-gray-700">
					<h1 className="pt-5 text-3xl font-bold dark:text-white">
						{data[0]?.name.common}
					</h1>
					<div className="pt-10 sm:grid sm:grid-cols-2 sm:gap-4">
						<p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
							Native Name:
							<p className="font-thin text-black pl-5 dark:text-white">
								{data[0]?.name?.nativeName[namesKey[0]].common}
							</p>
						</p>
						<p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
							Currencies:
							<p className="font-thin text-black pl-5 dark:text-white">
								{data[0]?.currencies[objKeys[0]].name}
							</p>
						</p>

						<p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
							Population:
							<p className="font-thin text-black pl-5 dark:text-white">
								{data[0]?.population.toLocaleString()}
							</p>
						</p>

						<p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
							Region:
							<p className="font-thin text-black pl-5 dark:text-white">
								{data[0]?.continents}
							</p>
						</p>

						<p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
							Sub Region:
							<p className="font-thin text-black pl-5 dark:text-white">
								{data[0]?.subregion}
							</p>
						</p>

						<p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
							Capital:
							<p className="font-thin text-black pl-5 dark:text-white ">
								{data[0]?.capital}
							</p>
						</p>

						<p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
							Languages:
							{languageKey.map((i) => {
								return (
									<p className="font-thin text-black pl-5 dark:text-white">
										{i}
									</p>
								);
							})}
						</p>
					</div>
					<p className="dark:text-white text-base font-medium pb-10 sm:pb-0 mt-5 pr-10">
						Borders Countries:
								<p className="ml-5 inline-flex">
									{borders?.map((val) => {
										return (
											<p
												className="mt-5 px-5 py-1 font-thin bg-gray-400 w-fit rounded-sm dark:text-gray-200 ml-2 shadow-lg dark:bg-gray-600"
											>
												{val.name.common}
											</p>
										);
									})}
								</p>
					</p>
				</div>
			</div>
		</div>
	);
}
