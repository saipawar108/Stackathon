import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from "react-json-pretty";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard";
import createNotification, { demo } from "../../Notification";
import "./pages.css"

function Home() {
	const { user } = useAuth0();

	const [employees, setEmployes] = useState([]);
	const [isError, setIsError] = useState(false);
	const [empDetails, setEmpDetails] = useState();
	const fetchEmployees = async () => {
		axios
			.get("https://api-stackathon.herokuapp.com/employee")
			.then((emp) => {
				console.log(emp["data"]);
				const fetchedEmployees = emp["data"];
				let temp = [];
				temp.push(
					fetchedEmployees.map((emp) => {
						return <EmployeeCard key={emp._id} details={emp} />;
					})
				);
				setEmployes(temp);
				createNotification({
					message: "All employees fetched successfully!!",
					time: 1000
				})
			})
			.catch((err) => {
				createNotification({
					title: "",
					message: err.message,
					type: "warning",
					time: 1000

				});
				setIsError(true);
			});
	};

	useEffect(() => {
		fetchEmployees();
		demo(["This is the admin page where you can access the details of other employees and mark their attendances just in case."])
	}, []);

	useEffect(() => {
		if (isError) {
			setEmpDetails(<h1>Something went wrong</h1>);
			createNotification({
				title: ":(",
				message: "Something went wrong, Please try again later!!",
				type: "danger",
				time: 10000,
			});
		} else {
			setEmpDetails(employees);
		}
	}, [isError, employees]);
	return (
		<div className="Home">
			<div className="user" style={{ textAlign: "center" }}>
				<h2 className="pageTitle">Welcome {user.given_name}</h2>

				<img src={user.picture} style={{ borderRadius: "50%" }} alt="profile pic" />
				{/*<JSONPretty data={user} />*/}
			</div>
			<div id="no-more-tables">
				<table className="table table-hover table-bordered mt-5">
					<caption>List of Employees</caption>
					<thead className="thead-dark">
						<tr>
							<th className="text-uppercase">name</th>
							<th className="text-uppercase">email</th>
							<th className="text-uppercase">post</th>
							<th className="text-uppercase">role</th>
							<th className="text-uppercase">salary</th>
							<th className="text-uppercase">mark attendance</th>
						</tr>
					</thead>
					<tbody>{empDetails}</tbody>
				</table>
			</div>
		</div>
	);
}

export default Home;
