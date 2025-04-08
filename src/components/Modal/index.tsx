import React, { useEffect, useRef, useState } from "react";

interface ModalProp {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  textBtn?: string;
  handleBtn?: () => void;
}

const Modal = ({ onClose, title, children, textBtn, handleBtn }: ModalProp) => {
  // const [textConfirm, setTextConfirm] = useState<string>("");

  // const handleChangeTextConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTextConfirm(e.target.value);
  // };

  // const handleClickConfirm = () => {
  //   console.log(textConfirm);
  // };

  return (
    <div
      className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white uppercase">
              {title}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-2">{children}</div>
          <div className="flex justify-end items-center p-2 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
            <button
              type="button"
              className="px-2 py-1 text-sm text-primary-50 bg-red-600 rounded font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-2 py-1 text-sm text-primary-50 bg-blue-600 rounded font-semibold"
              onClick={handleBtn}
            >
              {textBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
