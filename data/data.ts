
import { UserData, Shipment, Vehicle, ShipmentItem, FilterTab } from "../types/global";
import images from "../utils/images";


const userData: UserData = {
  name: "John Doe",
  profilePicture: images.profilePic,
  location: "Wertheimer, Illinois",
  hasNewNotifications: false,
};

const shipments: Shipment[] = [
  {
    id: '1',
    shipmentNumber: 'NEJ20089934122231',
    sender: {
      city: 'Atlanta',
      code: '5243',
    },
    receiver: {
      city: 'Chicago',
      code: '6821',
    },
    estimatedTime: '2 days - 3 days',
    status: 'Waiting to collect',
  }
];

const vehicles: Vehicle[] = [
  {
    id: '1',
    title: 'Ocean Freight',
    route: 'International',
    image: images.ship,
    color: '#F19A1A'
  }, {
    id: '2',
    title: 'Cargo Freight',
    route: 'Reliable',
    image: images.truck,
    color: '#7838D1'
  },
  {
    id: '3',
    title: 'Air Freight',
    route: 'International',
    image: images.airplane,
    color: '#1A79F1'
  },
 
];

const packageOptions = [
  { id: "1", label: "Box" },
  { id: "2", label: "Envelope" },
  { id: "3", label: "Pallet" },
  { id: "4", label: "Crate" },
  { id: "5", label: "Tube" },
];

const categoryOptions = [
  { id: "1", label: "Documents" },
  { id: "2", label: "Glass" },
  { id: "3", label: "Liquid" },
  { id: "4", label: "Food" },
  { id: "5", label: "Electronic" },
  { id: "6", label: "Product" },
  { id: "7", label: "Others" },
];

const suggestedSearches = [
  {
    id: "sug1",
    productName: "Summer Linen Jacket",
    shipmentNumber: "#NE312367327",
    sender: { city: "Madrid", code: "MAD" },
    receiver: { city: "Paris", code: "PAR" },
  },
  {
    id: "sug2",
    productName: "MacBook Pro M1",
    shipmentNumber: "#NE328940543",
    sender: { city: "London", code: "LDN" },
    receiver: { city: "Berlin", code: "BER" },
  },
  {
    id: "sug3",
    productName: "Leather Office Chair",
    shipmentNumber: "#NE398275611",
    sender: { city: "Barcelona", code: "BCN" },
    receiver: { city: "Rome", code: "ROM" },
  },
  {
    id: "sug4",
    productName: "Wireless Headphones",
    shipmentNumber: "#NE367219954",
    sender: { city: "Amsterdam", code: "AMS" },
    receiver: { city: "Vienna", code: "VIE" },
  },
];

  const recentSearches = [
    "NEJ20089934122231",
    "NEJ20089934122232",
    "MNO17438923770",
    "KLM45678901234",
  ];

  const mockShipments: ShipmentItem[] = [
    {
      id: "1",
      title: "Arriving today!",
      trackingNumber: "NEJ20089934122231",
      origin: " Atlanta",
      destination: " is arriving today!",
      price: 1400,
      date: "Sep 20, 2023",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Arriving today!",
      trackingNumber: "NEJ20089934122232",
      origin: "Los Angeles",
      destination: " is arriving today!",
      price: 650,
      date: "Sep 20, 2023",
      status: "pending",
    },
  
    {
      id: "3",
      title: "Delivered",
      trackingNumber: "NEJ20089934122234",
      origin: "Boston",
      destination: " is arriving today!",
      price: 650,
      date: "Sep 18, 2023",
      status: "pending",
    },
    {
      id: "4",
      title: "Arriving tomorrow",
      trackingNumber: "NEJ20089934122233",
      origin: "Miami",
      destination: " is arriving today!",
      price: 1850,
      date: "Sep 19, 2023",
      status: "loading",
    },
    {
      id: "5",
      title: "Pending delivery",
      trackingNumber: "NEJ20089934122234",
      origin: "Boston",
      destination: " is arriving today!",
      price: 1200,
      date: "Sep 18, 2023",
      status: "pending",
    },
    {
      id: "6",
      title: "Pending delivery",
      trackingNumber: "NEJ20089934122234",
      origin: "Boston",
      destination: " is arriving today!",
      price: 1200,
      date: "Sep 18, 2023",
      status: "pending",
    },
    {
      id: "7",
      title: "Pending delivery",
      trackingNumber: "NEJ20089934122234",
      origin: "Boston",
      destination: " is arriving today!",
      price: 1200,
      date: "Sep 18, 2023",
      status: "completed",
    },
    {
      id: "8",
      title: "Completed delivery",
      trackingNumber: "NEJ20089934122234",
      origin: "Boston",
      destination: " is arriving today!",
      price: 1200,
      date: "Sep 18, 2023",
      status: "completed",
    },
  ];
  
  const filterTabsConfig: Omit<FilterTab, "count">[] = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed", status: "completed" },
  { id: "in-progress", label: "In progress", status: "in-progress" },
  { id: "pending", label: "Pending", status: "pending" },
];



export { userData, shipments, vehicles, packageOptions, categoryOptions, suggestedSearches, recentSearches, mockShipments, filterTabsConfig };