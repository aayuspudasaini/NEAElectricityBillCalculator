import reading from "../_json/customerTariff.json";

export default function NeaRateCalculator({
    consumedUnit,
    ampere,
}) {
    return NeaCostCalculator({ consumedUnit, reading, ampere })
}

// Nea Cost Calculation
function NeaCostCalculator({
    consumedUnit: meterReading,
    reading: customerTariff,
    ampere: amp,
}) {

    let data = customerTariff[amp.value];
    if (data) {
        if (meterReading >= 0 && meterReading <= 20) {
            return {
                energyCharge: meterReading * data["0-20"].initial_energy_rate,
                serviceCharge: data["0-20"].minAmt
            }
        } else if (meterReading >= 21 && meterReading <= 30) {
            return {
                energyCharge:
                    20 * data["0-20"].energy_rate +
                    (meterReading - 20) * data["21-30"].energy_rate,
                serviceCharge: data["21-30"].minAmt
            };
        } else if (meterReading >= 31 && meterReading <= 50) {
            return {
                energyCharge: 20 * data["0-20"].energy_rate +
                    10 * data["21-30"].energy_rate +
                    (meterReading - 20 - 10) * data["31-50"].energy_rate,
                serviceCharge: data["31-50"].minAmt
            };
        } else if (meterReading >= 51 && meterReading <= 100) {
            return {
                energyCharge: 20 * data["0-20"].energy_rate +
                    10 * data["21-30"].energy_rate +
                    20 * data["31-50"].energy_rate +
                    (meterReading - 20 - 10 - 20) * data["51-100"].energy_rate,
                serviceCharge: data["51-100"].minAmt
            };
        } else if (meterReading >= 101 && meterReading <= 250) {
            return {
                energyCharge: 20 * data["0-20"].energy_rate +
                    10 * data["21-30"].energy_rate +
                    20 * data["31-50"].energy_rate +
                    50 * data["51-100"].energy_rate +
                    (meterReading - 20 - 10 - 20 - 50) * data["51-100"].energy_rate,
                serviceCharge: data["101-250"].minAmt
            };
        } else if (meterReading >= 250 && meterReading <= 3000) {
            return {
                energyCharge:
                    20 * data["0-20"].energy_rate +
                    10 * data["21-30"].energy_rate +
                    20 * data["31-50"].energy_rate +
                    50 * data["51-100"].energy_rate +
                    150 * data["101-250"].energy_rate +
                    (meterReading - 20 - 10 - 20 - 50 - 150) * data["250-above"].energy_rate,
                serviceCharge: data["250-above"].minAmt,
            };
        } else {
            return {
                energyCharge: 32495,
                serviceCharge: 0
            };
        }
    }
}
