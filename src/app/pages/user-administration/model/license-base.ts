export interface LicenseBase {

    "tenantId": string,
    "applications": Array<Application>
}
export interface Application {

    "applicationId": string,
    "totalCount": number,
    "licensesUsed": number
}