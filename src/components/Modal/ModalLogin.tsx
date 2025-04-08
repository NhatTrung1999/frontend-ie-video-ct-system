import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/features/auth/authSlice";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

interface ModalLoginProps {
  setIsOpenModal: (isOpenModal: boolean) => void;
  setIsOpenModalType: (isOpenModalType: boolean) => void;
}

interface FormValues {
  userid: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  userid: Yup.string().required("Please it not blank!"),
  password: Yup.string().required("Please it not blank!"),
});

const ModalLogin = ({
  setIsOpenModal,
  setIsOpenModalType,
}: ModalLoginProps) => {
  const [err, setErr] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const initialValues: FormValues = {
    userid: "",
    password: "",
  };

  useEffect(() => {
    setErr(error?.message);
  }, [error]);

  const handleSubmit = async (values: { userid: string; password: string }) => {
    const { userid, password } = values;
    let result = await dispatch(login({ username: userid, password }));
    if (login.fulfilled.match(result)) {
      setIsOpenModal(false);
      setIsOpenModalType(true);
    } else {
      toast.error(Msg, {
        data: {
          title: "Error",
          text: err || "",
        },
      });
    }
  };

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-primary-700">
            <div className="flex items-center justify-between px-4 py-2.5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Login
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsOpenModal(false)}
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

            <div className="p-4 md:p-5">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
              >
                <Form>
                  <div>
                    <label
                      htmlFor="userid"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your userid
                    </label>
                    <Field
                      id="userid"
                      name="userid"
                      placeholder="Please enter your userid..."
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    />
                    <ErrorMessage
                      name="userid"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="=password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3"
                    >
                      Your password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Please enter your password..."
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Msg = ({ data }: { data: { title: string; text: string } }) => {
  return (
    <div className="msg-container">
      <p className="msg-title">{data.title}</p>
      <p className="msg-description">{data.text}</p>
    </div>
  );
};

export default ModalLogin;
