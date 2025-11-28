import { CustomAlertContext } from '@/context/CustomAlertContext';
import { merchantEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import React, { useContext, useEffect, useState } from 'react';
import AddMerchantStore from './addMerchantStore';

const MerchantStore = ({ id = '' }) => {
  const [loading, setLoading] = useState(false);
  const [merchantStores, setMerchantStores] = useState([]);
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  console.log(merchantStores, 'merchantStores');

  const data = { merchantId: id };
  const GetEmployeeById = async () => {
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
      GetEmployeeById();
    }
  }, [id]);
  return (
    <div className="col-span-12">
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Merchant Stores
        </h2>
        {/* <div
          id="accordion-collapse"
          data-accordion="collapse"
          className="rounded-base border-default overflow-hidden border shadow-xs"
        >
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              className="text-body rounded-t-base border-b-default hover:text-heading hover:bg-neutral-secondary-medium flex w-full items-center justify-between gap-3 border border-x-0 border-t-0 p-5 font-medium rtl:text-right"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>What is Flowbite?</span>
              <svg
                data-accordion-icon
                className="h-5 w-5 shrink-0 rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m5 15 7-7 7 7"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            className="border-b-default hidden border border-s-0 border-e-0 border-t-0"
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-4 md:p-5">
              <p className="text-body mb-2">
                Flowbite is an open-source library of interactive components built on top of
                Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
              </p>
              <p className="text-body">
                Check out this guide to learn how to{' '}
                <a
                  href="/docs/getting-started/introduction/"
                  className="text-fg-brand hover:underline"
                >
                  get started
                </a>{' '}
                and start developing websites even faster with components on top of Tailwind CSS.
              </p>
            </div>
          </div>
        </div> */}
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
                    <AddMerchantStore item={item} />
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
