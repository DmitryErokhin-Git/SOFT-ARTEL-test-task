export const TEXT_MODAL = {
  add: {
    titleModal: 'Добавление тикета',
    buttonText: 'Добавить',
  },
  edit: {
    titleModal: 'Редактирование тикета',
    buttonText: 'Изменить',
  },
  delete: {
    titleModal: 'Удаление тикета',
    bodyText: 'Вы уверены, что хотите удалить данный тикет?',
    buttonText: 'Удалить',
  },
};

export const LIMIT_CHARACTERS = 80;

export const enum NOTIFICATION {
  LOAD_DATA = 'Данные успешно загружены',
  LOAD_CONFIG = 'Конфигурация таблицы успешно загружена',
  TICKET_ADD = 'Тикет успешно добавлен',
  TICKET_EDIT = 'Тикет успешно изменен',
  TICKET_DELETE = 'Тикет успешно удален',
  USER_UPDATE_SUCCESS = 'Изменения успешно внесены',
  USER_UPDATE_ERROR = 'Ошибка при изменении данных пользователя',
  DONT_SAVE = 'Изменения не внесены',
  NO_MATCHES = 'Совпадений не найдено',
  TICKET_INVALID_ID = 'Некорректный идентификатор тикета',
  USER_INVALID_ID = 'Некорректный идентификатор пользователя',
  TICKET_NOT_FOUND = 'Тикет не найден',
  TICKET_FETCHING_ERROR = 'Ошибка при получении тикета',
  USER_FETCHING_ERROR = 'Ошибка при получении данных пользователя',
  INVALID_USERNAME = 'Неверное имя пользователя',
  INVALID_PASSWORD = 'Неверный пароль',
  AUTH_ERROR = 'Ошибка при авторизации',
  USER_AUTH = 'Пользователь авторизован',
  USER_NOT_AUTH = 'Пользователь не авторизован',
}

export const toastrConfig = {
  timeOut: 3000,
  positionClass: 'toast-bottom-left',
  preventDuplicates: false,
  maxOpened: 3
};

export const emailPattern: string = '^[a-z0-9.`_-]+@[a-z0-9`_-]+[\.]+[a-z]{2,3}$';
export const minLengthPassword: number = 5;

export const STATUS_LIST = [
  {
    key: "open",
    description: "Открыт"
  },
  {
    key: "pending",
    description: "В ожидании"
  },
  {
    key: "closed",
    description: "Закрыт"
  }
];

export const getStatusDescription = (status: string) => {
  return STATUS_LIST.find(item => item.key === status)?.description;
};
