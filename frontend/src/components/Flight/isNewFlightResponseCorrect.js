import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export default function isNewFlightResponseCorrect(requestBody, responseBody) {
  requestBody = JSON.parse(requestBody);
  if (
    requestBody.flightName === responseBody.flightName &&
    requestBody.flightPrice.toString() ===
      responseBody.flightPrice.toString() &&
    requestBody.departureAirport === responseBody.departureAirport &&
    requestBody.arrivalAirport === responseBody.arrivalAirport &&
    dayjs(requestBody.departureDateTime, "YYYY-MM-DDThh:mm").isSame(
      dayjs(responseBody.departureDateTime, "YYYY-MM-DDThh:mm:ss")
    ) &&
    dayjs(requestBody.arrivalDateTime, "YYYY-MM-DDThh:mm").isSame(
      dayjs(responseBody.arrivalDateTime, "YYYY-MM-DDThh:mm:ss")
    )
  )
    return true;
  return false;
}
