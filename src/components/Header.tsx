import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import Dropdown from "./Dropdowm";
import ModalLogin from "./Modal/ModalLogin";
import ModalTypeInfo from "./Modal/ModalTypeInfo";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalType, setIsOpenModalType] = useState(false);
  const { token } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <header className="bg-primary-500 px-2 py-4 sticky top-0 z-10 flex justify-between items-center">
        <p className="text-3xl font-semibold text-primary-50 uppercase">
          IE Video CT System
        </p>
        <div className=" flex justify-center items-center gap-2">
          <input
            type="text"
            className="px-3 py-2 outline-none rounded-md"
            placeholder="Search for day..."
          />
          <input
            type="text"
            className="px-3 py-2 outline-none rounded-md"
            placeholder="Search for season..."
          />
          <input
            type="text"
            className="px-3 py-2 outline-none rounded-md"
            placeholder="Search for cutting..."
          />
          <input
            type="text"
            className="px-3 py-2 outline-none rounded-md"
            placeholder="Search for area..."
          />
          <button
            type="button"
            className="px-3 py-1.5 text-primary-50 bg-primary-400 rounded-md text-lg font-semibold"
          >
            Search
          </button>
        </div>
        <div>
          {token ? (
            <Dropdown />
          ) : (
            <button
              type="button"
              className="px-3 py-1.5 text-primary-50 bg-primary-400 rounded-md text-lg font-semibold"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </header>

      {isOpenModal && (
        <ModalLogin
          setIsOpenModal={setIsOpenModal}
          setIsOpenModalType={setIsOpenModalType}
        />
      )}
      {isOpenModalType && (
        <ModalTypeInfo setIsOpenModalType={setIsOpenModalType} />
      )}
    </>
  );
};

export default Header;
