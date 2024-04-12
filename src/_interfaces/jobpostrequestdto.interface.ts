export interface JobPostRequestDto {
    "Title": string,
    "CompanyName": string,
    "StartDate": string,
    "EndDate": string,
    "Address": AddressInterface[],
    "JobRoles": jobRolesInterface[]
    "TimeSlots": TimeSlotsInterface[]
}

interface TimeSlotsInterface {
    "StartTime": string,
    "EndTime": string
}

interface jobRolesInterface {
    "RoleTitle": string,
    "GrossPackage": number,
    "RoleDescription": string,
    "Requirements": string
}

interface AddressInterface {
    "HouseNo": string,
    "Apartment": string,
    "Landmark": string,
    "City": string,
    "State": string,
    "Country": string,
    "Zipcode": number
}