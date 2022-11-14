interface ReservationInterface {
  reservationId: string;
  campgroundId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  nightlyRate: string;
  totalCost: number;
  completedPayment: boolean;
  payments: string;
}

export default ReservationInterface;
