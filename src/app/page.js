"use client";

import Image from "next/image";
import neaLogo from "../../public/nea-header-logo.png";
import Select from "react-select";
import { useState } from "react";
import NeaRateCalculator from "./_function/neaBillCalculator";
import { useForm } from "react-hook-form";


export default function Home() {


  // UseForm

  // const { data, error } = useForm();

  // Select Ampere
  const options = [
    { id: 1, value: "5amp", label: "5 Ampere" },
    { id: 2, value: "15amp", label: "15 Ampere" },
    { id: 3, value: "30amp", label: "30 Ampere" },
    { id: 4, value: "60amp", label: "60 Ampere" },
  ];



  // selected ampere
  const [ampere, setAmpere] = useState([]);

  // totol consumed units:number
  const [consumedUnit, setConsumedUnit] = useState("");

  // Total Calculations
  const [billCalculation, setBillCalculation] = useState('');


  // const formValidator = () => {
  //   let errors = {};
  //   if (ampere == []) {
  //     return errors.ampere = "Ampere cannot be empty."
  //   }
  //   if (consumedUnit == null) {
  //     return errors.units = "Units cannot be empty."
  //   }
  //   if (consumedUnit <= 0) {
  //     return errors.units = "Units cannot be 0."
  //   }
  //   if (consumedUnit == 0) {
  //     return errors.units = "Units cannot be 0."
  //   }
  //   return errors;
  // }


  // handling submitted data
  const handleSubmit = (e) => {
    e.preventDefault();
    // const errors = formValidator();

    const billingAmount = NeaRateCalculator({ consumedUnit, ampere });
    setBillCalculation(
      <>
        <div>
          <p
            className="block mb-2 text-sm font-semibold text-gray-900 "
          >
            Bill Calculation
          </p>
          <div className="bg-gray-100 px-4 py-2.5 rounded-md w-full">
            <div className="flow-root mb-2">
              <h5 className="float-left text-sm font-medium">Energy Charge</h5>
              <p className="float-right  text-sm font-medium">{billingAmount.energyCharge}</p>
            </div>
            <div className="flow-root">
              <h5 className="float-left text-sm font-medium">Service Charge</h5>
              <p className="float-right  text-sm font-medium">{billingAmount.serviceCharge}</p>
            </div>
            <hr className="my-3 border border-gray-400 border-dashed" />
            <div className="flow-root">
              <h5 className="float-left text-sm font-semibold text-primary-600">Total Bill Amount</h5>
              <p className="float-right  text-sm font-semibold text-primary-600">{billingAmount.energyCharge + billingAmount.serviceCharge}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <section className="bg-gray-50 min-h-screen">

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="https://www.nea.org.np/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          target="_blank"
        >
          <Image
            src={neaLogo}
            alt="logo"
            width={400}
            priority
          />
        </a>
        <div className="w-full bg-white rounded-md shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-5">
            <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlor="Ampere"
                  className="block mb-2 text-sm font-semibold text-gray-900 "
                >
                  Select Ampere
                </label>
                <Select
                  isSearchable={false}
                  id={options.id}
                  value={ampere}
                  onChange={setAmpere}
                  options={options}
                  className=" text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full "
                />
              </div>
              <div>
                <label
                  htmlor="units"
                  className="block mb-2 text-sm font-semibold text-gray-900 "
                >
                  Units
                </label>
                <input
                  type="number"
                  name="units"
                  onChange={(e) => {
                    setConsumedUnit(e.target.value);
                  }}
                  id="units"
                  placeholder="356"
                  className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-1 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full px-3 py-2"
                  min={1}
                />
                {/* <p>{errors.units}</p> */}
              </div>
              {billCalculation}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-400 font-semibold rounded-md text-sm px-5 py-2 text-center"
              >
                Calculate
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
