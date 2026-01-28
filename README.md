# Vue Store – E-commerce Demo

[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2.x-orange)](https://pinia.vuejs.org/)
[![Naive UI](https://img.shields.io/badge/Naive_UI-2.x-lightgrey)](https://www.naiveui.com/)

Demo di applicazione e-commerce sviluppata con **Vue 3**, **TypeScript**, **Pinia** e **Naive UI**, con prodotti simulati tramite **Fake Store API**.  
L’applicazione dimostra una **struttura modulare, scalabile e tipizzata**, con stato centralizzato, componenti riutilizzabili e logica separata dalla UI.

---

##  Tecnologie principali

- Vue 3 (Composition API)  
- TypeScript  
- Pinia (State Management)  
- Vue Router  
- Naive UI (UI Components)  
- VueUse (`useFetch`, `useLocalStorage`)  
- Fake Store API  

---

##  Struttura del progetto

src/
├─ app/
│ ├─ stores/ # Store Pinia (cart, products, auth, wishlist)
│ ├─ types/ # Tipi TypeScript condivisi
│ ├─ actions/ # Composables / logica fetch
│
├─ components/
│ ├─ atoms/ # Componenti base (button, input)
│ ├─ molecules/ # Componenti combinati (AddToCartButton, BuyBox)
│ ├─ organisms/ # Componenti complessi (ProductTile, ProductCard)
│
├─ views/
│ ├─ Products.vue # Lista prodotti
│ ├─ ProductDetail.vue# Dettaglio prodotto
│ ├─ Cart.vue # Carrello
│ ├─ Login.vue
│
├─ router/
│ └─ index.ts # Rotte e route guards


---

##  Architettura e concetti chiave

### Stato centralizzato

- Carrello e autenticazione gestiti solo tramite **Pinia**.  
- Nessuna duplicazione di stato nei componenti.  
- Tutte le modifiche passano attraverso store, garantendo reattività e persistenza.

### Tipi principali

| Tipo | Descrizione |
|------|------------|
| `Product` | Prodotto puro dall’API |
| `CartItem` | Prodotto nel carrello con `quantity` |

> I componenti che gestiscono quantità devono **sempre lavorare con CartItem**, non con Product.

---

##  Store principali

### Products Store

- Recupero prodotti e caching con `localStorage`  
- Filtro per categoria  
- Gestione query string URL  

Metodi principali:

```ts
fetchAllProducts()
fetchProductsByCategory(category)
getProductById(id)
```
## 🛠 Store principali

### Cart Store
Cart Store

``ts
items: CartItem[]
subtotal: number
addItem(product)
removeItem(id)
updateQuantity(id, quantity)
clearCart()

# Metodi principali:

✔ Persistenza automatica (localStorage)
✔ Reattività completa

#Auth Store

-Login / Logout

-Stato isAuthenticated

-Persistenza automatica

-Protezione delle rotte

#  Componenti chiave
## BuyBox

-Gestione quantità

-Aggiunta e rimozione dal carrello

-Mostra pulsanti solo se l’utente è autenticato

-Utilizza computed con getter/setter per la reattività

##ProductTile / ProductCard

-ProductTile: visualizzazione compatta per carrello o lista

-ProductCard: visualizzazione griglia prodotti

-Separazione chiara tra logica e UI.

#Routing e filtri

-Categoria sincronizzata con URL

-Cambio categoria → aggiornamento store + query string

-Supporto a /products e /products?category=electronics

# Ricerca e filtri

-Filtro per categoria tramite inject/provide

-Possibile estensione a ricerca testuale, sorting e paginazione

# Avvio del progetto

##Installare le dipendenze:

npm install


##Avviare il server di sviluppo:

npm run dev