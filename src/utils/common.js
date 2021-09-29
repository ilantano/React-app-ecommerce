const formatURLQueryToObject = (data) => {
  const pairs = data.slice(1).split('&');
  const result = {};
  pairs.forEach((item) => {
    let pair = item;
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });
  return JSON.parse(JSON.stringify(result));
};

export default formatURLQueryToObject;
