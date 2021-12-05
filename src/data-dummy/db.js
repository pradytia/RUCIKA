export const db = {

    "users": [
      {
        "username": "pradit",
        "password": "123",
        "role"    : "admin",
        "id"      : "1"
      }
    ],
  
    "products": [
      {
        "product_id"        : "PRO-001",
        "product_name"      : "Pipa",
        "supplier_name"      : "PT SENTOSA",
        "product_price"     : 1200000,
        "stock"  : 5
      },
      {
        "product_id"        : "PRO-002",
        "product_name"      : "Lem",
        "supplier_name"      : "PT SAMOJA",
        "product_price"     : 1200000,
        "stock"  : 5
      },
      {
        "product_id"        : "PRO-003",
        "product_name"      : "Besi",
        "supplier_name"      : "PT WAHANA",
        "product_price"     : 1200000,
        "stock"  : 5
      },
      {
        "product_id"        : "PRO-004",
        "product_name"      : "Kayu",
        "supplier_name"      : "PT MAKMUR",
        "product_price"     : 1200000,
        "stock"  : 5
      },
      {
        "product_id"        : "PRO-005",
        "product_name"      : "Semen",
        "supplier_name"      : "PT INDAH",
        "product_price"     : 1200000,
        "stock"  : 5
      },
    ],
  
  
    "supplier"   : [
      {
        "supplier_id"        : "SUP-001",
        "supplier_name"      : "PT WAHANA",
        "address"     : "Karawang"
      },
      {
        "supplier_id"        : "SUP-002",
        "supplier_name"      : "PT INDAH",
        "address"     : "Cikarang"
      },
      {
        "supplier_id"        : "SUP-003",
        "supplier_name"      : "PT MAKMUR",
        "address"     : "Bekasi"
      },
      {
        "supplier_id"        : "SUP-004",
        "supplier_name"      : "PT SAMOJA",
        "address"     : "Cikarang"
      },
      {
        "supplier_id"        : "SUP-005",
        "supplier_name"      : "PT SENTOSA",
        "address"     : "Bekasi"
      }
    ],

    "order"   : [
      {
        "order_id"        : "ORD-001",
        "product_name"      : "Pipa",
        "customer_name"  : "TB.Maju Sejahtera",
        "order_date"     : "2021-12-04",
        "price"  : 10000,
        "quantity"  : 2,
        "status" : "waiting"
      }
    ],

    "customer"   : [
      {
        "customer_id"        : "CUST-001",
        "customer_name"  : "TB.Maju Sejahtera",
        "phone"     : "081732313123",
        "address"  : "jl.Ciater Raya",
        "city"  : "Tangerang Selatan",
        "province" : "Banten"
      }
    ]
  }