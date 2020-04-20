import {createAll, cleanConsole, clone} from './data';
const companies = createAll();

cleanConsole(1, companies);
console.log('---- EXAMPLE 1 --- ', transformCompanies(companies));

function transformCompanies(companies) {
  let newCompanies=clone(companies);
  newCompanies=newCompanies.map(function(company) {
    company.users=company.users.map(function(user) {
      user.firstName=capitalize(user.firstName);
      user.lastName=capitalize(user.lastName);
      return user;
    });
    sortUsersByName(company.users);
    company.name=capitalize(company.name);
    return company;
  });

  sortCompaniesByNumberUsers(newCompanies);

  return newCompanies;
}

function sortUsersByName(users) {
  users.sort(function(a, b) {
    if (a.firstName>b.firstName) return 1;
    if (a.firstName<b.firstName) return -1;
    if (a.lastName>b.lastName) return 1;
    if (a.lastName<b.lastName) return -1;
    return 0;
  });
}

function sortCompaniesByNumberUsers(companies) {
  companies.sort(function(compnay1, company2) {
    if (compnay1.users.length>company2.users.length) return -1;
    if (compnay1.users.length<company2.users.length) return 1;
    return 0;
  });
  return companies;
}

function capitalize(word) {
  if (word==undefined) return '';
  return word[0].toUpperCase()+word.slice(1);
}

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando la variable "companies" como parámetro y reemplazando
// todos los valores "undefined" en "usuarios" por un string vacío.
// El nombre de cada "company" debe tener una letra mayúscula al principio, así como
// el apellido y el nombre de cada "user".
// Las "companies" deben ordenarse por su total de "user" (orden decreciente)
// y los "users" de cada "company" deben aparecer en orden alfabético.

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the variable "companies" as a parameter and replacing
// all values "undefined" in "users" by an empty string.
// The name of each "company" must have a capital letter at the beginning as well as
// the last name and first name of each "user".
// The "companies" must be sorted by their number of "user" (decreasing order)
// and the "users" of each "company" must be listed in alphabetical order.

// -----------------------------------------------------------------------------
// INSTRUCTIONS EN FRANÇAIS

// Créer une fonction prenant en paramètre la variable "companies" et remplaçant
// toutes les valeurs "undefined" dans les "users" par un string vide.
// Le nom de chaque "company" doit avoir une majuscule au début ainsi que
// le nom et le prénom de chaque "user".
// Les "companies" doivent être triées par leur nombre de "user" (ordre décroissant)
// et les "users" de chaque "company" doivent être classés par ordre alphabétique.
