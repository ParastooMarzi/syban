import { createApi } from "@reduxjs/toolkit/query/react";

// Define your mock data functions
const fakeUserData = (id) => ({
  id,
  name: `User ${id}`,
  email: `user${id}@example.com`,
  // Add other user properties as needed
});

const fakeProductsData = () => [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  // Add other product items as needed
];

const fakeCustomersData = () => [
  { id: 1, name: "Customer 1", email: "customer1@example.com" },
  { id: 2, name: "Customer 2", email: "customer2@example.com" },
  // Add other customer items as needed
];

const fakeTransactionsData = ({ page, pageSize, sort, search }) => {
  // Generate fake transactions data based on provided parameters
  // Example: Pagination, Sorting, Filtering
  // Return an array of transactions
};

const fakeGeographyData = () => {
  // Generate fake geography data
  // Return the fake data
};

const fakeSalesData = () => {
  // Generate fake sales data
  // Return the fake data
};

const fakeAdminsData = () => {
  // Generate fake admins data
  // Return the fake data
};

const fakeUserPerformanceData = (id) => {
  // Generate fake user performance data based on provided id
  // Return the fake data
};

const fakeDashboardData = () => {
  // Generate fake dashboard data
  // Return the fake data
};

// Create your API with fake data
export const api = createApi({
  // Omitted other configurations for brevity
  
  baseQuery: () => ({
    // Define your base query function here (not used for fake data)
  }),

  endpoints: (build) => ({
    getUser: build.query({
      // Return fake user data
      query: (id) => fakeUserData(id),
      providesTags: ["User"],
    }),
    getProducts: build.query({
      // Return fake products data
      query: fakeProductsData,
      providesTags: ["Waste Management"],
    }),
    getCustomers: build.query({
      // Return fake customers data
      query: fakeCustomersData,
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      // Return fake transactions data
      query: fakeTransactionsData,
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      // Return fake geography data
      query: fakeGeographyData,
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      // Return fake sales data
      query: fakeSalesData,
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      // Return fake admins data
      query: fakeAdminsData,
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      // Return fake user performance data
      query: (id) => fakeUserPerformanceData(id),
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      // Return fake dashboard data
      query: fakeDashboardData,
      providesTags: ["Dashboard"],
    }),
  }),
});

// Export hooks for using the API
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
