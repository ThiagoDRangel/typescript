class Passenger {
  constructor(public nome: string, public cpf: number) { }
}

class ShippedItem {
  constructor(
    public nome: string, 
    public id: number, 
    public customerID: string,
  ) { }
}

class Flight {
  // Primeiro, ajustamos o construtor da classe Flight
  // para suportar tanto passageiros quanto cargas
  constructor(public num: number, public payload: (Passenger | ShippedItem)[]) { }

  // A função add agora poderá adicionar tanto
  // passageiros quanto cargas
  add(newPayload: Passenger | ShippedItem): void {
    this.payload.push(newPayload); 
  }

  // De igual modo, a função remove pode remover
  // tanto passageiros quanto cargas
  remove(removedPayload: Passenger | ShippedItem): void {
    const index = this.payload.indexOf(removedPayload, 0);
    if (index > -1) {
      this.payload.splice(index, 1);
    }
  }
}

class Company {
  constructor(public nome: string, public flights: Flight[]) { }
  // newFlight pode ser implementada aqui, já que
  // sua funcionalidade se mantém em todas as
  // subclasses
  newFlight(flightNum: number): void {
    const newFlight = new Flight(flightNum, []);
    this.flights.push(newFlight);
  }

  // Ajustes feitos na superclasse são transmitidos
  // para as subclasses
  addToFlight(flightNum: number, payload: Passenger | ShippedItem): void { }
  removeToFlight(flightNum: number, payload: Passenger | ShippedItem): void { }
}

class TravelingCompany extends Company {
  addToFlight(flightNum: number, passenger: Passenger): void {
    const currentFlight = this.flights.find((f) => f.num === flightNum);
    if (currentFlight) {
      currentFlight.add(passenger);
    }
  }

  removeFromFlight(flightNum: number, passenger: Passenger): void {
    const currentFlight = this.flights.find((f) => f.num === flightNum);
    if (currentFlight) {
      currentFlight.remove(passenger);
    }
  }
}

class ShippingCompany extends Company {
  addToFlight(flightNum: number, item: ShippedItem): void {
    const currentFlight = this.flights.find((f) => f.num === flightNum);
    if (currentFlight) {
      currentFlight.add(item);
    }
  }

  removeToFlight(flightNum: number, item: ShippedItem): void {
    const currentFlight = this.flights.find((f) => f.num === flightNum);
    if (currentFlight) {
      currentFlight.remove(item);
    }
  }
}