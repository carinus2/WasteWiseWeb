export enum StatusType {
    ORDER_TAKEN = 'ORDER_TAKEN',
    FIVE_MORE_MINUTES = 'FIVE_MORE_MINUTES',
    ARRIVING_SOON = 'ARRIVING_SOON',
    IM_HERE = 'IM_HERE'
  }
  
  export function getStatusDisplayName(status: StatusType): string {
    switch (status) {
      case StatusType.ORDER_TAKEN:
        return 'Order Taken';
      case StatusType.FIVE_MORE_MINUTES:
        return 'Five More Minutes';
      case StatusType.ARRIVING_SOON:
        return 'Arriving Soon';
      case StatusType.IM_HERE:
        return "I'm Here";
      default:
        return status;
    }
  }
  