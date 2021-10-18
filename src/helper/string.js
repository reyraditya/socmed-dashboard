export function capitalize(strings) {
    if (!strings) return '';
    return strings
      .toLowerCase()
      .split(' ')
      .map((str) => (str.length ? str[0].toUpperCase() + str.slice(1) : ''))
      .join(' ');
  }