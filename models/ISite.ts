interface SiteInterface {
  campgroundId: string;
  siteId: string;
  amp15: boolean;
  amp30: boolean;
  amp50: boolean;
  sewer: boolean;
  water: boolean;
  siteType: string;
  campgroundSiteNumber: string;
  photos: string;
  pricePerNight: number
}

export default SiteInterface;
