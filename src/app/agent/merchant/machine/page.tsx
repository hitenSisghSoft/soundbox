import Button from '@/components/ui/button/Button';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { machineEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import React, { useContext, useEffect, useState } from 'react';
import AddMachine from './AddMachine';

const StoresMachine = ({storeId}: {storeId: any}) => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [machineApiCall, setMachineApiCall] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);

      const { setToastNotification } = useContext<any>(CustomAlertContext);
      const [openIndex, setOpenIndex] = useState<number | null>(null);
const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
      const GetMerchantStore = async () => {
          setLoading(true);
          await apiConnector({
            method: 'GET',
            url: `${machineEndPoints?.GET_MACHINE_By_ID_API}/${storeId}`,
           
          })
            .then((response: any) => {
              setLoading(false);
              setMachines(response?.data?.data);
            })
      
            .catch((error: any) => {
              setToastNotification(error?.message, 'error');
              setLoading(false);
            });
        };
      
        useEffect(() => {
          if (storeId) {
            GetMerchantStore();
          }
        }, [storeId, machineApiCall]);
  return (
    <div className="col-span-12">
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className='flex justify-between items-center'>

        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Merchant Stores
        </h2>
         <Button
                size="sm"
                variant="primary"
                customBg="bg-brand-500"
                className="mb-4 px-12"
                disabled={loading}
                type="button"
                onClick={() => setShowCreateForm(!showCreateForm)}
                >
                {showCreateForm ? 'Cancel' : 'Create Machine'}
              </Button>
                </div>
        
        {showCreateForm && (
          <AddMachine 
            isEditMode={false} 
            storeId={storeId} 
            setMachineApiCall={setMachineApiCall}
            setOpenIndex={setShowCreateForm}
          />
        )}
        
        <div className="rounded-base border-default overflow-hidden border shadow-xs">
          {machines.map((item: any, index: number) => {
            return (
              <div key={index}>
                <h2>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="text-body flex w-full items-center justify-between gap-3 border-b p-5 font-medium"
                  >
                    <span>{item?.brand}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m5 9 7 7 7-7"
                      />
                    </svg>
                  </button>
                </h2>

                {openIndex === index && (
                  <div className="border-b p-4 md:p-5">
                    <AddMachine item={item} setMachineApiCall={setMachineApiCall} setOpenIndex={setOpenIndex}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default StoresMachine