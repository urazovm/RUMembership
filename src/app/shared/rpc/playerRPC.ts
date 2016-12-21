import { EmergencyContactRPC } from './emergencyContactRPC';

export class PlayerRPC {
    id: number;
    firstName: string;
    nickName: string;
    lastName: string;
    dob: Date;
    gender: string;
    student: boolean;
    emailAddress: string;
    contactNumber: string;
    area: string;
    postcode: string;
    ukuName: string;
    wfdfID: string;
    medicalInfo: string;
    emergencyContacts: EmergencyContactRPC[];
}
