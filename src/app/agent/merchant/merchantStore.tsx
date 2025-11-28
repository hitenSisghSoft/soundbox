import { CustomAlertContext } from '@/context/CustomAlertContext';
import { merchantEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import React, { useContext, useEffect, useState } from 'react';
import AddMerchantStore from './addMerchantStore';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';

const MerchantStore = ({ id = '' }) => {
  const [loading, setLoading] = useState(false);
  const [merchantStores, setMerchantStores] = useState([]);
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [merchantApiCall, setMerchantApiCall] = useState(0);
  const router = useRouter();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCreateStore = () => {
    router.push(`/agent/merchant/create-store?merchantId=${id}`);
  };

  console.log(merchantStores, 'merchantStores');

  const data = { merchantId: id };
  const GetMerchantStore = async () => {
    setLoading(true);
    await apiConnector({
      method: 'POST',
      url: `${merchantEndPoints?.GET_MERCHANT_STORES_API}`,
      bodyData: data,
    })
      .then((response: any) => {
        setLoading(false);
        setMerchantStores(response?.data?.data);
      })

      .catch((error: any) => {
        setToastNotification(error?.message, 'error');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      GetMerchantStore();
    }
  }, [id, merchantApiCall]);
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
                onClick={handleCreateStore}
                >
                Create Store
              </Button>
                </div>
        
        <div className="rounded-base border-default overflow-hidden border shadow-xs">
          {merchantStores.map((item: any, index: number) => {
            return (
              <div key={index}>
                <h2>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="text-body flex w-full items-center justify-between gap-3 border-b p-5 font-medium"
                  >
                    <span>{item?.store_name}</span>
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
                    {/* <p className="text-body">{item?.owner_name}</p> */}
                    <AddMerchantStore item={item} setMerchantApiCall={setMerchantApiCall} setOpenIndex={setOpenIndex}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MerchantStore;
