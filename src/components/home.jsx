import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";

export default function Home() {
	const [data, setData] = useState([]);
	const url = "https://restcountries.com/v3.1/all";

	const navigate = useNavigate();

	let regionArray = [
		"Asia",
		"Africa",
		"Europe",
		"North America",
		"South America",
		"Antartica",
		"Oceania",
	];

	const fetchData = () => {
		return axios.get(url).then((response) => setData(response.data));
	};

	const fetchRegion = (region) => {
		const urlRegion = `https://restcountries.com/v3.1/region/${region}`;
		return axios.get(urlRegion).then((response) => setData(response.data));
	};

	const searchFunction = (searchText) => {
		console.log("sdadasdad",searchText)
		if (!searchText) {
			fetchData()
			return;
		};
		const urlRegion = `https://restcountries.com/v3.1/name/${searchText}`;
		return axios.get(urlRegion).then((response) => setData(response.data));
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="dark:bg-gray-700 font-nunito">
			<Navbar />
			<div className="sm:flex sm:flex-row sm:w-full">
				<form className="sm:w-1/3  sm:pt-32 pt-10 pb-10 pl-10 sm:mr-0 mr-10">
					<div className="relative">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</div>
						<input
							type="search"
							id="search"
							className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 
							 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500
							 dark:focus:border-black-500"
							placeholder="Search for a country"
							onChange={(event) => searchFunction(event.target.value)}
						/>
					</div>
				</form>

				<Menu
					as="div"
					className="sm:origin-top-right sm:absolute sm:right-0 sm:pt-32 sm:pl-10 pl-10 items-center"
				>
					<Menu.Button
						className="flex flex-row w-56 h-12 mr-10 pl-4 pt-2 mb-1 rounded-md text-gray-600 bg-gray-50 text-lg shadow-2xl
					 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-400"
					>
						Filter By Region
						<svg
							className="ml-12 mt-2 w-4 h-4  dark:text-gray-400"
							aria-hidden="true"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</Menu.Button>
					<Menu.Items className="w-56 rounded-lg bg-white shadow-lg dark:shadow-lg  dark:bg-gray-600">
						{regionArray.map((region) => {
							return (
								<div>
									<button
										className=" text-black dark:text-gray-400 py-1 ml-3 dark:hover:text-white"
										onClick={() => fetchRegion(region.toLowerCase())}
									>
										{region}
									</button>
								</div>
							);
						})}
					</Menu.Items>
				</Menu>
			</div>
			<div className="sm:w-auto sm:grid sm:h-full sm:grid-cols-4 sm:gap-24 sm:px-10 items-center justify-center">
				{data.map((info) => {
					return (
						<div
							id={info.ccn3}
							className="sm:max-w-sm sm:overflow-hidden shadow-lg sm:h-[400px] mt-10 mb-5 sm:mx-0 mx-24 cursor-pointer dark:text-white dark:bg-gray-600 items-center justify-center"
							onClick={() => navigate(`/${info.ccn3}`)}
						>
							<img className="w-full" src={info.flags.svg} alt={info.name} />
							<div className="sm:px-6 sm:py-2 px-10 py-5 mb-10">
								<div className="font-bold text-xl mb-5 dark:text-white">
									{info.name.common}
								</div>
								<p className="text-gray-700 text-base dark:text-white">
									Population: {info.population.toLocaleString()}
								</p>
								<p className="text-gray-700 text-base dark:text-white">
									Region: {info.continents}
								</p>
								<p className="text-gray-700 text-base dark:text-white">
									Capital: {info.capital}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
