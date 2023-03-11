import { Component } from '@angular/core';
import { FeedsService } from './feeds.service';
import * as moment from 'moment';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent {
  public feeds: any = [];
  constructor(private feedsService: FeedsService) {
    this.feedsService.getFeeds().subscribe((res:any) => {
      this.feeds = res.results;
    });
  }
  
  prettyDate(feed: any): string {
    return moment(feed.lastFetched).format('MMM d, HH:mm').toString();
  }
}
