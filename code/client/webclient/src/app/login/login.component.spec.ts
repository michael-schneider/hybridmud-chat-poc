import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { routes } from '../app-routing.module';
import { MudxmlService } from '../shared/mudxml.service';
import { MudxmlMockService } from '../../../testing/mudxml-mock.service';
import { ChatComponent } from '../chat/chat.component';

import { LoginComponent } from './login.component';
import { MudMessage } from '../shared/mud-message';
import { By } from '@angular/platform-browser';
import { EnsureLoginService } from '../shared/ensure-login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mudxmlMockService: MudxmlMockService;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    const mudxmlMockServiceInject: MudxmlMockService = new MudxmlMockService();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: MudxmlService, useValue: mudxmlMockServiceInject }
        { provide: EnsureLoginService, useValue: { canActivate: function () { return true; } } }
      ],
      declarations: [LoginComponent, ChatComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mudxmlMockService = TestBed.get(MudxmlService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should show an error without XML if server permits an error', () => {
    const message: MudMessage = {
      domain: 'login',
      message: '<login type="error">This is a <em>test</em> error</login>',
      type: 'error'
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();
    expect(component.loginForm.controls['username'].hasError('server')).toBeTruthy();

    const serverError = fixture.debugElement.query(By.css('.error-server'));
    expect(serverError.nativeElement.textContent).toContain('This is a test error');
  });

  it('should not submit the loginname if loginname is empty', () => {
    const loginField: HTMLInputElement = fixture.debugElement.query(By.css('#username')).nativeElement;
    const submitButton: HTMLElement = fixture.debugElement.query(By.css('#submit')).nativeElement;

    component.loginForm.controls['username'].setValue('');
    fixture.detectChanges();
    submitButton.click();
    fixture.detectChanges();

    expect(mudxmlMockService.getSentData()).toBeNull();
  });

  it('should display an error if loginname is empty', () => {
    const loginField: HTMLInputElement = fixture.debugElement.query(By.css('#username')).nativeElement;
    const submitButton: HTMLElement = fixture.debugElement.query(By.css('#submit')).nativeElement;

    component.loginForm.controls['username'].markAsDirty();
    component.loginForm.controls['username'].setValue('');
    fixture.detectChanges();
    submitButton.click();
    fixture.detectChanges();

    const localError = fixture.debugElement.query(By.css('.error-local'));
    expect(localError.nativeElement.textContent).toContain('A username is required. Please enter one.');
  });

  it('should send data if loginname is ok', () => {
    const loginField: HTMLInputElement = fixture.debugElement.query(By.css('#username')).nativeElement;
    const submitButton: HTMLElement = fixture.debugElement.query(By.css('#submit')).nativeElement;

    component.loginForm.controls['username'].setValue('TestUser098');
    fixture.detectChanges();
    submitButton.click();
    fixture.detectChanges();

    expect(mudxmlMockService.getSentData()).toBe('TestUser098');
  });

  it('should navigate to /chat if loginname is ok', fakeAsync(() => {
    component.loginForm.controls['username'].setValue('TestUser098');

    const message: MudMessage = {
      domain: 'login',
      message: '<login type="success">Welcome!!!</login>',
      type: 'success'
    };
    mudxmlMockService.next(message);
    tick(50);
    expect(location.path()).toBe('/chat');
  }));

});
