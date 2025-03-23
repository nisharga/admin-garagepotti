export type IMechanic = {
    _id: string;
    fullName: string;
    phoneNo: string;
    address: string;
    adminVerificationStatus: "approved" | "pending" | "rejected"; // Assuming possible statuses
    bankDetails: {
      accountNo: string;
      bankName: string;
    };
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    dob: string; // Date of birth, assuming empty string if not provided
    experienceYears: number;
    isOTPVerified: boolean;
    licenseNo: string;
    location: {
      latitude: string;
      longitude: string;
    };
    nid: string; // National ID
    profilePic: string; 
    role: "mechanic";  
    specialization: string[];  
    status: "active" | "inactive";  
    workPhotos: string[];  
    workshopDetails: string; 
  };
  