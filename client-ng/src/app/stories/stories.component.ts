import { Component } from '@angular/core';
import { StoriesService } from './stories.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
  public stories: any[] = [];
  public faStar = faStar;
  public faSolidStar = faSolidStar;

  constructor(private storiesService: StoriesService) {
    this.storiesService.getAllStories().subscribe((res:any) => {
      this.stories = res.results;
    });
  }

  onClick(id: string): void {
    this.stories.forEach(s => s.opened = false);
    this.stories.filter(s => s.id === id)[0]['opened'] = true;
  }

  toggleStar(story: any): void {
    story.isStarred = !story.isStarred;
  }

  lead(story:any): string {
    return story.body.replace(/<\/?[^>]+(>|$)/g, "").substr(0, 100);
  }

  prettyDate(story: any): string {
    return moment(story.published).format('MMM d, HH:mm').toString();
  }
}
