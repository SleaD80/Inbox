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

export const getColor = (dueDate) => {
  const diff = dueDate - Date.now();
  switch (true) {
    case diff < 0:
      return 'red';
    case diff < 86400000:
      return 'orange';
    default:
      return 'black';
  }
};

export const base64ToArrayBuffer = (base64) => {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};
