"use client";
import { useParams } from "next/navigation";
import EmployeeForm from "../components/EmployeeForm";
import { apiConnector } from "@/network/Apiconnector";
import { employeeEndPoints } from "@/helper/ApiEndPoints";
import { useContext, useEffect, useState } from "react";
import { CustomAlertContext } from "@/context/CustomAlertContext";



export default  function EditEmployeePage({ params }: any) {
const { id } = useParams();
  const { setToastNotification } = useContext(CustomAlertContext);
  const [employeeData, setEmployeeData] = useState({})
  const [loading, setLoading] = useState(false)

const GetEmployeeById = async () => {
  setLoading(true);
    await apiConnector({
      method: "GET",
      url: `${employeeEndPoints?.GET_Employee_By_ID_API}/${id}`,
    })
      .then((response: any) => {
        setLoading(false);
        setEmployeeData(response?.data?.data);
      })

      .catch((error: any) => {
        setToastNotification(error?.message, "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    GetEmployeeById();
  }, [id])
  
  if(loading) return <div>Loading...</div>

  return (
    <div>
      <EmployeeForm mode="edit" data={employeeData} />
    </div>
  );
}