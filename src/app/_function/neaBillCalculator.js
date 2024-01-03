import reading from "../_json/customerTariff.json";

export default function NeaRateCalculator({
    consumedUnit,
    ampere,
}) {
    return {
        calculatedCost: NeaCostCalculator({ consumedUnit, reading, ampere }),
    };
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
            return (
                data["0-20"].minAmt + meterReading * data["0-20"].initial_energy_rate
            );
        } else if (meterReading >= 21 && meterReading <= 30) {
            return (
                data["21-30"].minAmt +
                20 * data["0-20"].energy_rate +
                (meterReading - 20) * data["21-30"].energy_rate
            );
        } else if (meterReading >= 31 && meterReading <= 50) {
            return (
                data["31-50"].minAmt +
                20 * data["0-20"].energy_rate +
                10 * data["21-30"].energy_rate +
                (meterReading - 20 - 10) * data["31-50"].energy_rate
            );
        } else if (meterReading >= 51 && meterReading <= 100) {
            return (
                data["51-100"].minAmt +
                20 * data["0-20"].energy_rate +
                10 * data["21-30"].energy_rate +
                20 * data["31-50"].energy_rate +
                (meterReading - 20 - 10 - 20) * data["51-100"].energy_rate
            );
        } else if (meterReading >= 101 && meterReading <= 250) {
            return (
                data["101-250"].minAmt +
                20 * data["0-20"].energy_rate +
                10 * data["21-30"].energy_rate +
                20 * data["31-50"].energy_rate +
                50 * data["51-100"].energy_rate +
                (meterReading - 20 - 10 - 20 - 50) * data["51-100"].energy_rate
            );
        } else if (meterReading >= 250) {
            return (
                data["250-above"].minAmt +
                20 * data["0-20"].energy_rate +
                10 * data["21-30"].energy_rate +
                20 * data["31-50"].energy_rate +
                50 * data["51-100"].energy_rate +
                150 * data["101-250"].energy_rate +
                (meterReading - 20 - 10 - 20 - 50 - 150) * data["250-above"].energy_rate
            );
        } else {
            return null;
        }
    }
}