import { TestBed } from '@angular/core/testing';
import { GetInformationService } from './get-information.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';

describe('GetInformationService', () => {
  let getInforService: GetInformationService;
  const res: HttpResponse<any> = new HttpResponse({
    body: {
      version: '',
      project: 'VNF Manager',
    },
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    // Inject the http service and test controller for each test
    getInforService = TestBed.get(GetInformationService);
  });

  /// Tests begin ///
  it('should be created', () => {
    expect(getInforService).toBeTruthy();
  });
  it('Return value from rest API', () => {
    getInforService.getInformation().subscribe((data: any) => {
      expect(data.body.version).toEqual('');
      expect(data.body.project).toEqual('VNF Manager');
    });
  });

  it('should return project', () => {
    const version = getInforService.parseProject(res);
    expect(version).toEqual('VNF Manager');
  });

  it('should return version', () => {
    const project = getInforService.parseVersion(res);
    expect(project).toEqual('');
  });
});
