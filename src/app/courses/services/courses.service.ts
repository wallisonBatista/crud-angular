import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, first } from 'rxjs/operators';

import { Course } from '../model/course';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private readonly API = 'api/courses';

    constructor(private httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<Course[]>(this.API)
            .pipe(
                first(),
                //delay(2000),
                tap(courses => console.log(courses))
            );
    }

}
