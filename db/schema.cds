namespace loyaltyProgram;

entity Customers {
  key ID: UUID;
  name: String;
  email: String;
  customerNumber: Integer;
  totalPurchaseValue: Integer;
  totalRewardPoints: Integer;
  totalRedeemedRewardPoints: Integer;
}

entity Products {
  key ID: UUID;
  name: String;
  description: String;
  price: Integer;
}

entity Purchases {
  key ID: UUID;
  purchaseValue: Integer;
  rewardPoints: Integer;
  selectedProduct: Association to Products;
  customer: Association to Customers;
}

entity Redemptions {
  key ID: UUID;
  redeemedAmount: Integer;
  customer: Association to Customers;
}

