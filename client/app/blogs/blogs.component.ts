import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BlogService } from '../services/blog.service';
import { AuthService } from '../services/auth.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  isLoading: boolean = true;
  uploader: FileUploader;
  blogs: Blog[] = [];

  constructor(
    public toast: ToastComponent,
    private blogService: BlogService,
    public dialog: MdDialog
  ) {
    this.uploader = new FileUploader({
      url: ''
    });
    this.uploader.onCompleteAll = () => {
      console.log('complete');
    };

    this.uploader.onAfterAddingFile = (item) => {
      item.method = 'PUT';
    };

  }

  ngOnInit() {
   this.getBlogs();
  }

  getBlogs() {

    this.blogService.getBlogs()
      .subscribe(response => {
        console.log(response);
        this.blogs = response
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteBlog(blog) {

    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.blogService.deleteBlog(blog).subscribe(
        res => {
          const pos = this.blogs.map(elem => elem._id).indexOf(blog._id);
          this.blogs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
  addCommentForBlog(blog) {

    blog.comments.unshift({ body: blog.newComment, date: Date.now()}) ;

    this.blogService.editBlog(blog).subscribe(
      res => {
        blog.newComment = '';
      },
      error => console.error(error)
    );
  }

  addArticleDialog() {
    const dialogRef = this.dialog.open(AddBlogDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log(result);
        this.blogs.unshift(result);
      }

    });
  }

  uploadBlogImage(blogId: string) {

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      fileItem.url = `/api/blog/${blogId}/image`;
    };
    this.uploader.uploadItem(this.uploader.queue[0]);

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      console.log(item);
      console.log(response);
    };
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      console.log(item);
      console.log(response);

      const parsedResponse = JSON.parse(response);
      const pos = this.blogs.map(elem => elem._id).indexOf(blogId);

      if (pos > -1) {
        this.blogs[pos].image = parsedResponse.filename;
      }

    };
  }

}

@Component({
  selector: 'app-add-blog-dialog',
  templateUrl: './add-blog-dialog.html'
})
export class AddBlogDialogComponent implements OnInit {

  article: Blog = new Blog(this.auth.currentUser.username);

  constructor(
    public dialogRef: MdDialogRef<AddBlogDialogComponent>,
    private blogService: BlogService,
    public toast: ToastComponent,
    public auth: AuthService,
  ) {}

  ngOnInit() {
   console.log(this.article);
  }

  addArticle() {
    this.blogService.addBlog(this.article)
      .subscribe(response => {
        this.dialogRef.close(response);
      },
      error => console.log(error)
    );

  }
}
