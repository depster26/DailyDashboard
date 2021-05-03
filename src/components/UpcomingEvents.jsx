import React, { useState, useEffect } from "react";

import {
  gapi,
  DISCOVERY_DOCS,
  SCOPES,
  signInClick,
  signOutClick,
  getUserEventsForTodayAndTomorrow,
} from "../utils/google-calendar-api";
import { ONE_HOUR_MS } from "../constants";
import appConfig from "../app-config";
import Loader from "./Loader";
import UpcomingEventColumns from "./UpcomingEventColumns";
import LinkButton from "./LinkButton";

const UpcomingEvents = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [userAuthorized, setUserAuthorized] = useState(false);
  const [userEvents, setUserEvents] = useState(null);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      const doInit = async () => {
        try {
          gapi.client.init({
            apiKey: appConfig.googleCalendar.apiKey,
            clientId: appConfig.googleCalendar.clientId,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          });
          gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
            setUserAuthorized(isSignedIn);
          });
        } catch (err) {
          console.log(JSON.stringify(err, null, 2));
        } finally {
          setIsWorking(false);
        }
      };
      doInit();
    });
  }, []);

  useEffect(() => {
    const checkForEvents = async () => {
      try {
        setIsWorking(true);
        const result = await getUserEventsForTodayAndTomorrow();
        setUserEvents(result);
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
      } finally {
        setIsWorking(false);
      }
    };

    let timer = null;

    if (userAuthorized) {
      checkForEvents();
      timer = setInterval(() => checkForEvents(), ONE_HOUR_MS);
    } else {
      setUserEvents(null);
    }

    return () => clearInterval(timer);
  }, [userAuthorized]);

  const refreshCalendarEvents = () => {
    const doRefresh = async () => {
      try {
        setIsWorking(true);
        const result = await getUserEventsForTodayAndTomorrow();
        setUserEvents(result);
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
      } finally {
        setIsWorking(false);
      }
    };
    if (userAuthorized) {
      doRefresh();
    }
  };

  return (
    <div>
      <h2 className="mb-3">
        Upcoming Events{" "}
        {userAuthorized && (
          <LinkButton
            onClickAction={refreshCalendarEvents}
            iconVariant="fal fa-sync"
          />
        )}
      </h2>
      {isWorking && <Loader />}
      {!isWorking && userEvents && (
        <UpcomingEventColumns
          todaysEvents={userEvents.today}
          tomorrowsEvents={userEvents.tomorrow}
        />
      )}
      {!userAuthorized && (
        <>
          <p>
            <small>
              Sign into your Google account to display upcoming events.
            </small>
          </p>
          <p>
            {" "}
            <LinkButton
              onClickAction={() => signInClick()}
              iconVariant="fal fa-sign-in"
              displayText="Sign In"
            />
          </p>
        </>
      )}
      {userAuthorized && (
        <LinkButton
          onClickAction={() => signOutClick()}
          iconVariant="fal fa-sign-out"
          displayText="Sign Out"
        />
      )}
      <hr />
    </div>
  );
};

export default UpcomingEvents;
