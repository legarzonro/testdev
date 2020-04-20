import {cleanConsole, createAll} from './data';

const companies = createAll();
const user = {age: 35, car: true, firstName: 'Juan', lastName: 'Delgado'};
const company = {id: 88,
  isOpen: false,
  name: 'Microsoft',
  users: null,
  usersLength: 7};
const putUser= {
  age: 119,
  car: true,
  company: 'net-consult',
  firstName: 'Leonardo',
  id: 2,
  lastName: 'Garzon'};

cleanConsole(7, companies);
console.log('---- EXAMPLE 7 part 1 --- ', getCompanyById(1));
console.log('---- EXAMPLE 7 part 2 --- ', deleteCompanyById(1));
console.log('---- EXAMPLE 7 part 3 --- ', patchCompanyValue(0, {name: 'IBM', users: null, isOpen: true}));
console.log('---- EXAMPLE 7 part 4 --- ', addUserByComapnyId(0, user));
console.log('---- EXAMPLE 7 part 5 --- ', putCompanyValue(0, company));
console.log('---- EXAMPLE 7 part 6 --- ', removeUserByComapnyIdAndUserId(88, 1));
console.log('---- EXAMPLE 7 part 7 --- ', patchUserValueFromComapny(88, 2, {firstName: 'Leonardo'}));
console.log('---- EXAMPLE 7 part 8 --- ', putUserValueFromComapny(88, 2, putUser));
console.log('---- EXAMPLE 7 part 9 --- ', moveUserFromCompany(2, 88, 2));

function getCompanyById(id) {
  const index= companies.findIndex((company)=>company.id==id);
  if (index!=-1) {
    return companies[index].name;
  }
}

function deleteCompanyById(id) {
  const index= companies.findIndex((company)=>company.id==id);
  if (index!=-1) {
    companies.splice(index, 1);
    return companies;
  }
}

function patchCompanyValue(id, newValue) {
  const index= companies.findIndex((company)=>company.id==id);
  if (index!=-1) {
    for (const key in companies[index]) {
      if (newValue.hasOwnProperty(key) && key!='users') {
        companies[index][key]=newValue[key];
      }
    }
    return companies[index];
  }
  return null;
}

function addUserByComapnyId(id, newUser) {
  const index= companies.findIndex((company)=>company.id==id);
  if (index!=-1) {
    newUser.id=companies[index].usersLength;
    companies[index].users.push(newUser);
    companies[index].usersLength++;
    return companies[index].users;
  }
  return null;
}

function putCompanyValue(id, newValue) {
  const index= companies.findIndex((company)=>company.id==id);
  if (index!=-1) {
    newValue.users=companies[index].users;
    for (const key in companies[index]) {
      if (!newValue.hasOwnProperty(key)) return companies[index];
    }
    companies[index]=newValue;
    return companies[index];
  }
  return null;
}

function removeUserByComapnyIdAndUserId(comapnyId, userId) {
  const companyIndex= companies.findIndex((company)=>company.id==comapnyId);
  if (companyIndex!=-1) {
    const userIndex= companies[companyIndex].users.findIndex((user)=>user.id==userId);
    if (userIndex!=-1) {
      companies[companyIndex].users.splice(userIndex, 1);
      companies[companyIndex].usersLength--;
      return companies[companyIndex].users;
    }
  }
  return null;
}

function patchUserValueFromComapny(comapnyId, userId, newUser) {
  const companyIndex= companies.findIndex((company)=>company.id==comapnyId);
  if (companyIndex!=-1) {
    const userIndex= companies[companyIndex].users.findIndex((user)=>user.id==userId);
    if (userIndex!=-1) {
      for (const key in companies[companyIndex].users[userIndex]) {
        if (newUser.hasOwnProperty(key)) {
          companies[companyIndex].users[userIndex][key]=newUser[key];
        }
      }
      return companies[companyIndex].users[userIndex];
    }
  }
  return null;
}

function putUserValueFromComapny(comapnyId, userId, newUser) {
  const companyIndex= companies.findIndex((company)=>company.id==comapnyId);
  if (companyIndex!=-1) {
    const userIndex= companies[companyIndex].users.findIndex((user)=>user.id==userId);
    if (userIndex!=-1) {
      for (const key in companies[companyIndex].users[userIndex]) {
        if (!newUser.hasOwnProperty(key)) return companies[companyIndex].users[userIndex];
      }
      companies[companyIndex].users[userIndex]=newUser;
      return companies[companyIndex].users[userIndex];
    }
  }
  return null;
}

function moveUserFromCompany(userId, fromCompanyId, toComapnyId) {
  const fromCompanyIndex= companies.findIndex((company)=>company.id==fromCompanyId);
  const toCompanyIndex= companies.findIndex((company)=>company.id==toComapnyId);
  if (fromCompanyIndex!=-1 && toCompanyIndex!=-1) {
    const userIndex= companies[fromCompanyIndex].users.findIndex((user)=>user.id==userId);
    if (userIndex!=-1) {
      const userToTransfer=companies[fromCompanyIndex].users.splice(userIndex, 1);
      companies[fromCompanyIndex].usersLength--;
      companies[toCompanyIndex].users.push(userToTransfer);
      companies[toCompanyIndex].usersLength++;
      return userToTransfer;
    }
  }
  return null;
}
// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Parte 1: Crear una función tomando como parámetro un "id" de "company" y
// devolviendo el nombre de esta "company".

// Parte 2: Crear una función tomando como parámetro un "id" de "company" y
// quitando la "company" de la lista.

// Parte 3: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PATCH (como con una llamada HTTP) en todos los
// atributos de esta "company" excepto en el atributo "users".

// Parte 4: Crear una función tomando como parámetro un "id" de "company" y un
// nuevo "user" cuyo el apelido es "Delgado", el nombre "Juan", de 35 años y
// dueño de un carro. El nuevo "user" debe agregarse a la lista de "users" de este
// "company" y tener un "id" generado automáticamente. La función también debe modificar
// el atributo "usersLength" de "company".

// Parte 5: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PUT (como con una llamada HTTP) en esta "company" excepto
// en el atributo "users".

// Parte 6: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user". La función debe quitar este "user" de la lista de "users"
// de "company" y cambiar el atributo "usersLength" de "company".

// Parte 7: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PATCH (como con una llamada HTTP) en este
// "user".

// Parte 8: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PUT (como con una llamada HTTP) en este
// "user".

// Parte 9: Crear una función tomando como parámetro dos "id" de "company" y
// un "id" de "user". La función debe permitir que el user sea transferido de la
// primera "company" a la segunda "company". El atributo "usersLength" de cada
// "company" debe actualizarse.

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Part 1: Create a function taking as parameter an "id" of "company" and
// returning the name of this "company".

// Part 2: Create a function taking as parameter an "id" of "company" and
// removing the "company" from the list.

// Part 3: Create a function taking as a parameter an "id" of "company" and
// allowing to make a PATCH (as with an HTTP call) on all
// attributes of this "company" except on the "users" attribute.

// Part 4: Create a function taking as parameter an "id" of "company" and a
// new "user" whose name is "Delgado", the first name "Juan", aged 35 and
// a car. The new "user" must be added to the "users" list of this
// "company" and have an automatically generated "id". The function must also modify
// the "usersLength" attribute of "company".

// Part 5: Create a function taking as parameter an "id" of "company" and
// allowing to make a PUT (as with an HTTP call) on this "company" except
// on the "users" attribute.

// Part 6: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user". The function must remove this "user" from the list of "users"
// from "company" and change the attribute "usersLength" from "company".

// Part 7: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PATCH (as with an HTTP call) on this
// "user".

// Part 8: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PUT (as with an HTTP call) on this
// "user".

// Part 9: Create a function taking as parameter two "id" of "company" and
// an "id" of "user". The function must allow the user to be transferred as a parameter
// from the 1st "company" to the 2nd "company". The "usersLength" attribute of each
// "company" must be updated.

// -----------------------------------------------------------------------------
// INSTRUCTIONS EN FRANÇAIS

// Partie 1 : Créer une fonction prenant en paramètre un "id" de "company" et
// retournant le nom de cette "company".

// Partie 2 : Créer une fonction prenant en paramètre un "id" de "company" et
// supprimant la "company" de la liste.

// Partie 3 : Créer une fonction prenant en paramètre un "id" de "company" et
// permettant de faire un PATCH (comme avec un appel HTTP) sur tous les
// attributs de cette "company" sauf sur l'attribut "users".

// Partie 4 : Créer une fonction prenant en paramètre un "id" de "company" et un
// nouvel "user" dont le nom est "Delgado", le prénom "Juan", ayant 35 ans et
// une voiture. Le nouvel "user" doit être ajouté à la liste des "users" de cette
// "company" et avoir un "id" généré automatiquement. La fonction doit aussi modifier
// l'attribut "usersLength" de "company".

// Partie 5 : Créer une fonction prenant en paramètre un "id" de "company" et
// permettant de faire un PUT (comme avec un appel HTTP) sur cette "company" sauf
// sur l'attribut "users".

// Partie 6 : Créer une fonction prenant en paramètre un "id" de "company" et un
// "id" de "user". La fonction doit supprimer cet "user" de la liste des "users"
// de la "company" et modifier l'attribut "usersLength" de "company".

// Partie 7 : Créer une fonction prenant en paramètre un "id" de "company" et un
// "id" de "user" permettant de faire un PATCH (comme avec un appel HTTP) sur cet
// "user".

// Partie 8 : Créer une fonction prenant en paramètre un "id" de "company" et un
// "id" de "user" permettant de faire un PUT (comme avec un appel HTTP) sur cet
// "user".

// Partie 9 : Créer une fonction prenant en paramètre deux "id" de "company" et
// un "id" de "user". La fonction doit permettre de transférer l'user en paramètre
// de la 1re "company" à la 2e "company". L'attribut "usersLength" de chaque
// "company" doit être mis à jour.
