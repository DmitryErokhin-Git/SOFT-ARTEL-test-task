import {TicketExt} from "../../interfaces/interfaces";

export interface TicketsState {
  tickets: TicketExt[],
  error?: string;
}
