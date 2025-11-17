"use client";

import ComponentCard from '@/components/common/ComponentCard';
import DeleteModal from '@/components/common/DeleteModal';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import BasicTableOne from '@/components/tables/BasicTable';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { employeeEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import { userDataInterface } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const columns: { header: string; accessor: keyof userDataInterface }[] = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Mobile", accessor: "mobile" },
  { header: "Role", accessor: "role" },
];


const Employee = () => {
        const router = useRouter();
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setToastNotification } = useContext(CustomAlertContext);
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  


    const GetEmployee = async () => {
    await apiConnector({
      method: "GET",
      url: employeeEndPoints?.GET_Employee_API,
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
      GetEmployee()
    }, [])
    
const DeleteUserApi = async () => {
    await apiConnector({
      method: "DELETE",
      url: `${employeeEndPoints?.DELETE_Employee_API}/${userId}`,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message, "success");
        setShowModal(false);

        GetEmployee();
      })
      .catch((error: any) => {
        setToastNotification(error?.message, "error");
        setLoading(false);
      });
  };

const handleEdit = (rowData: any) => {
  
    router.push(`/employee/${rowData?._id}`); 
    
  };

const handleDelete = () => {
    DeleteUserApi();
  };
  return (
    <>
    <PageBreadcrumb pageTitle="Employee" />
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
        <div className="lg:col-span-12 md:col-span-10 col-span-1">
          <ComponentCard title="Employee List" showForm={true} redirectTo="employee/add">
            {loading ? (
              "Loader"
            ) : employeeData?.length > 0 ? (
              <BasicTableOne
                columns={columns}
                data={employeeData}
                enableActions={true}
                actions={[ "edit", "delete"]}
                onActionClick={(type, rowData) => {
                  // if (type === "view") handleView(rowData);
                  if (type === "edit") handleEdit(rowData);
                  if (type === "delete") {
                    setShowModal(true);
                    setUserId(rowData?._id);
                  }
                }}
              />
            ) : (
              <h2 className="text-white text-center">No Data available</h2>
            )}
          </ComponentCard>
        </div>
        <DeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onDelete={handleDelete}
        >
          <h2 className="text-xl font-semibold mb-2">Delete Employee</h2>
          <p>
            Are you sure you want to delete this member? 
          </p>
        </DeleteModal>
        </div>
        </>
  )
}

export default Employee