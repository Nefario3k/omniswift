"use client";
/* eslint-disable */
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/axios";
import { FormEvent, useState } from "react";

// components
import SelectField from "./SelectField";
import Loader from "./Loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialPdfContent: PdfContentBase = {
  message: "",
  data: {
    id: -0,
    surname: "",
    firstname: "",
    age: 0,
    gender: "",
    level: "",
    state: "",
    reg_no: "",
    session: "",
    result: [
      {
        coursecode: "",
        title: "",
        credit_unit: 1,
        grade: "",
        total_point: 4,
      },
    ],
    cummulative: {
      unts: 0,
      untd: 0,
      gpts: 0,
      gptd: 0,
      gpats: 0,
      gpatd: 0,
      remarks: "",
    },
  },
  logo: "https://res.cloudinary.com/omniswift/image/upload/v1648473802/wqouqp73otvvjmkkekkj.png",
  profile_picture:
    "https://res.cloudinary.com/omniswift/image/upload/v1648473914/tc4kvpfeocqkyhj560fc.png",
};
// data
const initialFormData: FilterFormData = {
  age: "",
  state: "",
  level: "",
  gender: "",
};
const tableHeader = [
  { title: "S/N", value: "index", center: true },
  { title: "Surname", value: "surname", center: false },
  { title: "First Name", value: "firstname", center: false },
  { title: "Age", value: "age", center: false },
  { title: "Gender", value: "gender", center: false },
  { title: "Level", value: "level", center: false },
  { title: "State", value: "state", center: false },
  { title: "Action", value: "action", center: true },
];
const tableHeaderCourse = [
  { title: "S/N", value: "index", center: true },
  { title: "Course Code", value: "coursecode", center: false },
  { title: "Course Title", value: "title", center: false },
  { title: "Unit", value: "credit_unit", center: true },
  { title: "Grade", value: "grade", center: true },
  { title: "Total Point", value: "total_point", center: true },
];
export default function Form() {
  // state
  const [formData, setFormData] = useState<FilterFormData>(initialFormData);
  const [payload, setPayload] = useState<FilterFormData>(initialFormData);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pdfStatus, setPdfStatus] = useState(false);
  const [resultStatus, setResultStatus] = useState(false);
  const [pdfContent, setPdfContent] =
    useState<PdfContentBase>(initialPdfContent);
  // computed
  const disabledSubmit = () => {
    let val = true;
    Object.entries(formData).forEach(([key, value]) => {
      if (value && key) val = false;
    });
    return val;
  };

  // methods
  const fetchAllData = async () => {
    const { data: response } = await apiService.getAllData();
    const mapData: Array<AllData | []> = response.data.students;
    return mapData;
  };
  const filterData = async ({
    queryKey,
  }: {
    queryKey: [string, typeof payload];
  }) => {
    const { data: response } = await apiService.submitForm(queryKey[1]);
    const mapData: Array<AllData | []> = response.data.students;

    return mapData;
  };
  const getResult = async (id: number) => {
    try {
      let data = null;
      if (pdfContent.data.id !== id) {
        setResultStatus(true);
        data = await apiService.getResult(id);
      }
      const response: PdfContentBase = data ? data.data : pdfContent;
      setPdfContent(response);
      setIsOpen(true);
    } finally {
      setResultStatus(false);
    }
  };
  const handleChange =
    (name: keyof FilterFormData) => (value: string | number) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsFiltered(true);
    setPayload(formData);
  };
  const clearFields = () => {
    setFormData(initialFormData);
    if (isFiltered) {
      setPayload(initialFormData);
    }
    setIsFiltered(false);
  };
  const renderTableData = () => {
    if (tableLoading) {
      return (
        <tbody>
          <tr className="capitalize px-6 font-bold text-sm text-dark-1">
            <td colSpan={tableHeader.length}>
              <Loader className="w-full h-[300px] rounded-bl rounded-br" />
            </td>
          </tr>
        </tbody>
      );
    } else if (tableData && tableData.length) {
      return (
        <tbody>
          {tableData.map((item: any, mainIndex: number) => (
            <tr
              className=" capitalize px-6 font-bold text-sm text-dark-1 border-b border-bc-2 hover:bg-main-1"
              key={item.id}
            >
              {tableHeader.map((items: any, index: number) => (
                <td
                  className={`transInBasic capitalize px-6 py-3 font-normal text-sm text-dark-1 ${
                    items.center ? "text-center" : ""
                  }`}
                  key={items.value + item.id + index}
                >
                  {items.value === "index" ? (
                    mainIndex < 9 ? (
                      `0${mainIndex + 1}`
                    ) : (
                      mainIndex + 1
                    )
                  ) : items.value === "action" ? (
                    <button
                      onClick={() => {
                        getResult(item.id);
                      }}
                      type="button"
                      className="w-full bg-primary1 px-4 hover:opacity-80 flex items-center justify-center h-[35px] max-w-max mx-auto"
                    >
                      <span className="text-white font-normal text-sm">
                        Download Result
                      </span>
                    </button>
                  ) : (
                    item[items.value]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    } else
      return (
        <tbody>
          <tr className="capitalize px-6 font-bold text-sm text-dark-1">
            <td>No data found</td>
          </tr>
        </tbody>
      );
  };
  const renderTableDataCourses = () => {
    if (pdfContent.data.result && pdfContent.data.result.length) {
      return (
        <tbody>
          {pdfContent.data.result.map((item: any, mainIndex: number) => (
            <tr
              className={`${mainIndex % 2 !== 0 ? "" : "bg-main-3"}`}
              key={item.coursecode + mainIndex}
            >
              {tableHeaderCourse.map((items: any, index: number) => (
                <td
                  className={`px-3 py-3 font-normal text-xs text-dark-3  ${
                    items.center ? "text-center" : ""
                  }`}
                  key={items.value + item.id + index}
                >
                  {items.value === "index" ? mainIndex + 1 : item[items.value]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    } else
      return (
        <tbody>
          <tr className="capitalize px-6 font-bold text-sm text-dark-1">
            <td>No data found</td>
          </tr>
        </tbody>
      );
  };
  const convertImagesToBase64 = async (element: HTMLElement) => {
    const images = element.getElementsByTagName("img");

    for (const img of images) {
      try {
        const canvas = document.createElement("canvas") as HTMLCanvasElement;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png", 0.98);
        img.src = dataURL;
      } catch {}
    }
  };
  const generatePDF = async () => {
    setPdfStatus(true);
    try {
      // Dynamically import html2pdf.js because of reference error
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("pdf-content") as HTMLElement;
      await convertImagesToBase64(element);
      const opt: Html2PdfOptions = {
        margin: 0,
        filename: `${pdfContent.data.surname}_${pdfContent.data.firstname}_result.pdf`,
        image: { type: "png", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().set(opt).from(element).save();
    } catch {
    } finally {
      setPdfStatus(false);
    }
  };

  //  React Query
  // all data and filtered data
  const { data: tableData, isLoading: tableLoading } = useQuery({
    queryKey: ["allData", payload] as const,
    queryFn: disabledSubmit() ? fetchAllData : filterData,
  });
  // get ages
  const { data: ageOptions, isLoading: agesLoading } = useQuery({
    queryKey: ["ages"],
    queryFn: async () => {
      const { data: response } = await apiService.getAges();
      const mapData = response.data.map((el: any) => {
        return el.age;
      });

      return mapData;
    },
  });
  // get state
  const { data: stateOptions, isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const { data: response } = await apiService.getStates();
      const mapData = response.data.map((el: any) => {
        return el.name;
      });

      return mapData;
    },
  });
  // get level
  const { data: levelOptions, isLoading: levelsLoading } = useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const { data: response } = await apiService.getLevels();
      const mapData = response.data.map((el: any) => {
        return el.level;
      });

      return mapData;
    },
  });
  // get gender
  const { data: genderOptions, isLoading: gendersLoading } = useQuery({
    queryKey: ["genders"],
    queryFn: async () => {
      const { data: response } = await apiService.getGenders();
      const mapData = response.data.map((el: any) => {
        return el.gender;
      });

      return mapData;
    },
  });

  const isLoading =
    agesLoading ||
    statesLoading ||
    levelsLoading ||
    gendersLoading ||
    resultStatus ||
    pdfStatus;

  return (
    <section className="w-full max-w-[1145px] mx-auto px-4 py-[67px]">
      {isLoading ? (
        <Loader className="loader fixed top-0 left-0 w-full h-dvh" />
      ) : (
        ""
      )}
      <div
        className={`md:space-y-[43px] space-y-6 ${isOpen ? "scale-95" : ""}`}
      >
        {/* header */}
        <h1 className="font-black text-dark-1 md:text-[40px] text-xl pb-[11px]">
          Student Data Table
        </h1>
        {/* filter  */}
        <div className="cardWrapper bg-white md:px-7 md:py-11 px-4 py-7 md:space-y-[56px] space-y-6">
          <h3 className="font-normal text-dark-2 md:text-2xl text-base">
            Filter Student Table By:
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-custom gap-x-[36px] gap-y-[48px]"
          >
            <SelectField
              disabled={tableLoading}
              label="Age"
              value={formData.age}
              options={ageOptions || []}
              onChange={handleChange("age")}
            />
            <SelectField
              disabled={tableLoading}
              label="State"
              value={formData.state}
              options={stateOptions || []}
              onChange={handleChange("state")}
            />
            <SelectField
              disabled={tableLoading}
              label="Level"
              value={formData.level}
              options={levelOptions || []}
              onChange={handleChange("level")}
            />
            <SelectField
              disabled={tableLoading}
              label="Gender"
              value={formData.gender}
              options={genderOptions || []}
              onChange={handleChange("gender")}
            />
            <button
              disabled={disabledSubmit() || tableLoading}
              type="submit"
              className={`w-full  px-4 rounded  flex items-center justify-center h-[49px] ${
                disabledSubmit() || tableLoading
                  ? "bg-[#555] opacity-50"
                  : "bg-primary1 hover:opacity-80"
              }`}
            >
              <span className="text-white font-normal text-sm">Submit</span>
            </button>
            {!disabledSubmit() ? (
              <button
                disabled={tableLoading}
                onClick={clearFields}
                type="button"
                className={`w-full  px-4 rounded  flex items-center justify-center h-[49px] ${
                  tableLoading
                    ? "bg-[#555] opacity-50"
                    : "bg-primary1 hover:opacity-80"
                }`}
              >
                <span className="text-white font-normal text-sm ">Clear</span>
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
        {/* table  */}
        <div className="cardWrapper bg-white md:px-7 md:py-11 px-4 py-7">
          <div className="w-full max-h-[432px] min-h-[332px] overflow-auto pr-3">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-main-1 h-[47px] sticky top-0 left-0 z-10">
                  {tableHeader.map((item: any) => (
                    <th
                      className={`capitalize px-6 font-bold text-sm text-dark-1 ${
                        !item.center ? "text-left" : ""
                      }`}
                      key={item.value}
                    >
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              {renderTableData()}
            </table>
          </div>
        </div>
      </div>
      {/* pdf */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-white max-h-[90vh] overflow-auto pt-0 gap-0 modalContent">
          <div className="sticky top-4 bg-white py-6 wdwd">
            <DialogHeader>
              <DialogTitle>Preview Document</DialogTitle>
            </DialogHeader>
            <div className="flex justify-end">
              <button
                onClick={generatePDF}
                type="button"
                className={`w-full  px-4 rounded max-w-max flex items-center justify-center bg-primary1 gap-2 hover:opacity-80 h-[40px]`}
              >
                <svg
                  className="block w-4 min-w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
                      fill="#fff"
                    ></path>{" "}
                  </g>
                </svg>
                <span className="text-white font-normal text-sm ">
                  Save as PDF
                </span>
              </button>
            </div>
          </div>
          <div className="">
            <div
              id="pdf-content"
              className="cardWrapper bg-white pb-6 pt-10 w-full max-w-[595px] mx-auto overflow-auto"
            >
              {/* header */}
              <div className="flex gap-6 items-pdfContent justify-between">
                {/* logo */}
                {pdfContent.logo ? (
                  <div className="logo w-[100px] h-[100px] min-w-[100px] overflow-hidden flex items-center justify-center">
                    {/* due to security error, left with no choice but to have the image stored locally, issue should be fixed from the server */}
                    <img
                      className="w-full h-full object-contain object-center"
                      src="/img/logo.png"
                      alt="FREMONT COLLEGE OF EDUCATION"
                    />
                  </div>
                ) : (
                  ""
                )}
                {/* school info */}
                <div className="w-full max-w-[320px] mx-auto text-center">
                  <h3 className="uppercase font-bold text-base text-dark-3 mb-[10px]">
                    FREMONT COLLEGE OF EDUCATION
                  </h3>
                  <p className="w-full max-w-[240px] mx-auto text-dark-3 font-normal text-xs mb-[6px]">
                    No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja,
                    Nigeria.
                  </p>
                  <h2 className="font-semibold text-xl text-dark-4 mb-[10px]">
                    Post Graduate Diploma in Education
                  </h2>
                  <p className="text-dark-4 font-bold text-xs mb-0">
                    Student First Semester Statement Of Result
                  </p>
                </div>
                {/* picture */}
                {pdfContent.profile_picture ? (
                  <div className="logo w-[100px] h-[100px] min-w-[100px] overflow-hidden flex items-center justify-center">
                    <img
                      crossOrigin="anonymous"
                      className="w-full h-full object-contain object-center"
                      src={pdfContent.profile_picture}
                      alt={`${pdfContent.data.surname} ${pdfContent.data.firstname}`}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* student data */}
              <div className="student-data mt-[74px] mb-[40px] flex gap-6 items-center justify-between">
                {/* left table */}
                <table className="">
                  <tbody>
                    {/* name */}
                    <tr>
                      <td className="text-black font-bold text-xs pr-6 pb-[14px]">
                        Name:
                      </td>
                      <td className="text-black font-medium text-xs capitalize pb-[14px]">{`${pdfContent.data.surname} ${pdfContent.data.firstname}`}</td>
                    </tr>
                    {/* level */}
                    <tr>
                      <td className="text-black font-bold text-xs pr-6">
                        Level:{" "}
                      </td>
                      <td className="text-black font-medium text-xs capitalize">
                        {pdfContent.data.level}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* right table */}
                <table className="">
                  <tbody>
                    {/* Reg. No. */}
                    <tr>
                      <td className="text-black font-bold text-xs pr-6 pb-[14px]">
                        Reg. No.:
                      </td>
                      <td className="text-black font-medium text-xs pb-[14px]">{`${pdfContent.data.reg_no} ${pdfContent.data.firstname}`}</td>
                    </tr>
                    {/* Session */}
                    <tr>
                      <td className="text-black font-bold text-xs pr-6">
                        Session:{" "}
                      </td>
                      <td className="text-black font-medium text-xs">
                        {pdfContent.data.session}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* course table */}
              <table className="w-full">
                <thead>
                  <tr className="bg-primary2 h-[40px]">
                    {tableHeaderCourse.map((item: any) => (
                      <th
                        className={`capitalize px-3 font-bold text-xs text-white ${
                          !item.center ? "text-left" : ""
                        }`}
                        key={item.value}
                      >
                        {item.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                {renderTableDataCourses()}
              </table>
              {/* points */}
              <table className="mt-[33px] mb-[17px] w-full max-w-[438px]">
                {Object.keys(pdfContent.data.cummulative)?.length ? (
                  <thead>
                    <tr className="bg-primary2 h-[40px]">
                      {Object.keys(pdfContent.data.cummulative)
                        .map((item: any) => (
                          <th
                            className="uppercase px-3 font-bold text-xs text-white text-left"
                            key={item}
                          >
                            {item}
                          </th>
                        ))
                        .splice(
                          0,
                          Object.keys(pdfContent.data.cummulative).length - 1
                        )}
                    </tr>
                  </thead>
                ) : (
                  ""
                )}
                {Object.keys(pdfContent.data.cummulative)?.length ? (
                  <tbody>
                    <tr className="bg-main-3 h-[40px]">
                      {Object.entries(pdfContent.data.cummulative)
                        .map(([key, value], index: number) => (
                          <td
                            className="px-3 py-3 font-normal text-xs text-dark-3 text-left"
                            key={key + value}
                          >
                            {value}
                          </td>
                        ))
                        .splice(
                          0,
                          Object.keys(pdfContent.data.cummulative).length - 1
                        )}
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}
              </table>
              {/* remark */}
              <p className="text-xs font-semibold text-black mb-[119px]">
                Remarks:{" "}
                <span
                  className={`capital ${
                    pdfContent.data.cummulative.remarks === "Pass"
                      ? "text-primary2"
                      : "text-red-600"
                  }`}
                >
                  {pdfContent.data.cummulative.remarks}
                </span>
              </p>
              {/* signatory */}
              <div>
                <div className="h-[1px] w-full max-w-[163px] bg-[#00000080] mb-[10px]"></div>
                <p className="font-normal text-xs text-dark-4">Registrar</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
