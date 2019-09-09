import { ProductModule } from './product.module';

export interface OrderModule {
  active:      boolean;
  products:    [] ;
  addedDate:   Date;
  creatorId:   string;
  totalPrice:  number;
  creatorName: string;
}

