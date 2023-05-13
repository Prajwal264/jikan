import { Container } from 'inversify';
import TYPES from './types';
import { AuthService } from './services/auth.service';
import { CommunityService } from './services/community.service';
import { ContentStoreService } from './services/content-store.service';
import { ProfileService } from './services/profile.service';
import { GroupService } from './services/group.service';

const container = new Container();

container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind<ContentStoreService>(TYPES.ContentStoreService).to(ContentStoreService)
  .inSingletonScope();
container.bind<CommunityService>(TYPES.CommunityService).to(CommunityService).inSingletonScope();
container.bind<ProfileService>(TYPES.ProfileService).to(ProfileService).inSingletonScope();
container.bind<GroupService>(TYPES.GroupService).to(GroupService).inSingletonScope();

export default container;
