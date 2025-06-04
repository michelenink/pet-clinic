import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { veterinariansTable } from "@/db/schema";

dayjs.extend(utc);
dayjs.locale("pt-br");

export const getAvailability = (
  doctor: typeof veterinariansTable.$inferSelect,
) => {
  const from = dayjs()
    .utc()
    .date(doctor.availableFromWeekDay)
    .set("hour", parseInt(doctor.availableFromTime.split(":")[0]))
    .set("minute", parseInt(doctor.availableFromTime.split(":")[1]))
    .set("second", parseInt(doctor.availableFromTime.split(":")[2] || "0"))
    .local();
  const to = dayjs()
    .utc()
    .date(doctor.availableToWeekDay)
    .set("hour", parseInt(doctor.availableToTime.split(":")[0]))
    .set("minute", parseInt(doctor.availableToTime.split(":")[1]))
    .set("second", parseInt(doctor.availableToTime.split(":")[2] || "0"))
    .local();
  return { from, to };
};
