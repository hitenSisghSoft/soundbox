import { useState } from 'react';

const Accordion = ({ items }: { items: { store_name: string; content: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-base border-default overflow-hidden border shadow-xs">
      {items.map((item, index) => (
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
              <p className="text-body">{item?.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
