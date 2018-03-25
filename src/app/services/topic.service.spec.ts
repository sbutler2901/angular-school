import { TestBed, inject } from '@angular/core/testing';

import { TopicService } from './topic.service';

describe('TopicServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicService]
    });
  });

  it('should be created', inject([TopicService], (service: TopicService) => {
    expect(service).toBeTruthy();
  }));
});
