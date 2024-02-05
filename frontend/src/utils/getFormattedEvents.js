import axios from "axios";
import moment from "moment";

const getFormattedEvents = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/calendar`
  );
  const formattedEvents = data.map((event) => {
    const dateStart = event.startDate.split("T")[0];
    const dateEnd = event.endDate.split("T")[0];

    const start = moment(
      `${dateStart}T${event.startTime}`,
      "YYYY-MM-DDThh:mm:ss"
    ).toDate();
    const end = moment(
      `${dateEnd}T${event.endTime}`,
      "YYYY-MM-DDThh:mm:ss"
    ).toDate();

    const eventTypeMapForCalendar = {
      wedding: "Mariage",
      baptism: "Baptême",
      gender_reveal: "Gender Reveal",
      baby_shower: "Baby Shower",
      anniversary: "Anniversaire",
      evjf: "EVJF",
      evg: "EVG",
      other: "Autre",
    };

    return {
      id: event.id,
      title: `${event.customerNames} - ${
        eventTypeMapForCalendar[event.eventType]
      } à ${event.eventLocation}`,
      start,
      end,
    };
  });
  return formattedEvents;
};

export default getFormattedEvents;
