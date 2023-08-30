const onlyAlphaNumeric = (input) => {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(input) ? true : false;
};

export { onlyAlphaNumeric };
