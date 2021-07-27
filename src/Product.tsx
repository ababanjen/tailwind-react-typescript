import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";

const Product = ({ productList }: Props) => {
  const {
    location: { search },
    push,
  } = useHistory();
  const [isActive, setIsActive] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    getItem();
  });

  const getItem = () => {
    setItem(
      productList.find(
        (item: { id: string }) => item.id === search.split("?id=")[1]
      ) || null
    );
  };

  const handleSelectTab = (id: number) => setIsActive(id);

  const handleAddtoCart = () => {
    setIsSubmitting(!isSubmitting);
    setTimeout(() => {
      alert("Item added to cart!");
      setIsSubmitting(false);
    }, 2000);
  };

  return item ? (
    <div className="flex flex-col p-8 pt-0 pl-0 pb-0 min-h-screen xs:pr-0 xs:mb-6">
      <div
        className="ml-8 mt-8 flex items-center cursor-pointer"
        onClick={() => push("/")}
      >
        <BackIcon />
        <span className="text-gray-500 ml-2">All products</span>
      </div>
      <div className="flex mt-8 min-h-screen xs:flex-col  xs:w-full xs:justify-center xs:gap-4 lg:flex-row lg:gap-0">
        <div className="flex flex-col w-2/4 gap-16 xs:w-full">
          <div className="flex flex-col ml-8">
            <span className="text-3xl font-bold">{item.name}</span>
            <span className="text-sm text-gray-500">{item.details}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex cursor-pointer ml-8">
              {item.detailsTab.map(
                ({ id, label }: { id: number; label: string }) => (
                  <div
                    className={`p-4 hover:bg-gray-300 rounded-t-md ${
                      id === isActive
                        ? "bg-gray-200 text-black"
                        : "text-gray-500"
                    } `}
                    key={id}
                    onClick={() => handleSelectTab(id)}
                  >
                    {label}
                  </div>
                )
              )}
            </div>
            <div className="flex flex-wrap overflow-hidden box-border border-solid border-t border-b gap-8">
              <div className=" ml-8 flex gap-6 flex-col p-8 pl-0">
                {item.detailsTab.map(
                  ({ id, content }: { id: number; content: string }) =>
                    id === isActive ? (
                      <p key={id}>{content}</p>
                    ) : (
                      <Fragment key={id} />
                    )
                )}

                {isActive === 1 && (
                  <div className="flex gap-6 font-bold">
                    <span>{`${item.currency}${item.newPrice}`}</span>
                    <span className="line-through text-gray-500">
                      {`${item.currency}${item.oldPrice}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="ml-8 flex xs:m-auto  xs:flex-col lg:m-0 lg:ml-8">
            <div className="w-2/4 h-auto border-l border-solid xs:m-auto xs:border-none lg:hidden xs:block">
              <img
                src={item.image}
                className="w-full min-w-full min-h-full"
                alt="ath-msr7-black"
              />
            </div>
            <div className="xs:flex xs:w-auto xs:m-4 lg:m-0">
              <button
                type="button"
                className={`${
                  isSubmitting
                    ? "bg-blue-200 cursor-not-allowed"
                    : "hover:bg-blue-600 bg-blue-500"
                }  text-white p-4 pl-8 pr-8 rounded xs:w-full lg:w-auto`}
                onClick={handleAddtoCart}
                disabled={isSubmitting}
              >
                <div className="relative items-center flex justify-center">
                  {isSubmitting && (
                    <span className="absolute animate-ping inline-flex rounded-full h-5 w-5 bg-black"></span>
                  )}
                  <span className="">ADD TO CART</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/4 h-auto border-l border-solid xs:hidden lg:block min-h-screen box-border overflow-hidden">
          <div className="lg:max-h-60 flex items-start min-h-full ">
            <img
              src={item.image}
              className="w-full min-w-full min-h-full"
              alt="ath-msr7-black"
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export const BackIcon: React.FC = () => (
  <svg
    id="Layer"
    fill="gray"
    enableBackground="new 0 0 64 64"
    height="20"
    viewBox="0 0 64 64"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" />
  </svg>
);

interface Props {
  productList: any;
}

export default Product;
