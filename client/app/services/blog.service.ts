import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getBlogs(): Observable<any> {
    return this.http.get('/api/blogs').map(res => res.json());
  }

  countBlogs(): Observable<any> {
    return this.http.get('/api/blogs/count').map(res => res.json());
  }

  addBlog(blog): Observable<any> {
    return this.http.post('/api/blog', JSON.stringify(blog), this.options).map(res => res.json());
  }

  getBlog(blog): Observable<any> {
    return this.http.get(`/api/blog/${blog._id}`).map(res => res.json());
  }

  editBlog(blog): Observable<any> {
    return this.http.put(`/api/blog/${blog._id}`, JSON.stringify(blog), this.options).map(res => res.json());
  }

  deleteBlog(blog): Observable<any> {
    return this.http.delete(`/api/blog/${blog._id}`, this.options);
  }

  uploadImage(blog): Observable<any> {
    return this.http.put(`/api/blog/${blog._id}/image`, this.options).map(res => res.json());
  }

}
