"use client";

import Image from "next/image";
import neaLogo from "../../public/nea-header-logo.png";
import Select from "react-select";
import { useState } from "react";
import NeaElectricityBillAmountCalculator from "./helpers/neaBillCalculator";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";

export default function Home() {
  // UseForm Hooks for inputFields and Validations
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //  Ampere Options according to NEA Customer Tariff
  const options = [
    { value: "5amp", label: "5 Ampere" },
    { value: "15amp", label: "15 Ampere" },
    { value: "30amp", label: "30 Ampere" },
    { value: "60amp", label: "60 Ampere" },
  ];

  // Total Calculations
  const [billCalculation, setBillCalculation] = useState("");

  const onSubmit = (data) => {

    // To Calculate Energy Charge and Service Charge
    const billingAmount = NeaElectricityBillAmountCalculator({ data });

    setBillCalculation(
      <>
        <div>
          <p className="block mb-2 text-sm font-semibold text-gray-900 ">
            Bill Calculation
          </p>
          <div className="bg-gray-100 px-4 py-2.5 rounded-md w-full">
            <div className="flow-root mb-2">
              <h5 className="float-left text-sm font-medium">Energy Charge</h5>
              <p className="float-right  text-sm font-medium">
                {billingAmount.energyCharge}
              </p>
            </div>
            <div className="flow-root">
              <h5 className="float-left text-sm font-medium">Service Charge</h5>
              <p className="float-right  text-sm font-medium">
                {billingAmount.serviceCharge}
              </p>
            </div>
            <hr className="my-3 border border-gray-400 border-dashed" />
            <div className="flow-root">
              <h5 className="float-left text-sm font-semibold text-primary-600">
                Total Bill Amount
              </h5>
              <p className="float-right  text-sm font-semibold text-primary-600">
                {billingAmount.energyCharge + billingAmount.serviceCharge}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="https://www.nea.org.np/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          target="_blank"
        >
          <Image src={neaLogo} alt="logo" width={400} priority />
        </a>
        <div className="w-full bg-white rounded-md shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-5">
            <form
              className="space-y-4 md:space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlor="Ampere"
                  className="block mb-2 text-sm font-semibold text-gray-900 "
                >
                  Select Ampere
                </label>

                <Controller
                  name="ampere"
                  control={control}
                  rules={{
                    required: {
                      value: true, message: "Ampere cannot be empty."
                    }
                  }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      options={options}
                      className={classNames("rounded-md text-gray-900 sm:text-sm block w-full"
                        , errors?.ampere
                          ? "border-2  border-red-600 "
                          : ""
                      )}
                      {...field}
                    />
                  )}
                />
                {errors?.ampere && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.ampere?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlor="units"
                  className="block mb-2 text-sm font-semibold text-gray-900 "
                >
                  Units
                </label>
                <Controller
                  name="consumedUnits"
                  control={control}
                  render={({ field }) =>
                    <input
                      {...field}
                      type="number"
                      placeholder="123"
                      className={classNames(
                        "bg-white border border-gray-300 focus:outline-none text-gray-900 sm:text-sm rounded-md block w-full px-3 py-2",
                        errors?.consumedUnits
                          ? "border-2  border-red-600"
                          : "focus:ring-2  focus:ring-primary-600"
                      )}
                      min={1}
                    />}
                  rules={{
                    required:
                    {
                      value: true,
                      message: "Units cannot be empty."
                    },
                    min: { value: 1, message: "Units cannot be 0." }
                  }}
                />

                {errors?.consumedUnits && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.consumedUnits?.message}
                  </p>
                )}
              </div>
              {billCalculation}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-400 font-semibold rounded-md text-sm px-5 py-2 text-center"
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
