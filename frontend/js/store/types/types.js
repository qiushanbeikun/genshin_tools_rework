// @flow
export interface AccountResponse {
  user: {
    id: string;
    email: string;
    username: string;
    is_active: boolean;
    is_superuser: boolean;
    genshin_server: string;
    genshin_uid: string;
    created: Date;
    modified: Date;
    last_login: string;
  };
  access: string;
  refresh: string;
}
