import { Comment } from './comment';

export class Blog {
  public _id:  string;
  public title: string = '';
  public author: string = '';
  public body: string = '';
  public comments: Comment[] = [];
  public newComment: string = '';
  public date: undefined = undefined;
  public hidden: boolean = false;
  public image: string = '';

  constructor (author: string) {
    this.author = author;
  }
}


export class NewBlog extends Blog {

  constructor(public title: string,
              public author: string,
              public body: string,
              public comments: Comment[],
              public date: undefined,
              public hidden: boolean,
              public image: string) {
    super(author);
  }
}
