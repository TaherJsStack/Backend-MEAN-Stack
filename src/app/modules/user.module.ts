export interface UserModule {
  id:        string;
  roll:      string;
  date:      Date;
  email:     string;
  phone:     number;
  ginder:    string;
  orders:    any[];
  password:  string;
  photoURL:  string;
  blockUser: boolean;
  created_at: Date;
  name: {
    firstname: string,
    lastname:  string,
  };
  address: {
    country: string;
    street:  string,
    zip:     string,
    city:    string
  };
}
