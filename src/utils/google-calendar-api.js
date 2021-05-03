import dayjs from "dayjs";

export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
export const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export const gapi = window.gapi;

export function signInClick() {
  gapi.auth2.getAuthInstance().signIn();
}

export function signOutClick() {
  gapi.auth2.getAuthInstance().signOut();
}

async function fetchCalendarEvents(calendarId) {
  return gapi.client.calendar.events.list({
    calendarId: calendarId,
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: "startTime",
  });
}

async function fetchUserCalendars() {
  return gapi.client.calendar.calendarList.list();
}

export async function processUserCalendars() {
  try {
    const calListResp = await fetchUserCalendars();
    const calListSuper = calListResp.result.items;

    let masterEventsList = [];
    let eventIdList = [];

    for (let x = 0; x < calListSuper.length; x++) {
      if (calListSuper[x].selected) {
        const resp = await fetchCalendarEvents(calListSuper[x].id);

        if (resp.result.items) {
          addUniqueEventsToMasterList(
            resp.result.items,
            eventIdList,
            masterEventsList
          );
        }
      }
    }

    sortListOnStartDate(masterEventsList);
    return masterEventsList;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
  return [];
}

function addUniqueEventsToMasterList(eventList, eventIdList, masterEventList) {
  for (let x = 0; x < eventList.length; x++) {
    if (!eventIdList.includes(eventList[x].id)) {
      eventList[x].startDate =
        eventList[x].start.dateTime || eventList[x].start.date;

      eventIdList.push(eventList[x].id);
      masterEventList.push(eventList[x]);
    }
  }
}

function sortListOnStartDate(eventList) {
  if (eventList) {
    eventList.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
  }
}

export function extractEventsForGivenDay(filterDate, listOfEvents) {
  if (!listOfEvents) {
    return {};
  }

  let result = {
    day: dayjs(filterDate).format("ddd, MMM D"),
    allDayEvents: [],
    events: [],
  };

  for (let x = 0; x < listOfEvents.length; x++) {
    let compareDate = null;

    if (listOfEvents[x].start.dateTime) {
      compareDate = dayjs(listOfEvents[x].start.dateTime).format("YYYY-MM-DD");
    } else {
      compareDate = listOfEvents[x].start.date;
    }

    if (compareDate === filterDate) {
      if (listOfEvents[x].start.dateTime) {
        result.events.push(listOfEvents[x]);
      } else {
        result.allDayEvents.push(listOfEvents[x]);
      }
    }
  }

  return result;
}

export async function getUserEventsForTodayAndTomorrow() {
  const listOfEvents = await processUserCalendars();

  return {
    today: extractEventsForGivenDay(getDateTodayAsString(), listOfEvents),
    tomorrow: extractEventsForGivenDay(getDateTomorrowAsString(), listOfEvents),
  };
}

export function getDateTodayAsString() {
  return dayjs().format("YYYY-MM-DD");
}

export function getDateTomorrowAsString() {
  return dayjs().add(1, "day").format("YYYY-MM-DD");
}
