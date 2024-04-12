export interface GetJobPostDto {
    "Id": number,
    "Title": string,
    "CompanyName": string,
    "StartDate": string,
    "EndDate": string,
    "JobApplications": any,
    "CreatedDate": string,
    "ModifiedDate": string,
    "Address": Address[],
    "JobRoles": JobRoles[],
    "TimeSlots": TimeSlots[]
}

interface TimeSlots {
    "Id": number,
    "StartTime": string,
    "EndTime": string,
    "JobPostId": number,
    "CreatedDate": string,
    "ModefiedDate": string,
    "JobApplications": []
}

interface JobRoles {
    "Id": number,
    "RoleTitle": string,
    "GrossPackage": number,
    "RoleDescription": string,
    "Requirements": string,
    "CreatedDate": string,
    "ModifiedDate": string,
    "JobPostId": number
}

interface Address {
    "Id": number,
    "HouseNo": string,
    "Apartment": string,
    "Landmark": string,
    "City": string,
    "State": string,
    "Country": string,
    "Zipcode": number,
    "CreatedDate": string,
    "ModifiedDate": string,
    "JobPostId": 3
}