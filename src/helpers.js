export const getDate = (timestamp, isNumberFormat) => {
  const months = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];

  const currentDate = new Date(timestamp);
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;

  const getNumberValue = (val) => val < 10 ? '0' + val : val;

  return {
    year: currentDate.getFullYear(),
    month: isNumberFormat ? getNumberValue(month) : months[month],
    date: isNumberFormat ? getNumberValue(date) : date,
  };
};

export const getLevel = (dueDate) => {
  const diff = dueDate - Date.now();
  switch (true) {
    case diff < 0:
      return 'Error';
    case diff < 86400000: //24h
      return 'Warn';
    default:
      return 'Ok';
  }
};

export const getColor = (level) => {
  const colors = { Ok: 'black', Warn: 'orange', Error: 'red' };
  return colors[level];
};

export const base64ToArrayBuffer = (base64) => {
  let binaryString = window.atob(base64);
  let binaryLen = binaryString.length;
  let bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};
