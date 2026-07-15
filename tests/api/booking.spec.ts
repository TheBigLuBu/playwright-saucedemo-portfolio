import { test, expect } from '@playwright/test';

let bookingId: string;
let token: string;

test.beforeEach(async ({ request }) => {
  // 1. Créer une réservation
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-05"
      },
      additionalneeds: "Breakfast"
    }
  });
  const createBody = await createResponse.json();
  bookingId = createBody.bookingid;

  // 2. S'authentifier
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: "admin",
      password: "password123"
    }
  });
  const authBody = await authResponse.json();
  token = authBody.token;
  // bookingId et token sont maintenant fournis automatiquement par  le beforeEach avant 
  // chaque test, donc plus besoin de les recalculer ensuite.
});

test('exemple GET', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking');
  expect(response.status()).toBe(200);
});
test('create a reservation', async ({ request }) => {
 
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
  data: {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-01-05"
    },
    additionalneeds: "Breakfast"
  }
  });
  
  expect(response.ok()).toBeTruthy();
  // ou on peut également mettre expect(response).toBeOK(); // syntaxe alternative, 
  // plus idiomatique
  
  const body = await response.json();  
  expect(body.bookingid).toBeDefined();
  });

test('create then delete a reservation', async ({ request }) => {
  // 1. Créer une réservation
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-05"
      },
      additionalneeds: "Breakfast"
    }
  });
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // 2. S'authentifier pour récupérer le token
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: "admin",
      password: "password123"
    }
  });
  const authBody = await authResponse.json();
  const token = authBody.token;

  // 3. Supprimer la réservation créée à l'étape 1
  const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
  // A noter que la fin de l'adresse comporte un ${bookingId} qui peremt de ne pas avoir un id codé en dur
    headers: {
      Cookie: `token=${token}`
    }
  });

  expect(deleteResponse.ok()).toBeTruthy();
});

test('Modify a reservation (PUT)', async ({ request }) => {
  // 1. Créer une réservation
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-05"
      },
      additionalneeds: "Breakfast"
    }
  });
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // 2. S'authentifier
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: "admin",
      password: "password123"
    }
  });
  const authBody = await authResponse.json();
  const token = authBody.token;

  // 3. Modifier la réservation avec PUT
  const modifyResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    },
    data: {
      firstname: "Alice",
      lastname: "Blue",
      totalprice: 650,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-03-02",
        checkout: "2024-03-21"
      },
      additionalneeds: "Breakfast"
    }
  });

  // 4. Vérifications
  expect(modifyResponse.ok()).toBeTruthy();

  const modifyBody = await modifyResponse.json();
  expect(modifyBody.firstname).toBe('Alice');
});

test('Modify a part of a reservation (PATCH)', async ({ request }) => {
  // 1. Créer une réservation
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-05"
      },
      additionalneeds: "Breakfast"
    }
  });
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // 2. S'authentifier
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: "admin",
      password: "password123"
    }
  });
  const authBody = await authResponse.json();
  const token = authBody.token;

  // 3. Modifier la réservation avec PATCH
  const modifyResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    },
    data: {
      firstname: "Bob",
    },
  });
  // 4. Vérifications
  expect(modifyResponse.ok()).toBeTruthy();

  const modifyBody = await modifyResponse.json();
  expect(modifyBody).toEqual ({
      firstname: "Bob",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-05"
      },
      additionalneeds: "Breakfast"
    })
});

test('GET a specific booking', async ({ request }) => {
  const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
 
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.firstname).toBe('Jim');
// GET est maintenant propre et complet : il récupère une réservation précise via son id, et vérifie le contenu retourné.
});

test('Modify a reservation (PUT) without BeforeEach', async ({ request }) => {
  const modifyResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    },
    data: {
      firstname: "Alice",
      lastname: "Blue",
      totalprice: 650,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-03-02",
        checkout: "2024-03-21"
      },
      additionalneeds: "Breakfast"
    }
  });

  expect(modifyResponse.ok()).toBeTruthy();

  const modifyBody = await modifyResponse.json();
  expect(modifyBody).toEqual({
    firstname: "Alice",
    lastname: "Blue",
    totalprice: 650,
    depositpaid: true,
    bookingdates: { checkin: "2024-03-02", checkout: "2024-03-21" },
    additionalneeds: "Breakfast"
  });
});

test('Modify a part of a reservation (PATCH) without BeforeEach', async ({ request }) => {
  const modifyResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    },
    data: {
      firstname: "Bob"
    }
  });

  expect(modifyResponse.ok()).toBeTruthy();

  const modifyBody = await modifyResponse.json();
  expect(modifyBody).toEqual({
    firstname: "Bob",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: "2024-01-01", checkout: "2024-01-05" },
    additionalneeds: "Breakfast"
  });
});

test('delete a reservation', async ({ request }) => {
  // 3. Supprimer la réservation créée à l'étape 1
  const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
  // A noter que la fin de l'adresse comporte un ${bookingId} qui peremt de ne pas avoir un id codé en dur
    headers: {
      Cookie: `token=${token}`
    }
  });

  expect(deleteResponse.ok()).toBeTruthy();
});
