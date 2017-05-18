import { Observable } from 'rxjs/Rx';

import { User } from './user';

export interface UsersService {
    getUser(id: number): Observable<User>;
}
