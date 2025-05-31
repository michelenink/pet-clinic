import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { doctorsTable } from "@/db/schema";

dayjs.extend(utc);
dayjs.locale("pt-br");

export const getAvailability = (doctor: typeof doctorsTable.$inferSelect) => {
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
