import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, first, delay } from 'rxjs/operators';

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

    private create(record: Partial<Course>) {
        return this.httpClient.post<Course>(this.API, record).pipe(first());
    }

    save(record: Partial<Course>) {
        //console.log(record)
        if (record._id) {
            //console.log("update")
            return this.update(record);
        }
        //console.log("create");
        return this.create(record);
    }

    loadById(id: string) {
        return this.httpClient.get<Course>(`${this.API}/${id}`);
    }

    private update(record: Partial<Course>) {
        return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
    }

    remove(id: string) {
        return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
    }
}
