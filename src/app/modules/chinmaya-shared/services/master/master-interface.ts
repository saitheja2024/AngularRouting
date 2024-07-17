

    export interface ProgramRequestInterface {
        "chapterCode": string;
        "academicYear": string;
        "userName": string,
        personID: number
    }  

    export interface ChapterCodeRequestInterface {
       // username:string,
        personID:number
    }

    export interface signupCodeRequestInteface {
        organizationCode:string,
        programCode: string,
        userName: string
    }
export interface adultpersonListInterface{
    familyId: number,
    programCode: number,
    chapterCode: number,
    paymentFlag: boolean,
    personId: number
}

export interface refreshGradeCode{
    "personId": number,
    "familyId": number,
    "chapterCode": string,
    "programCode": string,
    "signupCode": string
}


