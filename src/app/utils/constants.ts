import { environment } from 'src/environments/environment';

export class Constants {
  public static AUTH_TOKEN_STORAGE_KEY: string = 'token';
  public static AUTH_TOKEN_HEADER_NAME: string = 'X-Auth-Token';

  public static AUTH_USER_ID_STORAGE_KEY: string = 'user_id';
  public static AUTH_USER_DETAILS_STORAGE_KEY: string = 'current_user';
  
  public static AUTH_USER_ID: string = 'userId';
  public static AUTH_EMAIL_ID: string = 'emailId';


  public static APP_DOMAIN: any = {
    dev: "nonregcore.cmwrcregistration.org",
    qa: "nonregqa.cmwrcregistration.org",
    prod: "nonreg.cmwrcregistration.org"
  };
 

  public static API_DOMAIN: any = {
    dev: "https://nonregcore.cmwrcregistration.org/MR",
    qa: "https://nonregqa.cmwrcregistration.org/MR",
    prod: "https://nonreg.cmwrcregistration.org/MR"
  };

  public static APP_ENV_VERSION: any = {
    dev: "CORE",
    qa: "QA",
    prod: ""
  };

  public static APP_VERSION: any = environment.RELEASE_VERSION;
  public static APP_BUILD_DATE = environment.RELEASE_DATE;
}