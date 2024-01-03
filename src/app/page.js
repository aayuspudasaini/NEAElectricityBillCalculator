"use client";

import Image from "next/image";
import neaLogo from "../../public/nea-header-logo.png";
import ReactSelect from "react-select";
import { useState } from "react";
import NeaRateCalculator from "./_function/neaBillCalculator";

export default function Home() {
  // Select Ampere
  const options = [
    { value: "5amp", label: "5 Ampere" },
    { value: "15amp", label: "15 Ampere" },
    { value: "30amp", label: "30 Ampere" },
    { value: "60amp", label: "60 Ampere" },
  ];


  // selected ampere
  const [ampere, setAmpere] = useState([]);

  // totol consumed units:number
  const [consumedUnit, setConsumedUnit] = useState("");

  // Total Calculations
  const [billCalculation, setBillCalculation] = useState('');

  // handling submitted data
  const handleSubmit = (e) => {
    e.preventDefault();
    const billingAmount = NeaRateCalculator({ consumedUnit, ampere });
    console.log(billingAmount)
    setBillCalculation(
      <>
        <div>
          <p
            className="block mb-2 text-sm font-semibold text-gray-900 "
          >
            Bill Calculation
          </p>
          <div className="bg-gray-100 p-2.5 rounded-md w-full">
            <div className="flow-root mb-2">
              <h5 className="float-left text-sm font-semibold">Energy Charge</h5>
              <p className="float-right  text-sm font-semibold">1730</p>
            </div>
            <div className="flow-root">
              <h5 className="float-left text-sm font-semibold">Service Charge</h5>
              <p className="float-right  text-sm font-semibold">1730</p>
            </div>
            <hr className="my-3 border border-gray-400 border-dashed" />
            <div className="flow-root">
              <h5 className="float-left text-sm font-semibold text-primary-600">Total Bill Amount</h5>
              <p className="float-right  text-sm font-semibold text-primary-600">{billingAmount.calculatedCost}</p>
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
            height={400}
            className="mr-2"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlor="Ampere"
                  className="block mb-2 text-sm font-semibold text-gray-900 "
                >
                  Select Ampere
                </label>
                <ReactSelect
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
                  className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-1 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              {billCalculation}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
