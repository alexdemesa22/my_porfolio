import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('toggles and persists the selected theme', () => {
    service.toggleTheme();

    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.body.classList.contains('light-theme')).toBeTrue();
  });
});
