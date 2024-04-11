interface UserRegistrationContactNumber {
    "CountryCode": string,
    "PhoneNumber": string
}
interface UserRegistrationEducation {
    "AggregatePercentage": string,
    "PassingYear": string,
    "Qualification": string,
    "EducationStream": string,
    "CollegeName": string,
    "CollegeLocation": string
}

interface UserRegistrationPreferredJobRoles {
    "InstructionalDesigner": boolean,
    "SoftwareEnginner": boolean,
    "SoftwareQualityEngineer": boolean
}

interface UserRegistrationExpertisedTechnologies {
    "Javascript": boolean,
    "Angularjs": boolean,
    "Reactjs": boolean,
    "Nodejs": boolean,
    "Other": string
}

interface UserRegistrationFamilierTechnologies {
    "Javascript": boolean,
    "Angularjs": boolean,
    "Reactjs": boolean,
    "Nodejs": boolean,
    "Other": string
}


interface UserRegistrationProfessionalQualification {
    "ApplicationType": string,
    "TotalExperience": string,
    "OnOnticePeriod": boolean,
    "LastWorkingDate": string, // yyyy-mm-dd
    "TerminationNoticeMonths": number,
    "ExpertisedTechnologies": UserRegistrationExpertisedTechnologies[],
    "FamalierTechnologies": UserRegistrationFamilierTechnologies[]
}

export interface UserRegistration {
    "UserName": string,
    "PasswordHash": string,
    "Firstname": string,
    "Lastname": string,
    "Email": string,
    "Resume": string,
    "DisplayPicture": string,
    "PortfolioUrl": string,
    "GetJobUpdate": boolean,
    "ContactNumbers": UserRegistrationContactNumber[],
    "Educations": UserRegistrationEducation[],
    "PreferredJobRoles": UserRegistrationPreferredJobRoles[],
    "ProfessionalQualifications": UserRegistrationProfessionalQualification[]
}


// User registration for fresher
interface FresherUserRegistrationProfessionalQualification {
    "ApplicationType": string,
    "FamalierTechnologies": UserRegistrationFamilierTechnologies[]
}


export interface FresherUserRegistrationDto {
    "UserName": string,
    "PasswordHash": string,
    "Firstname": string,
    "Lastname": string,
    "Email": string,
    "Resume": string,
    "DisplayPicture": string,
    "PortfolioUrl": string,
    "GetJobUpdate": boolean,
    "ContactNumbers": UserRegistrationContactNumber[],
    "Educations": UserRegistrationEducation[],
    "PreferredJobRoles": UserRegistrationPreferredJobRoles[],
    "ProfessionalQualifications": FresherUserRegistrationProfessionalQualification[]
}