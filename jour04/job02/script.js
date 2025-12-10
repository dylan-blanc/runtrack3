function jsonValueKey(jsonString, key) {
  const obj = JSON.parse(jsonString);
  return obj[key];
}

const jsonStr =
  '{"name": "La Plateforme_", "address": "8 rue d\'hozier", "city": "Marseille", "nb_staff": "11", "creation": "2019"}';
console.log(jsonValueKey(jsonStr, "city")); 

// test

const onParse = JSON.parse(jsonStr);
console.log(onParse);

const onStringifie = JSON.stringify(onParse);
console.log(onStringifie);


