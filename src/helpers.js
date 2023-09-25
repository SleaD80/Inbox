export const getDate = (timestamp) => {
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
  return {
    year: currentDate.getFullYear(),
    month: months[currentDate.getMonth()],
    date: currentDate.getDate(),
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
