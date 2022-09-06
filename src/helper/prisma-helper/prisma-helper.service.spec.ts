import { Test, TestingModule } from '@nestjs/testing';
import { PrismaHelperService } from './prisma-helper.service';

describe('PrismaHelperService', () => {
  let service: PrismaHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaHelperService],
    }).compile();

    service = module.get<PrismaHelperService>(PrismaHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
