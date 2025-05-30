export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm'

export const GENDER_OPTS = [
  {
    id: 'male',
    label: "Nam",
  },
  {
    id: 'female',
    label: "Nữ",
  },
];