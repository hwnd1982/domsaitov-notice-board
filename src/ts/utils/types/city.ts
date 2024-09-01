export interface City {
  id: number;
  name: string;
  dealerships: Dealership[];
  headOffice?: HeadOffice,
}

export interface HeadOffice {
  id: number;
  name: string;
  phones: string[];
  email: string;
  address: string;
  location: DealershipLocation;
}


export interface Dealership {
  id: number;
  name: string;
  phones: string[];
  email: string;
  links: DealershipLink[];
  address: string;
  is_branded: boolean;
  opening_hours: string;
  location: DealershipLocation;
  headOffice: boolean;
}

export interface DealershipLocation {
  latitude: number;
  longitude: number;
}

export interface DealershipLink {
  link: string;
  title: string;
}
