import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useState } from "react";
// import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { submitInfo } from "../../redux/features/information/infoSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Msg } from "./ModalLogin";

interface FormValues {
  date: string;
  season: string;
  article: string;
  area: string;
  videos: File[] | null;
}

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Please it not blank!"),
  season: Yup.string().required("Please it not blank!"),
  article: Yup.string().required("Please it not blank!"),
  area: Yup.string().required("Please it not blank!"),
  videos: Yup.mixed()
    .required("Please choose your video!")
    .test(
      "fileType",
      "Only video files are allowed!",
      (value: any) => value && value[0] && value[0].type.startsWith("video/")
    ),
  // .test(
  //   "fileSize",
  //   "File size must be less than 50MB!",
  //   (value: any) => value && value[0] && value[0].size <= 50 * 1024 * 1024
  // ),
});

interface ModalTypeInfoProps {
  setIsOpenModalType: (isOpenModalType: boolean) => void;
}

const ModalTypeInfo = ({ setIsOpenModalType }: ModalTypeInfoProps) => {
  const [err, setErr] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.info);

  const initialValues: FormValues = {
    date: "",
    season: "",
    article: "",
    area: "",
    videos: null,
  };

  useEffect(() => {
    setErr(error?.message);
  }, [error]);

  const handleChangeFiles = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (e.target.files) {
      setFieldValue("videos", Array.from(e.target.files));
    }
  };

  const handleSubmit = async (values: FormValues) => {
    // console.log(values);

    const paths = {
      date: values.date || "",
      season: values.season || "",
      article: values.article || "",
    };

    const formData = new FormData();

    formData.append("date", values.date);
    formData.append("season", values.season);
    formData.append("article", values.article);
    formData.append("area", values.area);

    if (values.videos) {
      values.videos.forEach((file) => {
        formData.append(`videos`, file);
      });
    }

    let result = await dispatch(submitInfo(formData));

    if (submitInfo.fulfilled.match(result)) {
      toast.success("Submit success!");
      localStorage.setItem("paths", JSON.stringify(paths));
      setIsOpenModalType(false);
      // dispatch(fetchStageList(values.area.toUpperCase()));
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
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-primary-700">
          <div className="flex items-center justify-between px-4 py-2.5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Information
            </h3>
            <button
              type="button"
              onClick={() => setIsOpenModalType(false)}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <Field
                    type="date"
                    name="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="date"
                    className="text-red-500"
                    component="div"
                  />
                </div>

                <div>
                  <label
                    htmlFor="season"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Season
                  </label>
                  <Field
                    type="text"
                    name="season"
                    id="season"
                    placeholder="Please enter your season..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="season"
                    className="text-red-500"
                    component="div"
                  />
                </div>

                <div>
                  <label
                    htmlFor="article"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Article
                  </label>
                  <Field
                    type="text"
                    name="article"
                    id="article"
                    placeholder="Please enter your article..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="article"
                    className="text-red-500"
                    component="div"
                  />
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Area
                  </label>
                  <Field
                    component="select"
                    name="area"
                    id="area"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                  >
                    <option>--Choose stage--</option>
                    <option>CUTTING</option>
                    <option>STITCHING</option>
                    <option>ASSEMBLY</option>
                    <option>STOCKFITTING</option>
                  </Field>
                  <ErrorMessage
                    name="area"
                    className="text-red-500"
                    component="div"
                  />
                </div>

                <div>
                  <label
                    htmlFor="videos"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Videos
                  </label>
                  <Field name="videos">
                    {({ form }: any) => (
                      <input
                        type="file"
                        id="videos"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                        autoComplete="off"
                        multiple
                        onChange={(event) =>
                          handleChangeFiles(event, form.setFieldValue)
                        }
                        accept="video/*"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="videos"
                    className="text-red-500"
                    component="div"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTypeInfo;
