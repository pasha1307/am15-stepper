import {Dictionary} from "../../models/dictionary-type";

export const FIELD_DISPLAY_LABELS = {
    accommodation: 'Accommodation',
    addressType: 'Address Type',
    benefitYear: 'Benefit Year',
    city: 'City',
    contestedEDN: 'Contested EDN',
    decision: 'Decision',
    Dob: 'Date of Birth',
    eligibilityNotice: 'Eligibility Notice',
    email: 'Email',
    emailType: 'Email Type',
    expFor: 'Expedite For',
    expReqGranted: 'Expedite Request Granted',
    firstName: 'First Name',
    grantOrDenyDate: 'Grant or Deny Date',
    intakeType: 'Intake Type',
    lastName: 'Last Name',
    marketplaceApplicationID: 'Marketplace Application ID',
    mostRecentEDN: 'Most Recent EDN',
    ndEndDate: 'National Disaster End Date',
    ndName: 'National Disaster Name',
    ndStartDate: 'National Disaster Start Date',
    pendedReqEndDate: 'Pended Request End Date',
    pendedReqStartDate: 'Pended Request Start Date',
    personType: 'Person Type',
    phoneType: 'Phone Type',
    planYear: 'Benefit Year',
    prsnType: 'Person Type',
    receiptDate: 'Receipt Date',
    requestDate: 'Request Date',
    spokenLang: 'Spoken Language',
    spokenLanguage: 'Spoken Language',
    stAddressType1: 'Street Address Type 1',
    state: 'State',
    telePhoneNumber: 'Phone Number',
    writtenLang: 'Written Language',
    writtenLanguage: 'Written Language',
    zip: 'Zip Code',
    startDate: 'Start Date',
    endDate: 'End Date',
    verificationType: 'Verification Type',
    repAuthorized: 'Authorized',
    langAssist: 'Language Assistance',
} as Dictionary<string>;

export const ERROR_DISPLAY_MESSAGES = {
    dateLessThanNewDate: 'must be a previous date',
    oneRequired: 'at least one required',
    pattern: 'is not in the correct format',
    required: 'is a required field',
    textPreferenceNotMobile: 'must be mobile',
} as Dictionary<string>;
