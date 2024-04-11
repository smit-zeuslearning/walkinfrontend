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
    "ZeusTestLast12months": boolean,
    "AppledRoldLast12months": string,
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




// interface UserRegistrationContactNumber {
//     "countryCode": string,
//     "phoneNumber": string
// }
// interface UserRegistrationEducation {
//     "aggregatePercentage": string,
//     "passingYear": string,
//     "qualification": string,
//     "educationStream": string,
//     "collegeName": string,
//     "collegeLocation": string
// }

// interface UserRegistrationPreferredJobRoles {
//     "instructionalDesigner": boolean,
//     "softwareEnginner": boolean,
//     "softwareQualityEngineer": boolean
// }

// interface UserRegistrationFamilierTechnologies {
//     "javascript": boolean,
//     "angularjs": boolean,
//     "reactjs": boolean,
//     "nodejs": boolean,
//     "other": string
// }

// interface UserRegistrationExpertisedTechnologies {
//     "javascript": boolean,
//     "angularjs": boolean,
//     "reactjs": boolean,
//     "nodejs": boolean,
//     "other": string
// }

// interface UserRegistrationProfessionalQualification {
//     "applicationType": string,
//     "totalExperience": string,
//     "onOnticePeriod": string,
//     "lastWorkingDate": string, // yyyy-mm-dd
//     "terminationNoticeMonths": string,
//     "zeusTestLast12months": string,
//     "appledRoldLast12months": string,
//     "expertisedTechnologies": UserRegistrationExpertisedTechnologies[],
//     "famalierTechnologies": UserRegistrationFamilierTechnologies[]
// }

// export interface UserRegistration {
//     "userName": string,
//     "passwordHash": string,
//     "firstname": string,
//     "lastname": string,
//     "email": string,
//     "resume": string,
//     "displayPicture": string,
//     "portfolioUrl": string,
//     "getJobUpdate": boolean,
//     "contactNumbers": UserRegistrationContactNumber[],
//     "educations": UserRegistrationEducation[],
//     "preferredJobRoles": UserRegistrationPreferredJobRoles[],
//     "professionalQualifications": UserRegistrationProfessionalQualification[]
// }
