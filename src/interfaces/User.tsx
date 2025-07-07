export interface User {
    name:       string;
    lastName:   string;
    email:      string;
    phone?:      string;
    street?:     string;
    number?:     string;
    commune?:    string;
    region?:     string;
    postalCode?: string;
    registered?: Date;
    lastAccess?: Date;
    birthdate?:  Date;
    active?:     boolean;
    token:      string;
    role?:       string;
}
