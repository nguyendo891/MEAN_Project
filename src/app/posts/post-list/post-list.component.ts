import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  //   posts = [
  //     { title: "First Post", content: "This is the first post's content" },
  //     { title: "Second Post", content: "This is the second post's content" },
  //     { title: "Third Post", content: "This is the third post's content" }
  //   ];

  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription = new Subscription();
  constructor(public postService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = !(this.posts === null || this.posts.length === 0);

    this.postService.getPosts();

    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
