import { observable, action } from "mobx";
import { persist } from "mobx-persist";
import * as googleClientApi from "google-client-api";
import moment from "moment";

import { Calendar, CalendarEvent } from "./calendar";

export const initGapi = (gapi: any) =>
  gapi.client.init({
    apiKey: "AIzaSyDRK9Vhl1GBrx_yvmX7jFzJWpPgWxDtPyk",
    clientId:
      "364311923566-e65f2s5u2bqnshpg789m2stv5f78qq1e.apps.googleusercontent.com",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ],
    scope: "https://www.googleapis.com/auth/calendar"
  });

export class ApiStore {
  gapi: { [key: string]: any } = {};

  @persist
  @observable
  isSignedIn: boolean = false;

  @persist("list")
  @observable
  calendars: Calendar[] = [];

  @action.bound
  updateSignInStatus(isSignedIn: boolean) {
    if (isSignedIn) {
      this.fetchCalendarData();
    }
    if (!isSignedIn) {
      this.calendars = [];
    }
    this.isSignedIn = isSignedIn;
  }

  @action.bound
  async fetchApi() {
    const gapi = await googleClientApi();
    await initGapi(gapi);
    this.gapi = gapi;

    this.updateSignInStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
    this.gapi.auth2
      .getAuthInstance()
      .isSignedIn.listen((isSignedIn: boolean) => {
        this.updateSignInStatus(isSignedIn);
      });
  }

  @action.bound
  async fetchCalendarData() {
    const calendarList = await this.gapi.client.calendar.calendarList.list({
      minAccessRole: "owner",
      showDeleted: false,
      showHidden: true
    });

    const calendars = [];

    // fetch data in parallel, with `Promise.all`
    const promises: Promise<any>[] = [];
    for (let item of calendarList.result.items) {
      promises.push(this.fetchCalendarEvents(item.id));
    }
    const promisesResolved: CalendarEvent[][] = await Promise.all(promises);

    for (let i in calendarList.result.items as any[]) {
      const item = calendarList.result.items[i];
      calendars.push(Calendar.fromObject(item, promisesResolved[i]));
    }

    this.calendars = calendars;
  }

  @action.bound
  async fetchCalendarEvents(calendarId: string): Promise<CalendarEvent[]> {
    return this.gapi.client.calendar.events
      .list({
        calendarId: calendarId,
        timeMin: moment()
          .subtract(1, "year")
          .startOf("week")
          .toISOString(),
        timeMax: moment()
          .endOf("week")
          .toISOString(),
        singleEvents: true,
        orderBy: "startTime"
      })
      .then((response: any) => {
        const events = response.result.items.map(CalendarEvent.fromObject);
        return events;
      });
  }

  @action.bound
  signOut() {
    this.gapi.auth2.getAuthInstance().signOut();
  }

  @action.bound
  signIn() {
    this.gapi.auth2.getAuthInstance().signIn();
  }
}
