export interface Ticket {
  status: string;
  userId: number,
  description: string;
  createdDate: string;
}

export interface TicketExt extends Ticket {
  id: number;
}

export interface TableConfig {
  thead: {
    columns: TableColumn[];
  };
}

export interface TableColumn {
  field: string;
  visible: boolean;
  order: number;
  header: string;
  actionsColumn?: boolean;
}

export interface User {
  id: number,
  name: string,
  surname: string,
  login: string,
  date: string,
  username: string,
  city: string,
  password: string,
  avatar: URL
}
